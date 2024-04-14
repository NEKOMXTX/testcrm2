
import Auth from "./pages/Auth";
import Crm from "./pages/Crm";
import Home from "./pages/Home";

import { CRM_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: CRM_ROUTE,
        Component: Crm
    },
]

export const publicRoutes = [ 
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]