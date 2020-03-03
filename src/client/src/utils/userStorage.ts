import * as localStorage from './localStorage'
import {UserType} from 'types/user'

const USER_STORAGE_KEY = 'user'

export function save(userData: UserType) {
  localStorage.setItem(USER_STORAGE_KEY, userData)
}

export function get(): UserType | undefined {
  return localStorage.getItem(USER_STORAGE_KEY)
}

export function clear() {
  localStorage.removeItem(USER_STORAGE_KEY)
}
