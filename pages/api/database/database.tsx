import { supabase } from '../../../utils/supabase';

/**************************************************
 *                  FETCH
 *************************************************/

export const getAllPonies = async () => {
    const { data: ponies } = await supabase
        .from('ponies')
        .select('*, races(*), abilities(*), treats(*)')
    return ponies;
}

export const getPonyByID = async (id: number) => {
    const { data: ponies } = await supabase
        .from('ponies')
        .select('*, races(*), abilities(*), treats(*)')
        .eq('pony_id', id)
    return ponies;
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
