import { supabase } from "./supabaseClient"

export async function loginUser(email: string, password: string) {
  if (!email.trim() || !password.trim()) {
    return { error: "Please fill all fields!" }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: "Wrong Password!" }
  }

  return { success: true }
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    return { error: "Unable to log out right now." }
  }

  return { success: true }
}
