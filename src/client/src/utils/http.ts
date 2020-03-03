import axios from 'axios'

import config from 'config/server'
import store from 'store'
import {ObjectType} from 'types/object'

const http = axios.create({
  baseURL: `${config.APP_API_HOST}:${config.APP_API_PORT}`
})

export const post = http.post

export function removeAuth(url: string): Promise<any> {
  return http.delete(url, authHeaders())
}

export function getAuth(url: string): Promise<any> {
  return http.get(url, authHeaders())
}

export function postAuth(url: string, payload?: ObjectType): Promise<any> {
  return http.post(url, payload, authHeaders())
}

function authHeaders() {
  const {token} = store.getState().user

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}
