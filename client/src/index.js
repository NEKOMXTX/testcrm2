import React, {createContext} from "react";
import { createRoot } from "react-dom/client";
import UserStore from "./store/UserStore";

import App from "./App";
import ClientStore from "./store/ClientStore";

export const Context = createContext(null)

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  
    <Context.Provider value={{
        user: new UserStore(),
        client: new ClientStore(),
    }}>
        <App />
    </Context.Provider>
 
); 