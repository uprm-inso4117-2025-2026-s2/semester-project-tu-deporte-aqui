export type AuthUser = {
  username: string
  password: string
}

const USERS_KEY = "users"
const LOGGED_IN_USER_KEY = "loggedInUser"

function getUsers(): AuthUser[] {
  if (typeof window === "undefined") return []

  const storedUsers = localStorage.getItem(USERS_KEY)
  return storedUsers ? JSON.parse(storedUsers) : []
}

function saveUsers(users: AuthUser[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export async function signupUser(username: string, password: string) {
  if (!username.trim() || !password.trim()) {
    return { error: "Please fill all fields!" }
  }

  const users = getUsers()

  const existingUser = users.find(
    (user) => user.username.toLowerCase() === username.toLowerCase()
  )

  if (existingUser) {
    return { error: "This username already exists!" }
  }

  const newUser: AuthUser = { username, password }
  users.push(newUser)
  saveUsers(users)

  localStorage.setItem(LOGGED_IN_USER_KEY, username)

  return { success: true }
}

export async function loginUser(username: string, password: string) {
  if (!username.trim() || !password.trim()) {
    return { error: "Please fill all fields!" }
  }

  const users = getUsers()

  const foundUser = users.find(
    (user) =>
      user.username.toLowerCase() === username.toLowerCase() &&
      user.password === password
  )

  if (!foundUser) {
    return { error: "Invalid username or password!" }
  }

  localStorage.setItem(LOGGED_IN_USER_KEY, foundUser.username)

  return { success: true }
}

export async function logoutUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOGGED_IN_USER_KEY)
  }

  return { success: true }
}

export function isUserLoggedIn() {
  if (typeof window === "undefined") return false
  return !!localStorage.getItem(LOGGED_IN_USER_KEY)
}

export function getLoggedInUser() {
  if (typeof window === "undefined") return null
  return localStorage.getItem(LOGGED_IN_USER_KEY)
}