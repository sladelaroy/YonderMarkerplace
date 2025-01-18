// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YonderMarketplace is ERC721URIStorage, ReentrancyGuard, Ownable {
    uint public listingFee = 0.01 ether;
    uint public mintingFee = 0.01 ether;
    uint public totalFeesCollected;

    mapping(uint => uint) public listedPrices; // Price of listed NFTs
    mapping(uint => Auction) public auctions;
    mapping(string => bool) private ipfsHashes; // Track minted IPFS hashes
    mapping(address => uint) private pendingRefunds; // Refunds for bids

    struct Auction {
        uint tokenId;
        address payable highestBidder;
        uint highestBid;
        uint endTime;
        bool isActive;
    }

    event NFTMinted(uint indexed tokenId, address indexed owner, string ipfsHash);
    event NFTListed(uint indexed tokenId, uint price);
    event NFTUnlisted(uint indexed tokenId);
    event NFTSold(uint indexed tokenId, address indexed buyer, uint price);
    event AuctionStarted(uint indexed tokenId, uint startTime, uint endTime);
    event BidPlaced(uint indexed tokenId, address indexed bidder, uint amount);
    event AuctionEnded(uint indexed tokenId, address indexed winner, uint winningBid);
    event OwnershipTransferred(address newOwner);

    constructor() ERC721("YonderNFT", "YND") Ownable(msg.sender) {}

    // Convert IPFS hash to uint tokenId
    function hashToTokenId(string memory ipfsHash) public pure returns (uint) {
        return uint(keccak256(abi.encodePacked(ipfsHash)));
    }

    // Mint an NFT using ipfsHash as the tokenId
    function mintNFT(string memory ipfsHash) external payable nonReentrant {
        require(msg.value == mintingFee, "Incorrect minting fee");
        require(!ipfsHashes[ipfsHash], "IPFS hash already minted");

        uint tokenId = hashToTokenId(ipfsHash);

        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, ipfsHash);

        ipfsHashes[ipfsHash] = true;
        totalFeesCollected += msg.value;

        emit NFTMinted(tokenId, msg.sender, ipfsHash);
    }

    // List an NFT for sale
    function listNFT(uint tokenId, uint price) external payable nonReentrant {
        require(ownerOf(tokenId) == msg.sender, "You don't own this NFT");
        require(msg.value == listingFee, "Incorrect listing fee");
        require(price > 0, "Price must be greater than zero");

        listedPrices[tokenId] = price;
        totalFeesCollected += msg.value;

        emit NFTListed(tokenId, price);
    }

    // Unlist an NFT
    function unlistNFT(uint tokenId) external nonReentrant {
        require(ownerOf(tokenId) == msg.sender, "You don't own this NFT");
        require(listedPrices[tokenId] > 0, "NFT is not listed");

        delete listedPrices[tokenId];

        emit NFTUnlisted(tokenId);
    }

    // Buy an NFT
    function buyNFT(uint tokenId) external payable nonReentrant {
        uint price = listedPrices[tokenId];
        require(price > 0, "NFT is not listed");
        require(msg.value == price, "Incorrect price");

        address payable seller = payable(ownerOf(tokenId));

        delete listedPrices[tokenId];
        _transfer(seller, msg.sender, tokenId);

        (bool sent, ) = seller.call{value: msg.value}("");
        require(sent, "Payment to seller failed");

        emit NFTSold(tokenId, msg.sender, price);
    }

    // Start an auction
    function auctionNFT(uint tokenId, uint duration) external nonReentrant {
        require(ownerOf(tokenId) == msg.sender, "You don't own this NFT");
        require(listedPrices[tokenId] == 0, "NFT is already listed");
        require(!auctions[tokenId].isActive, "Auction already active");

        auctions[tokenId] = Auction(
            tokenId,
            payable(address(0)),
            0,
            block.timestamp + duration,
            true
        );

        emit AuctionStarted(tokenId, block.timestamp, block.timestamp + duration);
    }

    // Place a bid in an auction
    function placeBid(uint tokenId) external payable nonReentrant {
        Auction storage auction = auctions[tokenId];
        require(auction.isActive, "Auction is not active");
        require(block.timestamp < auction.endTime, "Auction has ended");
        require(msg.value > auction.highestBid, "Bid is too low");

        if (auction.highestBidder != address(0)) {
            pendingRefunds[auction.highestBidder] += auction.highestBid;
        }

        auction.highestBid = msg.value;
        auction.highestBidder = payable(msg.sender);

        emit BidPlaced(tokenId, msg.sender, msg.value);
    }

    // End an auction
    function endAuction(uint tokenId) external nonReentrant {
        Auction storage auction = auctions[tokenId];
        require(auction.isActive, "Auction is not active");
        require(block.timestamp >= auction.endTime, "Auction is not over");

        auction.isActive = false;

        if (auction.highestBidder != address(0)) {
            address payable seller = payable(ownerOf(tokenId));
            _transfer(seller, auction.highestBidder, tokenId);

            (bool sent, ) = seller.call{value: auction.highestBid}("");
            require(sent, "Payment to seller failed");

            emit AuctionEnded(tokenId, auction.highestBidder, auction.highestBid);
        }
    }

    // Withdraw pending refunds
    function withdrawRefunds() external nonReentrant {
        uint amount = pendingRefunds[msg.sender];
        require(amount > 0, "No refunds available");

        pendingRefunds[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Refund transfer failed");
    }

    // Withdraw platform fees
    function withdrawFees() external onlyOwner nonReentrant {
        uint amount = totalFeesCollected;
        totalFeesCollected = 0;

        (bool sent, ) = owner().call{value: amount}("");
        require(sent, "Fee withdrawal failed");
    }

    // Set listing fee
    function setListingFee(uint _fee) external onlyOwner {
        listingFee = _fee;
    }

    // Set minting fee
    function setMintingFee(uint _fee) external onlyOwner {
        mintingFee = _fee;
    }

    // Fallback function to receive Ether
    receive() external payable {
        totalFeesCollected += msg.value;
    }
}
