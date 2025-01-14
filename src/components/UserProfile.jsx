import '../styles/UserProfile.css';
import heroBackground from '../assets/images/heroBackground.webp';
import ethereumIcon from '../assets/images/ethereumIcon.svg';


const UserProfile = () => {
  return (
    <>
      <div className='user-profile-div'>
        <div className='user-profile-div-img-container'>
          <img className='user-profile-div-img' src={heroBackground}/>
          <h1>Unnamed</h1>
        </div>
        <div className='user-profile-div-details'>
          <span className='user-profile-div-details-address'>0xujoejjuuie9iuejikeuikjwei</span>
          <div className='user-profile-div-details-eth-nft'>
            <img src={ethereumIcon}/><span className='user-profile-div-details-eth'>3.45 ETH</span>
            <span>Total: <span>5 </span>NFT(s)</span>
          </div>
        </div>
          <hr />

        <div className='user-profile-div-my-nfts'>
          <p>My NFTs</p>
          <hr></hr>
        </div>
        
        <div className='the-listed-nfts'>
          <div className='nft-containers'>
                          <img src={heroBackground}/>
                          <div className='about-nft'>
                            <p>First Mint</p>
                            <div className='about-nft-eth-price'>
                              <img src={ethereumIcon}/>
                              <span>  
                                0.05 ETH
                              </span>
                            </div>
                            
                          </div>
          </div>
          <div className='nft-containers'>
              <img src={heroBackground}/>
              <div className='about-nft'>
                <p>First Mint</p>
                <div className='about-nft-eth-price'>
                  <img src={ethereumIcon}/>
                  <span>  
                    0.05 ETH
                  </span>
                </div>
                
              </div>
          </div>
          <div className='nft-containers'>
              <img src={heroBackground}/>
              <div className='about-nft'>
                <p>First Mint</p>
                <div className='about-nft-eth-price'>
                  <img src={ethereumIcon}/>
                  <span>  
                    0.05 ETH
                  </span>
                </div>
                
              </div>
          </div>
          <div className='nft-containers'>
              <img src={heroBackground}/>
              <div className='about-nft'>
                <p>First Mint</p>
                <div className='about-nft-eth-price'>
                  <img src={ethereumIcon}/>
                  <span>  
                    0.05 ETH
                  </span>
                </div>
                
              </div>
          </div>
          <div className='nft-containers'>
              <img src={heroBackground}/>
              <div className='about-nft'>
                <p>First Mint</p>
                <div className='about-nft-eth-price'>
                  <img src={ethereumIcon}/>
                  <span>  
                    0.05 ETH
                  </span>
                </div>
                
              </div>
          </div>
          <div className='nft-containers'>
              <img src={heroBackground}/>
              <div className='about-nft'>
                <p>First Mint</p>
                <div className='about-nft-eth-price'>
                  <img src={ethereumIcon}/>
                  <span>  
                    0.05 ETH
                  </span>
                </div>
                
              </div>
          </div> 
        </div>
      </div>
    </>
  )
}

export default UserProfile
