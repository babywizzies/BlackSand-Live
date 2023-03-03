import { supabase } from '../../../utils/supabase';

/**************************************************
 *                  FETCH
 *************************************************/

export const getAllPonies = async () => {
    const { data: bs_ponies } = await supabase
        .from('bs_ponies')
        .select('*')
    return bs_ponies;
}

export const getPonyByID = async (id: number) => {
    const { data: bs_ponies } = await supabase
        .from('bs_ponies')
        .select()
        .eq('pony_id', id)
    return bs_ponies;
}

export const getAbilitiesByPonyID = async (id: number) => {
    const { data: bs_ponies } = await supabase
        .from('bs_abilities')
        .select()
        .eq('pony_id', id)
    return bs_ponies;
}

export const getRacesByPonyID = async (id: number) => {
    const { data: bs_ponies } = await supabase
        .from('bs_races')
        .select()
        .eq('pony_id', id)
    return bs_ponies;
}

export const getAllPonyDataByID = async (id: number) => {
    const { data: bs_ponies } = await supabase
        .from('bs_ponies')
        .select('*, bs_abilities(*), bs_races(*)')
        .eq('pony_id', id)
    return bs_ponies;
}

/**************************************************
 *                  INSERT
 *************************************************/

// export const insertPony = async (pony: bs_ponies) => {
//     const { data, error } = await supabase
//         .from('bs_ponies')
//         .insert(pony)
//         .select()
// }