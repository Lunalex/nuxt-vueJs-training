
const persistStatePlugin = store => {
    window.sessionStorage.setItem("persistedState", store.state)
}

export const plugins = [persistStatePlugin]


export const state = () => ({
    isConnected: false,
    user_connected: {
        id: '',
        isClient: ''
    }
})

export const getters = {
    connectedUserId(state) {
        return state.user_connected.id
    },
    connectedUserName(state) {
        return state.user_connected.name
    },
    isConnectedUserClient(state) {
        return state.user_connected.isClient
    }

}

export const mutations = {
    connectUser(state, user) {
        state.user_connected = user
        state.isConnected = true
    },
    disconnectUser(state) {
        state.isConnected = false
        state.user_connected = {
            id: '',
            name: '',
            email: '',
            isClient: ''
        }
        window.sessionStorage.clear()
    }
}

export const actions = {
    connectUser(context, user) {
        context.commit('connectUser', user)
    },
    disconnectUser({ commit }) {
        // actions must always have 'context' but if one want to use only one 
        // or few methods of context he can by replacing 'context' by '{ contextMethod1, contextMethod2, ... }'
        // here we only need the method 'commit' so we specify only '{ commit }'
        commit('disconnectUser')
    }
}
