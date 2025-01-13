import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <>
      <div className='navbar'>
        <div className="left-container">Yonder</div>
        <div className="right-container">
          <div>
            <input type="text" placeholder="Search for NFTs" />
            <button>
              <img src="path/to/your/image.svg" alt="Description of the image" />
            </button>
          </div>
          <div>
            <button>Explore</button>
            <button>List my NFT</button>
            <button>profile</button>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Navbar
