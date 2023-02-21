import { mainnet } from "wagmi/chains";
import useSWR from "swr";
import { useAccount } from "wagmi";

function truncateAddress(address: string, shrinkInidicator?: string) {
  return address.slice(0, 4) + (shrinkInidicator || "…") + address.slice(-4);
}

function truncateEns(ensName: string, shrinkInidicator?: string) {
  if (ensName.length < 24) return ensName;

  return ensName.slice(0, 20) + (shrinkInidicator || "…") + ensName.slice(-3);
}

export const useEnsResolver = (address?: string, chainId: number = 1) => {
  const { address: accountAddress } = useAccount();
  const addressLowercase = address?.toLowerCase();
  const isENSAvailable = chainId === mainnet.id;
  const isAccountAddress =
    accountAddress && address?.toLowerCase() === accountAddress?.toLowerCase();

  const response = useSWR(
    `https://api.ensideas.com/ens/resolve/${addressLowercase}`,
    (url: string) => {
      if (!isENSAvailable || !address) {
        return null;
      }
      return fetch(url).then((response) => response.json());
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  const shortAddress = address ? truncateAddress(address) : "";
  const shortName = response.data?.name
    ? truncateEns(response.data.name)
    : null;
  let displayName = "";

  if (isAccountAddress) {
    displayName = "You";
  } else if (response.data?.name) {
    displayName = shortName || "";
  } else if (address) {
    displayName = shortAddress;
  }

  return {
    ...response,
    address,
    name: response.data?.name,
    shortName,
    displayName,
    shortAddress,
    avatar: response.data?.avatar,
  };
};

export default useEnsResolver;
