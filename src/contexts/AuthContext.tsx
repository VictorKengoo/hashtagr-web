import { createContext, ReactNode, useEffect, useState } from "react"
import { auth, firebase } from "../services/firebase"

type AuthContextType = {
  user: UserType | undefined
  signInWithTwitter: () => Promise<void>
}

type UserType = {
  id: string
  name: string
  avatar: string
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userResponse => {
      if (userResponse) {
        const { displayName, photoURL, uid } = userResponse

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Twitter Account')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe()
    }

  }, [])

  async function signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider()

    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Twitter Account')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithTwitter }} >
      {props.children}
    </AuthContext.Provider>
  )
}