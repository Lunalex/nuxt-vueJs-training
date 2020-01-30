import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

export default ({store}) => {
    window.onNuxtReady(() => {
      createPersistedState({
          key: 'vuexStore',
          storage: {
            getItem: key => Cookies.get(key),
            setItem: (key, value) =>
              Cookies.set(key, value, { expires: 3, secure: false }), // set secure to true in prod?
            removeItem: key => Cookies.remove(key)
          }
      })(store)
    })
  }