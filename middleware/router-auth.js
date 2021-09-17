export default function({ store, redirect, route }) {
  const authenticatedUser = store.getters['users/isAuthenticated']
  if (!authenticatedUser && requireAuthentication(route)) {
    redirect('/login')
  } else if (authenticatedUser && route.path === '/login') {
    redirect('/dashboard')
  } else {
  }
}

function requireAuthentication(route) {
  return route.path.startsWith('/dashboard')
}
