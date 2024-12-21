import { data } from "autoprefixer";
import supabase, { supabaseUrl } from "./supabase"

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: ''
      }
    }
  })

  if (error) {
    console.error(error.message);
    throw new Error(error.message)
  }

  return data
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    console.error(error.message);
    throw new Error(error.message)
  }

  return data
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession()
  if (!session.session) return null

  const { data: { user } } = await supabase.auth.getUser()

  return user
}

export async function logout() {
  const { data, error } = await supabase.auth.signOut()

  if (error) {
    console.error(error.message);
    throw new Error(error.message)
  }

  return data
}

export async function updateUser({ fullName, password, avatar }) {
  let updateData
  if (password) updateData = { password }
  if (fullName) updateData = { data: { fullName } }

  const { data, error } = await supabase.auth.updateUser(updateData)

  if (error) {
    console.error(error.message);
    throw new Error(error.message)
  }

  const fileName = `avatar-${data.user.id}-${Math.random().toFixed(5) * 100000}`

  if (avatar) {
    const { error: storageError } = await supabase
      .storage
      .from('avatars')
      .upload(fileName, avatar)

    if (storageError) {
      console.error(storageError.message);
      throw new Error(storageError.message)
    }

    const { data: updatedUser, error: error2 } = await supabase
      .auth.updateUser({
        data: {
          avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`
        }
      })

    if (error2) {
      console.error(error2.message);
      throw new Error(error2.message)
    }

    return updatedUser
  }
}