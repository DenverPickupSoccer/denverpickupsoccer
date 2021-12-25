import React, { useEffect, useContext, useState } from 'react';
import { getCurrentUser, signOutUser } from 'services/firebase';
import useIsMountedRef from 'helpers/useIsMountedRef';

const UserContext = React.createContext({
  user: null,
  loading: true,
  signOut: () => {},
})

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const isMountedRef = useIsMountedRef()

  useEffect(() => {
   getCurrentUser(user => {
     if (!isMountedRef.current) return;
     setUser(user)
     setLoading(false)
   })
  }, [isMountedRef])

  const providerValue = {
    user,
    loading,
    signOut: signOutUser,
  }

  return (
      <UserContext.Provider value={providerValue}>
        {children}
      </UserContext.Provider>
  )
}

const useUserProvider = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserProvider can only be used inside UserProvider')
  }
  return context;
}

export {
  UserProvider,
  UserContext,
  useUserProvider,
}
