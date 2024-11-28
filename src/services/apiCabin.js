import supabase from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase
    .from('cabins')
    .select('*')

  if (error) {
    console.log(error);
    throw new Error('cabins could not can be loaded')
  }

  return cabins
}

export async function deleteCabin(id) {

  const { error, data } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)

    if (error) {
      console.log(error);
      throw new Error('cabins could not can be deleted')
    }
    
    return data
}