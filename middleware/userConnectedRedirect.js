import Cookies from 'js-cookie'

export default function ({ redirect }) {
  let isUserConnected = false
  const cookieString = Cookies.get('vuexStore')
  if (cookieString) {
    const cookieStoreObject = JSON.parse(cookieString)
    isUserConnected = cookieStoreObject.isConnected
  }
  if (isUserConnected) {
    redirect('/')
  }
}