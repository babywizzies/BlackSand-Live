export interface Registration {
    id: string,
    collection: string,
    discord_handle: string,
    treats: string[],
    wallet?: string,
    pony_name?: string,
    signature?: string,
}

export interface Race {
    id: number,
    name: string,
    start_time: string,
    end_time: string
}