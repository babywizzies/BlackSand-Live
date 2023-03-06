import axios from "axios";

export const getUserTokens = async (address: string) => {
    const options = { method: 'GET', headers: { accept: '*/*' } };
    const contractAddress = '0xf486f696B80164B5943191236ECa114f4EfAb2FF';
    return axios.get('https://api.reservoir.tools/users/' + address + '/tokens/v6?collection=' + contractAddress, options)
}

export const userOwnsToken = async (tokenId: string, tokensOwned: TokenData) => {
    let tokenArray: string[] = [];
    tokensOwned.tokens.forEach(x => tokenArray.push(x.token.tokenId));
    if (tokenArray.includes(tokenId)) {
        return true
    }
    return false;
}

export const getPonyName = async (tokenId: string, tokensOwned: TokenData) => {
    let tokenArray!: Token;
    tokensOwned.tokens.forEach(function (x) {
        if (x.token.tokenId == tokenId) {
            tokenArray = x;
        }
    });
    return tokenArray.token.name
}

export interface LastBuy {
    value?: any;
    timestamp?: any;
}

export interface LastSell {
    value?: number;
    timestamp?: number;
}

export interface Collection {
    id: string;
    name: string;
    imageUrl: string;
    floorAskPrice: number;
}

export interface Token2 {
    contract: string;
    tokenId: string;
    kind: string;
    name: string;
    image: string;
    lastBuy: LastBuy;
    lastSell: LastSell;
    rarityScore?: number;
    rarityRank?: number;
    media: string;
    collection: Collection;
}

export interface FloorAsk {
    id?: any;
    price?: any;
    maker?: any;
    validFrom?: any;
    validUntil?: any;
}

export interface Ownership {
    tokenCount: string;
    onSaleCount: string;
    floorAsk: FloorAsk;
    acquiredAt: Date;
}

export interface Token {
    token: Token2;
    ownership: Ownership;
}

export interface TokenData {
    tokens: Token[];
    continuation: string;
}