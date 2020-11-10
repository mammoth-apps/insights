import { useAuth0 } from '@auth0/auth0-react'
import React, { useCallback } from 'react'
import { Route, RouteProps } from 'react-router-dom'
import { setAuthToken } from '../../utils'
import { useRouter } from '../../router/useRouter'

export const AuthenticatedRoute = (props: RouteProps) => {
  const {
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0()
  const router = useRouter()
  const authCallback = useCallback(async () => {
    const token = await getAccessTokenSilently()
    setAuthToken(token)
    if (!token) {
      loginWithRedirect({}).then(() => {
        router.push(router.pathname)
      })
    }
  }, [getAccessTokenSilently, loginWithRedirect, router])

  if (!isAuthenticated) {
    authCallback()
  }
  return isLoading ? <div>Loading...</div> : <Route {...props} />
}
