import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

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
    const unAuthState = {
        authorized: false,
        sid: 0,
        account: "",
        token: "",
    };
    let localAuth = { ...unAuthState };
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
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("auth");
        setAuth({ ...unAuthState });
        navigate("/", { replace: false });
    };
    return <AuthContext.Provider value={{ ...auth, setAuth, logout }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
