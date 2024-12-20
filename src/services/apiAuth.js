import { data } from "autoprefixer";
import supabase from "./supabase"

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