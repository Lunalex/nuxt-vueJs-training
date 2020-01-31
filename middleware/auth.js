//  unused file
// tried to separate isUserConnectedCookie() from the redirections specific to each page 'login' & 'account'

// 1. first tried to put 'isUserConnectedCookie()' in a separate js file in a 'utils' folder 
// and then imported it but didn't work (returned me the full code, note the boolean expected)

// 2. tried this unique file, calling 'auth.userDisconnectedRedirectLogin()' in the page corresponding 
// but that did not work neither

// I used this https://github.com/nuxt/example-auth0 as model but never reached what they did


import Cookies from 'js-cookie'

export default {

    isUserConnectedCookie() {
        let isUserConnected = false
        const cookieString = Cookies.get('vuexStore')
        if (cookieString) {
            const cookieStoreObject = JSON.parse(cookieString)
            isUserConnected = cookieStoreObject.isConnected
        }
        return isUserConnected
    },

    userDisconnectedRedirectLogin({ redirect }) {
        if(!this.isUserConnectedCookie()) {
            redirect('login')
        }
    },

    userConnectedRedirectIndex({ redirect }) {
        if(this.isUserConnectedCookie()) {
            redirect('index')
        }
    }
}