import '../styles/hero.css'
import heroBackground from '../assets/images/heroBackground.webp'
import blackYonder from '../assets/images/blackYonder.png'
import wonderYonder from '../assets/images/wonderYonder.png'
import artYonder from '../assets/images/artYonder.png'
const Hero = () => {
  return (
    <>
      <div className="hero">
        <div className='hero-text'>
          <span>
            This is <img src={blackYonder} />
          </span>
          <span>
            Your <img src={artYonder} />, Your <img src={wonderYonder} />
          </span>
        </div>
        <div className='hero-image'>
          <img src={heroBackground} />
        </div>
      </div>
    </>
  )
}

export default Hero
