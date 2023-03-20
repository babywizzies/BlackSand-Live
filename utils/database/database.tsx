import { supabase } from '../supabase';
import { verifyMessage } from 'ethers/lib/utils'
import { getPonyName, getUserTokens, userOwnsToken } from '../tokenUtils';
import { Registration } from './interfaces';

/**************************************************
 *                  FETCH
 *************************************************/

export const getAllPonies = async () => {
    const { data: ponies } = await supabase
        .from('pony_stables')
        .select('*')
    return ponies;
}

export const getAllMechas = async () => {
    const { data: mechas } = await supabase
        .from('mecha_stables')
        .select('*')
    return mechas;
}

export const getPonyByID = async (id: number) => {
    const { data: ponies } = await supabase
        .from('pony_stables')
        .select('*')
        .eq('pony_id', id)
    return ponies;
}

export const getMechaByID = async (id: number) => {
    const { data: ponies } = await supabase
        .from('mecha_stables')
        .select('*')
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
        .select('*, past_race_data(*, past_registrations(*))')
        .eq('id', id)

    return races;
}

export const getLatestRace = async () => {
    const { data: races } = await supabase
        .from('races')
        .select('*, race_data(*, registration(*))')
        .order('id', { ascending: false })
        .limit(1)

    return races;
}

export const getAllRaceData = async () => {
    const { data: races } = await supabase
        .from('race_data')
        .select('*, registration(*)')

    return races;
}

export const getRegistrationByWallet = async (walletAddress: string) => {
    const { data: registration } = await supabase
        .from('registration')
        .select('*')
        .eq('wallet', walletAddress)

    return registration
}

export const getPonyByDiscordUsername = async (discordUsername: string) => {
    const { data: registration } = await supabase
        .from('registration')
        .select('*, race_data(*)')
        .eq('discord_handle', discordUsername)

    return registration;
}

/**************************************************
 *                  INSERT
 *************************************************/

export const insertRegistration = async (registration: Registration) => {
    // Check that signature is available
    if (registration.signature == undefined) {
        return { success: false, message: "No signature present" }
    }

    // Check that registration is not closed
    const latestRace = await getLatestRace();
    if (latestRace != null) {
        const latestRaceEndTime = new Date(latestRace[0].end_time);
        const now = new Date();
        if (now > latestRaceEndTime) {
            return { success: false, message: "Registration has ended" }
        }
    }

    // Verify signature to get wallet address, then delete the sig for privacy
    const address = verifyMessage("Register for BlackSand Race", registration.signature);
    if (!address) {
        return null;
    }
    registration.wallet = address;
    delete registration.signature;

    // Check that user owns the token they are trying to race with
    const tokens = await getUserTokens(registration.wallet);
    const ownsToken = await userOwnsToken(registration.id, tokens.data.tokens);
    if (!ownsToken) {
        return { success: false, message: "User does not own token" }
    }

    // Submit registration
    const ponyName = await getPonyName(registration.id, tokens.data.tokens);
    registration.pony_name = ponyName;

    // Set registration DT
    registration.registered_at = ((new Date()).toISOString()).toLocaleString();
    // Set registration RaceID
    registration.race_id = 2;

    const { data, error } = await supabase
        .from('registration')
        .upsert(registration, { ignoreDuplicates: false, onConflict: "wallet" })
        .select()
    // Error creating registration
    if (error != null) {
        return { success: false, message: data }
    }

    // Submit token data for racing
    const race_data = await upsertRaceData({ race_id: 2, pony_id: registration.id, owner_wallet: address })

    if (error != null) {
        return { success: false, message: "User does not own token" };
    }
    return { success: true, message: data };
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
        .from('pony_stables')
        .update(pony)
        .eq('pony_id', pony_id)
        .select()
    if (error != null) {
        return { success: false, message: "Error updating" };
    }
    return { success: true, message: data };
}

export const updateMecha = async (pony: object, pony_id: number) => {
    const { data, error } = await supabase
        .from('mecha_stables')
        .update(pony)
        .eq('pony_id', pony_id)
        .select()
    if (error != null) {
        return { success: false, message: "Error updating" };
    }
    return { success: true, message: data };
}

export const updateTreat = async (treat: object, id: number) => {
    const { data, error } = await supabase
        .from('treats')
        .update(treat)
        .eq('id', id)
        .select()
    if (error != null) {
        return { success: false, message: "Error updating" };
    }
    return { success: true, message: data };
}

export const upsertRaceData = async (race_data: object) => {
    const { data, error } = await supabase
        .from('race_data')
        .upsert(race_data, { ignoreDuplicates: false, onConflict: "owner_wallet" })
        .select()
    if (error != null) {
        return { success: false, message: "Error updating" };
    }
    return { success: true, message: data };
}

export const updateRaceData = async (race_data: object) => {
    const { data, error } = await supabase
        .from('race_data')
        .update(race_data)
        .select()
    if (error != null) {
        console.log(error);
        return { success: false, message: "Error updating" };
    }
    console.log(data);
    return { success: true, message: data };
}

export const updateAbilities = async (ability: object, id: number) => {
    const { data, error } = await supabase
        .from('abilities')
        .update(ability)
        .eq('id', id)
        .select()
    if (error != null) {
        return { success: false, message: "Error updating" };
    }
    return { success: true, message: data };
}

// Find a random target pony in the registration table
export const randomyPony = async () => {
    const { data: targetPonies, error: targetPoniesError } = await supabase
        .from('race_data')
        .select('id, race_ability_points')

    if (targetPoniesError) {
        console.error(targetPoniesError);
        console.log('An error occurred while fetching target pony data.');
        return;
    }

    if (targetPonies.length === 0) {
        console.log('No target ponies found.');
        return;
    }

    const targetPony = targetPonies[Math.floor(Math.random() * targetPonies.length)];
    console.log('Target Pony', targetPony);
}