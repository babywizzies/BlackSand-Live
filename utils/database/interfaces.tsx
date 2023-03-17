export interface Registration {
    id: string,
    collection: string,
    discord_handle: string,
    treats: string[],
    wallet?: string,
    pony_name?: string | null,
    signature?: string,
    registered_at: string,
    race_id: number
}

export interface MechaStables {
    id: number,
    origins: string,
    rune: string,
    color: string,
    level: number,
    experience: number,
    ability_1: string,
    ability_2: string,
    ability_3: string,
    pony_name: string
}

export interface Race {
    id: number,
    name: string,
    start_time: string,
    end_time: string
}