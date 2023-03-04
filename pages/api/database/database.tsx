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

export const insertPony = async (pony: object) => {
    const { data, error } = await supabase
        .from('ponies')
        .insert(pony)
        .select()
}

export const insertTreats = async (treats: object) => {
    const { data, error } = await supabase
        .from('treats')
        .insert(treats)
        .select()
}
