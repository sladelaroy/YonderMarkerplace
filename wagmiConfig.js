import { createClient, configureChains, WagmiConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

// Configure chains and providers
const { chains, provider } = configureChains(
  [sepolia, mainnet], // Include Sepolia and other supported networks
  [publicProvider()]
);

// Create a Wagmi client
const client = createClient(
  getDefaultClient({
    appName: "My DApp",
    chains,
  })
);

export { client, chains, WagmiConfig, ConnectKitProvider };
