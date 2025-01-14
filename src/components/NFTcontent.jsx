import '../styles/NFTcontent.css';
import heroBackground from '../assets/images/heroBackground.webp';
import ethereumIcon from '../assets/images/ethereumIcon.svg';

const NFTcontent = () => {
  return (
    <>
      <div className="nft-content">
        <div className="img-details-container">
          <img src={heroBackground}/>
          <div className='about-nft-details'>
            <p>First Mint</p>
          </div>
        </div>
        <div className='description-container'>
          <div className='description-header'>
            <div>
              <p>Owner: <span>0xirjksjhsfhsrjhfhdfh</span></p>
              <h2>First Mint</h2>
            </div>
            <div>
              <h2><img src={ethereumIcon} />0.03 ETH</h2>
            </div>
            <div>
              <button>
                Purchase NFT
              </button>
            </div> 
          </div>
          <div className='description-box'>
            <h4>Description</h4>
            <hr></hr>
            <span className='description-textbox'>
                rklgklerjkagjkasjkasjkfjkasdsdjksdjsdjsfnkfjkfjkfjkfdfvjhdfjfjhkf
                vbjksvjksvjksjksvjhksdfjksdfjhksdfjksfrklgklerjkagjkasjkasjkfjkasdsd
            </span>
          </div>
        </div>  
      </div>
    </>
  )
}

export default NFTcontent
