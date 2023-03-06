import { supabase } from '../supabase';
import { verifyMessage } from 'ethers/lib/utils'
import { getPonyName, getUserTokens, userOwnsToken } from '../tokenUtils';

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

export const getRegistrationByID = async (id: number) => {
    const { data: registration } = await supabase
        .from('registration')
        .select('*')
        .eq('id', id)
    return registration;
}

export const getRaceByID = async (id: number) => {
    const { data: races } = await supabase
        .from('races')
        .select('*, race_data(*, registration(*))')
        .eq('id', id)

    return races;
}

/**************************************************
 *                  INSERT
 *************************************************/

export const insertRegistration = async (registration: object) => {

    const address = verifyMessage("Register for BlackSand Race", registration.signature);
    if (!address) {
        return null;
    }
    registration.wallet = address;

    const tokens = await getUserTokens(registration.wallet);
    const ownsToken = await userOwnsToken(registration.id, tokens.data.tokens);

    if (!ownsToken) {
        return { "error": "User does not own token" }
    }

    const ponyName = await getPonyName(registration.id, tokens.data.tokens);
    registration.pony_name = ponyName;

    const { data, error } = await supabase
        .from('registration')
        .upsert(registration, { ignoreDuplicates: false, onConflict: "id" })
        .select()

    if (error != null) {
        return { "error": "User does not own token" };
    }
    return { "success": data };
}

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