import * as http from 'utils/http'
import sessionUrl from './utils/sessionUrl'
import {UserAuthPayloadType} from 'types/user'
import {UserType} from 'types/user'

const baseUrl = sessionUrl()

export function login(payload: UserAuthPayloadType): Promise<UserType> {
  return http.post(baseUrl, payload).then(({data}) => data)
}

export function logout(): Promise<undefined> {
  return http.removeAuth(baseUrl)
}

export function fetchSession(): Promise<UserType> {
  return http.getAuth(baseUrl).then(({data}) => data)
}
