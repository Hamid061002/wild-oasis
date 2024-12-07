import supabase, { supabaseUrl } from "./supabase";

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

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagePath = newCabin.image[0]?.startsWith?.(supabaseUrl)
  const imageName = `${newCabin.image.name}`.replaceAll('/', '')
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // create/edit cabin
  let query = supabase.from('cabins')

  // A) CREATE
  if (!id)
    query.insert([{
      ...newCabin, image: imagePath
    }])

  // B) EDIT
  if (id)
    query.update({
      ...newCabin, image: imagePath
    }).eq('id', id)

  const { data, error } = await query.select().single()

  if (error) {
    console.log(error);
    throw new Error('cabin could not can be created')
  }

  //upload image
  const { error: storegeError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image)

  //delete the cabin if there was an error uploading image
  if (storegeError) {
    await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id)
    throw new Error('cabin image could not can be uploaded and the cabin was not created')
  }
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