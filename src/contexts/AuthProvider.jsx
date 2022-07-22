import React, { useState, useContext } from "react";

const AuthContext = React.createContext({
    authorized: false,
    sid: "",
    name: "",
    token: "",
});

export function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider(props) {
    const { children } = props;
    const localAuthStr = localStorage.getItem("auth");
    let localAuth = {
        authorized: false,
        sid: 0,
        account: "",
        token: "",
    };
    if (localAuthStr) {
        try {
            localAuth = JSON.parse(localAuthStr);
            if (localAuth.account && localAuth.token) {
                localAuth = { ...localAuth, authorized: true };
            }
        } catch (ex) {
            console.log(ex);
        }
    }
    const [auth, setAuth] = useState(localAuth);
    return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
