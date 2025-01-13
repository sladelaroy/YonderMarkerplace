// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract YonderMarketplace is ERC1155, Ownable, ReentrancyGuard {
    // Struct to store auction details
    struct Auction {
        address seller;
        uint256 tokenId;
        uint256 startingPrice;
        uint256 endTime;
        address highestBidder;
        uint256 highestBid;
        bool active;
    }

    // Struct for storing listed NFT details
    struct Listing {
        uint256 tokenId;
        address owner;
        uint256 price;
        bool isActive;
    }

    // Marketplace state
    mapping(uint256 => Auction) public auctions;
    mapping(uint256 => uint256) public prices; // Fixed price for "Buy Now" NFTs
    mapping(address => uint256[]) private userNFTs; // To track each user's NFTs
    mapping(uint256 => Listing) public listings; // Token ID -> Listing

    // Fee for minting in wei (0.001 ETH = 1,000,000,000,000,000,000 wei)
    uint256 public mintingFee = 0.001 ether;
    uint256 public listingFee = 0.01 ether;

    // Track the number of minted tokenIds (total NFT count)
    uint256 public totalMintedTokens = 0;

    constructor(string memory baseURI) ERC1155(baseURI) Ownable(msg.sender) {}

    /** MINT FUNCTIONS **/

    // Mint a single NFT with a specified tokenId
    function mintNFT(
        address to,
        uint256 tokenId,
        string memory tokenURI
    ) external payable onlyOwner {
        require(!_exists(tokenId), "Token ID already exists");
        require(msg.value == mintingFee, "Incorrect minting fee"); // Ensure the correct fee is paid
        _mint(to, tokenId, 1, bytes(tokenURI)); // Mint a single NFT with amount 1
        userNFTs[to].push(tokenId); // Track the minted token for the user
        totalMintedTokens++; // Increment the total minted tokens counter
    }

    // Batch mint multiple NFTs with specified tokenIds
    function batchMintNFT(
        address to,
        uint256[] memory tokenIds,
        string memory tokenURI
    ) external payable onlyOwner {
        uint256 totalFee = mintingFee * tokenIds.length; // Calculate the total minting fee

        require(msg.value == totalFee, "Incorrect minting fee"); // Ensure the correct fee is paid

        uint256[] memory amounts = new uint256[](tokenIds.length);

        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(!_exists(tokenIds[i]), "Token ID already exists");
            amounts[i] = 1; // Each tokenId corresponds to 1 NFT
        }

        _mintBatch(to, tokenIds, amounts, bytes(tokenURI));

        for (uint256 i = 0; i < tokenIds.length; i++) {
            userNFTs[to].push(tokenIds[i]); // Track the minted tokens for the user
        }

        totalMintedTokens += tokenIds.length; // Increment the total minted tokens counter
    }

    /** BURN FUNCTION **/

    function burn(address account, uint256 tokenId, uint256 amount) external {
        require(msg.sender == account || isApprovedForAll(account, msg.sender), "Not authorized");
        _burn(account, tokenId, amount);
    }

    /** TRANSFER FUNCTION **/

    function transfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 amount,
        bytes memory data
    ) external {
        require(msg.sender == from || isApprovedForAll(from, msg.sender), "Not authorized");
        safeTransferFrom(from, to, tokenId, amount, data);
    }

    /** MARKETPLACE FUNCTIONS **/

    // List an NFT for sale at a fixed price
    function listNFT(uint256 tokenId, uint256 price) external payable {
        require(balanceOf(msg.sender, tokenId) > 0, "You do not own this token");
        require(msg.value == listingFee, "Incorrect listing fee"); // Ensure the correct listing fee is paid

        listings[tokenId] = Listing({
            tokenId: tokenId,
            owner: msg.sender,
            price: price,
            isActive: true
        });
    }

    // Buy an NFT at a fixed price
    function buyNFT(uint256 tokenId) external payable nonReentrant {
        Listing storage listing = listings[tokenId];
        require(listing.isActive, "NFT is not listed for sale");
        require(msg.value == listing.price, "Incorrect payment amount");

        address seller = listing.owner;
        safeTransferFrom(seller, msg.sender, tokenId, 1, "");

        // Transfer payment to the seller
        payable(seller).transfer(msg.value);

        // Remove the listing
        listing.isActive = false;
    }

    // Start an auction for an NFT
    function startAuction(
        uint256 tokenId,
        uint256 startingPrice,
        uint256 duration
    ) external {
        require(balanceOf(msg.sender, tokenId) > 0, "You do not own this token");
        require(auctions[tokenId].active == false, "Auction already active");

        auctions[tokenId] = Auction({
            seller: msg.sender,
            tokenId: tokenId,
            startingPrice: startingPrice,
            endTime: block.timestamp + duration,
            highestBidder: address(0),
            highestBid: 0,
            active: true
        });
    }

    // Bid on an auction
    function bid(uint256 tokenId) external payable nonReentrant {
        Auction storage auction = auctions[tokenId];
        require(auction.active, "Auction not active");
        require(block.timestamp < auction.endTime, "Auction ended");
        require(msg.value > auction.highestBid, "Bid too low");

        // Refund the previous highest bidder
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;
    }

    // End an auction
    function endAuction(uint256 tokenId) external nonReentrant {
        Auction storage auction = auctions[tokenId];
        require(auction.active, "Auction not active");
        require(block.timestamp >= auction.endTime, "Auction not ended yet");
        require(auction.seller == msg.sender, "Only seller can end the auction");

        auction.active = false;

        if (auction.highestBidder != address(0)) {
            // Transfer the NFT to the highest bidder
            safeTransferFrom(auction.seller, auction.highestBidder, tokenId, 1, "");

            // Transfer the funds to the seller
            payable(auction.seller).transfer(auction.highestBid);
        }
    }

    /** GET MY NFTs FUNCTION **/

    // Get all NFTs owned by a user
    function getMyNFTs() external view returns (uint256[] memory) {
        return userNFTs[msg.sender];
    }

    /** GET ALL NFTs FUNCTION **/

    // Get all NFTs listed for sale
    function getAllNFTs() external view returns (Listing[] memory) {
        Listing[] memory allListings = new Listing[](totalMintedTokens); // Use the total minted tokens to iterate
        uint256 counter = 0;

        for (uint256 i = 0; i < totalMintedTokens; i++) {
            if (listings[i].isActive) {
                allListings[counter] = listings[i];
                counter++;
            }
        }

        Listing[] memory result = new Listing[](counter);
        for (uint256 i = 0; i < counter; i++) {
            result[i] = allListings[i];
        }

        return result;
    }

    /** INTERNAL HELPER **/

    function _exists(uint256 tokenId) internal view returns (bool) {
        return bytes(uri(tokenId)).length > 0;
    }

    /** WITHDRAW FUNCTION **/
    // Function to withdraw collected fees by the owner
    function withdrawFees() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
