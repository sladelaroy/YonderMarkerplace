import '../styles/ListMyNFTform.css'

const ListMyNFTform = () => {
  return (
    <>
      <div className='list-my-nft-form-box'>
        <div className="list-my-nft-form">
          <form id="listNftForm">
            <h2 className='form-title'>List Your NFT</h2>

            <div className='nft-name'>
              <label for="nftName">Name</label>
              <input type="text" id="nftName" name="nftName" placeholder="Enter NFT name" required />
            </div>

            <div className='nft-description'>
              <label for="nftDescription" >Description</label>
              <textarea id="nftDescription" name="nftDescription" placeholder="Describe your NFT" required></textarea>
            </div>

            <div className='price-in-eth'>
              <label for="nftPrice" >Price in ETH</label>
              <input type="number" id="nftPrice" name="nftPrice" placeholder="Enter price in ETH" step="0.01" min="0" required/>
            </div>
             
            <div className='nft-image'>
              <label for="nftImage">
                <span>
                  Upload NFT Image
                </span>
              </label>
              <input type="file" id="nftImage" name="nftImage" accept="image/*" required/>
            </div>
    
            <button type="submit" className='list-nft-button'>List NFT</button>
          </form>
        </div>
      </div>
      
 
    </>
  )
}

export default ListMyNFTform
