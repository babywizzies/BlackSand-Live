import "../styles/css/globals.css";
import "../styles/css/accordion.css";
import "@rainbow-me/rainbowkit/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import type { AppProps } from "next/app";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createClient,
  goerli,
  mainnet,
  WagmiConfig,
} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { ReservoirKitProvider } from "@reservoir0x/reservoir-kit-ui";
import { SWRConfig } from "swr";

const HOST = process.env.NEXT_PUBLIC_HOST || "https://blacksand.city";

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [
    alchemyProvider({
      apiKey: "A3_YV01MMQG6EXUN5j8tO0L8FlYm7ER5",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ReservoirKitProvider
            options={{
              chains: [
                {
                  id: 1,
                  baseApiUrl: `${HOST}/api/reservoir`,
                  default: true,
                },
              ],
            }}
          >
            <NavBar />
            <Component {...pageProps} />
          </ReservoirKitProvider>
          <Footer />
        </RainbowKitProvider>
      </WagmiConfig>
    </SWRConfig>
  );
}

export default MyApp;
