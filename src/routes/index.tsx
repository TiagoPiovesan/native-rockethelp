import {NavigationContainer} from '@react-navigation/native'
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'

import { Loading } from '../components/Loading'

import { AppRoutes } from './app.routes'
import { SignIn } from '../screens/SignIn'
import { useEffect, useState } from 'react'

export function Routes(){
  const [loading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  // uef
  useEffect(() => {
    const subscriber = auth()
      .onAuthStateChanged(response => {
        setUser(response)
        setIsLoading(false);
    })

    return subscriber;
  }, []);

  if (loading) {
    return <Loading / >
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  )
}
