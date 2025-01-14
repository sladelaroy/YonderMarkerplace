

const NFTcontent = () => {
  return (
    <>
      <div className="nft-content">
        <div className="nft-image">
          <img src="https://via.placeholder.com/600" alt="NFT Image" className="nft-image" id="nftImage" />
        </div>
        
        <div className="nft-details">
            <h2 id="nftName">NFT Name</h2>
            <p className="nft-price" id="nftPrice">Price: 0.1 ETH</p>
            <a href="#" className="buy-button" id="buyNFT">Buy NFT</a>
        </div>
      </div>
    </>
  )
}

export default NFTcontent
