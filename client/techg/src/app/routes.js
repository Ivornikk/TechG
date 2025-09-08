// Routes that can be visited only by authenticated users
export const AuthRoutes = [
    '/account/address-book',
    '/account/my-orders',
    '/account/settings',
    '/cart',
    '/checkout',
    '/payment',
    '/wishlist',
]
// Routes that can be only visited by administrators
export const AdminRoutes = [
    '/admin/dashboard',
    '/admin/products',
    '/admin/orders',
    '/admin/clients',
]
// Routes that can be visited by any user
export const PublicRoutes = [
    '/',
    '/log-in',
    '/sign-up',
    '/product',
    '/search',
]