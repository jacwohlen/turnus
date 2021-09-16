// This code is only convenience to set the user on the server side through a
// cookie (see https://www.youtube.com/watch?v=_-_bz5lH_fI)
import JWTDecode from 'jwt-decode'
import cookieparser from 'cookieparser'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (process.server && process.static) return
    if (!req.headers.cookie) return

    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsed['access-token']

    if (!accessTokenCookie) return

    const authUser = JWTDecode(accessTokenCookie)

    if (authUser) {
      commit('users/setUser', { authUser })
    }
  },
}