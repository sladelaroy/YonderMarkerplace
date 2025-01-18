import Hero from "../components/hero.jsx"
import ListedNFTs from "../components/ListedNFTs.jsx"
import ConnectWallet from "../components/ConnectWallet.jsx"

const HomePage = () => {
  return (
    <>
      <ConnectWallet />
      <Hero />
      <ListedNFTs />
    </>
  )
}

export default HomePage
