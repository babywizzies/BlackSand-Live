import { supabase } from '../supabase';

/**************************************************
 *                  FETCH
 *************************************************/

export const getAllPonies = async () => {
    const { data: ponies } = await supabase
        .from('ponies')
        .select('*, races(id,race_name,experience_gained), abilities(id,ability_name), treats(id,treat)')
    return ponies;
}

export const getPonyByID = async (id: number) => {
    const { data: ponies } = await supabase
        .from('ponies')
        .select('*, races(id,race_name, experience_gained), abilities(id,ability_name), treats(id,treat)')
        .eq('pony_id', id)
    return ponies;
}

/**************************************************
 *                  INSERT
 *************************************************/

export const insertPony = async (pony: object) => {
    const { data, error } = await supabase
        .from('ponies')
        .insert(pony)
        .select()

    if (error != null) {
        return error
    }
    return data;
}

export const insertTreat = async (treats: object) => {
    const { data, error } = await supabase
        .from('treats')
        .insert(treats)
        .select()
    if (error != null) {
        return error
    }
    return data;
}

export const insertRace = async (race: object) => {
    const { data, error } = await supabase
        .from('races')
        .insert(race)
        .select()
    if (error != null) {
        return error
    }
    return data;
}

export const insertAbilities = async (abilities: object) => {
    const { data, error } = await supabase
        .from('abilities')
        .insert(abilities)
        .select()
    if (error != null) {
        return error
    }
    return data;
}


/**************************************************
 *                  UPDATE
 *************************************************/

export const updatePony = async (pony: object, pony_id: number) => {
    const { data, error } = await supabase
        .from('ponies')
        .update(pony)
        .eq('pony_id', pony_id)
        .select()
    if (error != null) {
        return error
    }
    return data;
}

export const updateTreat = async (treat: object, id: number) => {
    const { data, error } = await supabase
        .from('treats')
        .update(treat)
        .eq('id', id)
        .select()
    if (error != null) {
        return error
    }
    return data;
}

export const updateRace = async (race: object, id: number) => {
    const { data, error } = await supabase
        .from('races')
        .update(race)
        .eq('id', id)
        .select()
    if (error != null) {
        return error
    }
    return data;
}

export const updateAbilities = async (ability: object, id: number) => {
    const { data, error } = await supabase
        .from('abilities')
        .update(ability)
        .eq('id', id)
        .select()
    if (error != null) {
        return error
    }
    return data;
}