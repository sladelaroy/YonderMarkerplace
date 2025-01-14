import Hero from './hero.jsx';
import ListedNFTs from './ListedNFTs.jsx';
import NFTcontent from './NFTcontent.jsx';
import ListMyNFTform from './ListMyNFTform.jsx';
import UserProfile from './UserProfile.jsx';
import '../styles/BodyComponents.css';

const BodyComponents = () => {
  return (
    <>
      <div className='body-components'>
        <Hero />
        <ListedNFTs />
        <NFTcontent />
        <ListMyNFTform />
        <UserProfile />
      </div>
    </>
  )
}

export default BodyComponents
