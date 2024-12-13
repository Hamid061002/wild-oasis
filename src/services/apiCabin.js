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

function getNamePathImage(image) {
  const hasImagePath = Boolean(image?.startsWith?.(supabaseUrl))
  console.log('hasImagePath: '+hasImagePath);
  const imageName = !hasImagePath && `${image.name}`.replaceAll('/', '')
  console.log('imageName: '+imageName);
  const imagePath = hasImagePath ? image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
  console.log('imagePath: '+imagePath);
  

  return { imageName, imagePath }
}

export async function createCabin(newCabin) {
  const imageName = `${newCabin.image.name}`.replaceAll('/', '')
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // A) CREATE
  const { data, error: createCabinError } = await supabase
    .from('cabins')
    .insert([{
      ...newCabin, image: imagePath
    }]).select().single()

  if (createCabinError) {
    console.log(createCabinError.message);
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

export async function editCabin(newCabin, id) {
  const { imageName, imagePath } = getNamePathImage(newCabin.image)

  const { data, error: editCabinError } = await supabase
    .from('cabins')
    .update({
      ...newCabin, image: imagePath
    }).eq('id', id).select().single()
    

  if (editCabinError) {
    console.log(editCabinError.message);
    throw new Error('cabin could not can be edited')
  }

  if (imageName) {
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