import '../styles/ListedNFTs.css'
import heroBackground from '../assets/images/heroBackground.webp';
import ethereumIcon from '../assets/images/ethereumIcon.svg';

const ListedNFTs = () => {
  return (
    <>
       <div id="lisedNftsId" className="listed-nfts">
          <div>
            <p>LISTED NFTs</p>
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

export default ListedNFTs
