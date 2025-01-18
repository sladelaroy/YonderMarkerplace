import '../styles/ListMyNFTform.css'

import React, { useState } from 'react'; 
import axios from 'axios'; 
import FormData from 'form-data'

const ListMyNFTform = () => {
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 
  const [price, setPrice] = useState(''); 
  const [image, setImage] = useState(null); 
  const [metadataHash, setMetadataHash] = useState('');

  const handleImageChange = (e) => { 
    setImage(e.target.files[0]); 
  };
  
  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    const pinataApiKey = process.env.PINATA_API_KEY; 
    const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY; // Upload image to IPFS 
    const formData = new FormData(); 
    formData.append('file', image); 
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS'; 
      try { 
        const imageResponse = await axios.post(url, formData, { 
          maxContentLength: 'Infinity', 
          headers: { 
            'Content-Type': `multipart/form-data; 
            boundary=${formData._boundary}`, 
            'pinata_api_key': pinataApiKey, 
            'pinata_secret_api_key': pinataSecretApiKey 
          } 
        }); 
        const imageUrl = `ipfs://${imageResponse.data.IpfsHash}`; // Create metadata 
        const metadata = { 
          name, 
          description, 
          price, 
          image: imageUrl 
        }; 
        const urlMetadata = 'https://api.pinata.cloud/pinning/pinJSONToIPFS'; 
        const metadataResponse = await axios.post(urlMetadata, metadata, { 
          headers: { 
            'pinata_api_key': pinataApiKey, 
            'pinata_secret_api_key': pinataSecretApiKey 
          } 
        }); 
        setMetadataHash(metadataResponse.data.IpfsHash); 
      } catch (error) { 
          console.error('Error uploading to IPFS:', error); 
    } 
  };

  
  return (
    <>
      <div className='list-my-nft-form-box'>
        <div className="list-my-nft-form">
          <form id="listNftForm" onSubmit={handleSubmit}>
            <h2 className='form-title'>List Your NFT</h2>

            <div className='nft-name'>
              <label for="nftName">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="nftName" name="nftName" placeholder="Enter NFT name" required />
            </div>

            <div className='nft-description'>
              <label for="nftDescription" >Description</label>
              <textarea id="nftDescription" value={description} onChange={(e) => setDescription(e.target.value)} name="nftDescription" placeholder="Describe your NFT"  required></textarea>
            </div>

            <div className='price-in-eth'>
              <label for="nftPrice" >Price in ETH</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} id="nftPrice" name="nftPrice" placeholder="Enter price in ETH" step="0.01" min="0"  required/>
            </div>
             
            <div className='nft-image'>
              <label for="nftImage">
                <span>
                  Upload NFT Image
                </span>
              </label>
              <input type="file" onChange={handleImageChange} id="nftImage" name="nftImage" accept="image/*"  required/>
            </div>
    
            <button type="submit" className='list-nft-button'>List NFT</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ListMyNFTform
