import '../styles/Navbar.css'
import yonderLogo from '../assets/images/yonderLogo.svg';
import profileIcon from '../assets/images/profileIcon.png';
import searchIcon from '../assets/images/searchIcon.svg';
import inputSearch from '../assets/images/inputSearch.png';

const Navbar = () => {
  return (
    <>
      <div className='navbar'>
        <div className="left-container">
          <img src={yonderLogo} alt='yonder-logo' />
        </div>
        <div className="right-container">
          <div className='searchElement'>
            <input type="text" placeholder="Search for NFTs" />
            <button className='searchButton'>
              <img src={inputSearch} alt="Description of the image" />
            </button>
          </div>
          <div className='second-div'>
            <button className='exploreButton'>Explore</button>
            <button className='listMyNftButton'>List NFT</button>
            <button className='profileIconButton'>
              <img src={profileIcon} />
            </button>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Navbar
