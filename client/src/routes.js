import AdminPage from "./pages/AdminPage";
import {ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "./utils/consts";
import CartPage from "./pages/CartPage";
import ShopPage from "./pages/ShopPage";
import AuthPage from "./pages/AuthPage";
import ProductPage from "./pages/ProductPage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: AdminPage
    },
    {
        path: CART_ROUTE,
        Component: CartPage
    }
]

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: ShopPage
    },
    {
        path: LOGIN_ROUTE,
        Component: AuthPage
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        Component: ProductPage
    },
    {
        path: REGISTRATION_ROUTE,
        Component: AuthPage
    }
]