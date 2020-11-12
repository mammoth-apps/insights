import { useMemo } from 'react'
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom'
import { replaceKeyPlaceholders } from '../utils'
import type { InsightRoute } from './routes'

/**
 * useRouter is a wrapper around methods that are exposed by `react-router-dom` to allow for a one stop shop of data grabbing
 */
export const useRouter = <TState extends any>() => {
  const params = useParams()
  const location = useLocation<TState>()
  const history = useHistory<any>()
  const match = useRouteMatch()

  return useMemo(() => {
    return {
      push: history.push,
      navigateTo: (url: InsightRoute, keys: Record<string, string>) => {
        history.push(replaceKeyPlaceholders(url, keys))
      },
      replace: history.replace,
      pathname: location.pathname,
      params,
      match,
      location,
      history,
      listen: history.listen,
      state: location.state,
    }
  }, [history, location, params, match])
}
