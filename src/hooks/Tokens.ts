import defaultTokens from "../config/default_tokens.ts";

class Token {
    address: string;
    decimals: number;
    name: string;
    symbol: string;
    constructor(address: string, decimals: number, name: string, symbol: string) {
        this.address = address;
        this.decimals = decimals;
        this.name = name;
        this.symbol = symbol;
    }

    static fromObject(obj: any) {
        return new Token(obj.address, obj.decimals, obj.name, obj.symbol);
    }
}

export const useTokens = (): Token[] => {
    return defaultTokens.map((token) => Token.fromObject(token));
}