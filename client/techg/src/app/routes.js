// Routes that can be visited only by authenticated users
export const AuthRoutes = [
    '/admin/dashboard',
    '/admin/products',
    '/admin/orders',
    '/admin/clients',
    '/account/address-book',
    '/account/my-orders',
    '/account/settings',
    '/cart',
    '/checkout',
    '/payment',
    '/wishlist',
    '/buy-now'
]
// Routes that can be visited by any user
export const PublicRoutes = [
    '/',
    '/log-in',
    '/sign-up',
    '/product',
    '/search',
    '/page-not-found'
]