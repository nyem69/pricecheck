import { supabase } from "$lib/supabaseClient";

export async function load() {

  const { data, error } = await supabase.from("lookup_item").select();
  if (error) throw new Error(error.message)

  return {
    lookup_item: data ?? [],
  };


}
