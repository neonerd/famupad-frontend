import store from 'store'

import {login, injectAuthorization} from '@/api'

export const state = () => {
  return {
    isLoggedIn: false,
    isLoggingIn: false,
    token: null,
    tokenExpiresAt: null,
    user: null
  }
}

export const getters = {
  isAdmin: state => {
    return state.user && state.user.role === 'admin'
  }
}

export const mutations = {
  finishLogin (state, data) {
    state.isLoggingIn = false
    state.isLoggedIn = true
    state.token = data.token
    state.tokenExpiresAt = data.expires_at
    state.user = Object.assign({}, data.user)
    return state
  },
  hydrate (state, savedState) {
    state.isLoggedIn = savedState.isLoggedIn
    state.token = savedState.token
    state.tokenExpiresAt = savedState.tokenExpiresAt
    state.user = savedState.user
    return state
  },
  reset (state) {
    state.isLoggedIn = false
    state.isLoggingIn = false
    state.token = null
    state.tokenExpiresAt = null
    state.user = null
  }
}

export const actions = {
  // Logs user in using the provided email and password and stores the session in localStorage
  login ({commit, dispatch}, {email, password}) {
    return login(email, password)
      .then(data => {
        commit('finishLogin', data)
        dispatch('persist')
      })
      .catch(error => {
        throw new Error(error)
      })
  },
  // Logs user out, destroying the localStorage session
  logout ({commit}) {
    store.clearAll()
    commit('reset')
  },
  // Hydrates the session from localStorage
  hydrate ({commit}) {
    const savedState = store.get('fp_session')
    if (savedState) {
      injectAuthorization(savedState.token)
      commit('hydrate', savedState)
    }
  },
  // Persist into session
  persist ({state}) {
    store.set('fp_session', state)
  }
}
