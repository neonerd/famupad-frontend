export const state = () => {
  return {
    settings: {}
  }
}

export const getters = {
}

export const mutations = {
  set (state, {name, value}) {
    const newValues = {}
    newValues[name] = value
    state.settings = Object.assign({}, state.settings, newValues)
    return state
  }
}

export const actions = {
}
