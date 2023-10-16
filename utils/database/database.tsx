import { supabase } from '../supabase';
import { verifyMessage } from 'ethers/lib/utils'
import { getPonyName, getUserTokens, userOwnsToken } from '../tokenUtils';
import { Registration } from './interfaces';

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

export const getLatestRacePonies = async () => {
    const { data: races } = await supabase
        .from('races')
        .select('*, race_data(*, registration(*))')
        .order('id', { ascending: false })
        .limit(1);

    return races;
}

export const getLatestRaceID = async () => {
    const { data: races } = await supabase
        .from('races')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);

    return races;
}

export const userRegistrationExists = async (discord_handle: string) => {
    const { data: registration } = await supabase
        .from('registration')
        .select('*')
        .eq('discord_handle', discord_handle)

    if (registration != null) {
        return registration;
    }
    return null;
}

/**************************************************
 *                  INSERT
 *************************************************/

export const insertRegistration = async (registration: Registration) => {
    // Check for empty signature
    if (registration.signature == undefined) {
        return { success: false, message: "No signature present" }
    }

    // Verify signature
    const address = verifyMessage("Register for BlackSand Race", registration.signature);
    if (!address) {
        return null;
    }
    registration.wallet = address;
    delete registration.signature;

    // Check that user owns the token
    const tokens = await getUserTokens(registration.wallet);
    const ownsToken = await userOwnsToken(registration.id, tokens.data.tokens);

    if (!ownsToken) {
        return { success: false, message: "User does not own token" }
    }

    // Get Pony Name
    const ponyName = await getPonyName(registration.id, tokens.data.tokens);
    registration.pony_name = ponyName;

    // Check for existing registration
    const existingRegistration = await userRegistrationExists(registration.discord_handle)

    // Get the latest races ID to insert with registration
    const latestRaceID = await getLatestRaceID();

    // Brand new registration
    if (existingRegistration == null || existingRegistration.length == 0) {
        // Straight insert of new values
        const { data, error } = await supabase
            .from('registration')
            .insert(registration)
        if (latestRaceID != null) {
            await updateRaceData({ race_id: latestRaceID[0].id ?? 0, pony_id: registration.id })
        }
        return { success: true, message: data };
    } else {
        // Delete old registration data because PonyID is the ID[PK]
        await deleteRaceData(existingRegistration[0].id);
        // Delete old race_data relative to old registered pony ID
        await deleteRegistration(existingRegistration[0].id);
        // Re-insert brand new information with the latest race ID
        const { data, error } = await supabase
            .from('registration')
            .insert(registration)
        if (latestRaceID != null) {
            await updateRaceData({ race_id: latestRaceID[0].id ?? 0, pony_id: registration.id })
        }
        return { success: true, message: data };
    }
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

export const insertRaceData = async (race_data: object) => {
    const { data, error } = await supabase
        .from('race_data')
        .insert(race_data)
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

export const updateRaceData = async (race_data: object) => {
    const { data, error } = await supabase
        .from('race_data')
        .upsert(race_data, { ignoreDuplicates: false, onConflict: "id" })
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

/**************************************************
 *                  DELETE
 *************************************************/

export const deleteRegistration = async (ponyID: number) => {
    const { data, error } = await supabase
        .from('registration')
        .delete()
        .eq('id', ponyID)
    if (error != null) {
        return error
    }
    return data;
}

export const deleteRaceData = async (ponyID: number) => {
    const { data, error } = await supabase
        .from('race_data')
        .delete()
        .eq('pony_id', ponyID)
    if (error != null) {
        return error
    }
    return data;
}