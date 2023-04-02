import axios from "axios";

export const getUserTokens = async (address: string) => {
    const API_ENDPOINT = "https://blacksand.city/api/reservoir"
    const CONTRACT_ADDRESS = '0xf486f696B80164B5943191236ECa114f4EfAb2FF';
    const ADDRESS = address;
    return axios.get(`${API_ENDPOINT}/users/${ADDRESS}/tokens/v6?collection=${CONTRACT_ADDRESS}`)
}

export const userOwnsToken = async (tokenId: string, tokensOwned: TokenData[]) => {
    if (tokensOwned == undefined) {
        return false;
    }

    for (let i in tokensOwned) {
        if (tokensOwned[i].token.tokenId == tokenId) {
            return true;
        };
    }

    return false;
}

export const getPonyName = async (tokenId: string, tokensOwned: TokenData[]) => {
    for (let i in tokensOwned) {
        if (tokensOwned[i].token.tokenId == tokenId) {
            return tokensOwned[i].token.name;
        };
    }
    return undefined;
}

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
