import {createContext} from "react";


export const AuthContext = createContext<"unauthorized" | "authorized">('unauthorized')