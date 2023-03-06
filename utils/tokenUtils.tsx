import axios from "axios";

export const getUserTokens = async (address: string) => {
    const options = { method: 'GET', headers: { accept: '*/*' } };
    const contractAddress = '0xf486f696B80164B5943191236ECa114f4EfAb2FF';
    return axios.get('https://api.reservoir.tools/users/' + address + '/tokens/v6?collection=' + contractAddress, options)
}

export const userOwnsToken = async (tokenId: string, tokensOwned: string[]) => {
    let tokenArray: string[] = [];
    tokensOwned.forEach(x => tokenArray.push(x.token.tokenId));
    if (tokenArray.includes(tokenId)) {
        return true
    }
    return false;
}

export const getPonyName = async (tokenId: string, tokensOwned: string[]) => {
    let tokenArray: string;
    tokensOwned.forEach(function (x) {
        if (x.token.tokenId == tokenId) {
            tokenArray = x;
        }
    });
    return tokenArray.token.name;
}