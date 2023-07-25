import axios from "axios";

export const getUserTokens = async (address: string) => {
  const options = { method: "GET", headers: { accept: "*/*" } };
  const contractAddress = "0xf486f696B80164B5943191236ECa114f4EfAb2FF";
  return axios.get(
    `https://api.reservoir.tools/users/${address}/tokens/v6?collection=${contractAddress}&limit=200`,
    options
  );
};

export const userOwnsToken = async (
  tokenId: string,
  tokensOwned: TokenData[]
) => {
  if (tokensOwned == undefined) {
    return false;
  }

  for (let i in tokensOwned) {
    if (tokensOwned[i].token.tokenId == tokenId) {
      return true;
    }
  }

  return false;
};

export const getPonyName = async (
  tokenId: string,
  tokensOwned: TokenData[]
) => {
  for (let i in tokensOwned) {
    if (tokensOwned[i].token.tokenId == tokenId) {
      return tokensOwned[i].token.name;
    }
  }
  return undefined;
};

export interface TokenData {
  token: Token;
}

export interface TokenElement {
  token: Token;
}

export interface Token {
  contract: string;
  tokenId: string;
  kind: string;
  name: string;
  image: string;
  rarityScore: null;
  rarityRank: null;
  media: null;
  collection: Collection;
}

export interface Collection {
  id: string;
  name: string;
  imageUrl: string;
  floorAskPrice: number;
}
