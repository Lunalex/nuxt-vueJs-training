export const state = () => ({
    isConnected: false,
    user_connected: {
        id: '',
        name: '',
        email: '',
        isClient: ''
    }
})

export const getters = {
    connectedUserId(state) {
        return state.user.id
    }

}

export const mutations = {
    connectUser (state, user) {
        state.user_connected = user
        state.isConnected = true
    },
    disconnectUser (state) {
        state.isConnected = false
        state.user_connected = {
            id: '',
            name: '',
            email: '',
            isClient: ''
        }
    }
}

export const actions = {
    connectUser (context, user) {
        context.commit('connectUser', user)
    }
}
