import '../styles/ListMyNFTform.css'

const ListMyNFTform = () => {
  return (
    <>
      <div className='list-my-nft-form-box'>
        <div className="list-my-nft-form">
          <form id="listNftForm">
            <h2>List Your NFT</h2>
            <label for="nftName">NFT Name</label>
            <input type="text" id="nftName" name="nftName" placeholder="Enter NFT name" required />
    
            <label for="nftDescription">NFT Description</label>
            <textarea id="nftDescription" name="nftDescription" placeholder="Describe your NFT" required></textarea>
    
            <label for="nftPrice">Price in ETH</label>
            <input type="number" id="nftPrice" name="nftPrice" placeholder="Enter price in ETH" step="0.01" min="0" required/>
    
            <label for="nftImage">Upload NFT Image</label>
            <input type="file" id="nftImage" name="nftImage" accept="image/*" required/>
    
            <button type="submit">List NFT</button>
          </form>
        </div>
      </div>
      
 
    </>
  )
}

export default ListMyNFTform
