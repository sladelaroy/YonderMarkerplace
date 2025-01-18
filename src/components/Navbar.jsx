import { Link } from 'react-router-dom';

import '../styles/Navbar.css'
import yonderLogo from '../assets/images/yonderLogo.svg';
import profileIcon from '../assets/images/profileIcon.svg';
import searchIcon from '../assets/images/searchIcon.svg';
import inputSearch from '../assets/images/inputSearch.png';
import exploreIcon from '../assets/images/exploreIcon.svg';
import listNFTicon from '../assets/images/listNFTicon.svg';

const Navbar = () => {
  return (
    <>
      <div className='navbar'>
        <Link to='/'>
          <div className="left-container">
            <img src={yonderLogo} alt='Yonder logo' />
          </div>
        </Link>
        
        <div className="right-container">
          <div className='searchElement'>
            <input type="text" placeholder="Search for NFTs" />
            <button className='searchButton'>
              <img className='inputSearch' src={inputSearch} alt="Search icon" />
            </button>
          </div>
          <div className='second-div'>
            <button>
              <img className='searchIcon' src={searchIcon} />
            </button>
            
            <Link className="react-link" to='/#listedNftsId'>
              <button className='exploreButton'>
                <span>Explore</span>
                <img src={exploreIcon} alt="Explore icon" />
              </button>
            </Link>
            <Link className="react-link" to='/listYourNft'>
              <button className='listMyNftButton'>
                <span>List NFT</span>
                <img src={listNFTicon} alt="List NFT icon" />
              </button>
            </Link>
            <Link className="react-link" to='/userProfile'>
              <button className='profileIconButton'>
                <span>Profile</span>
                <img src={profileIcon} alt="Profile icon" />
              </button>
            </Link>
            
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Navbar
