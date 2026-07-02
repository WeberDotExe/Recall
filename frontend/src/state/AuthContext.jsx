import { createContext,useState } from "react"

const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function setAuth({ user, accessToken }) {
  setUser(user);
  setAccessToken(accessToken);
  setIsAuthenticated(true);
}

function clearAuth() {
  setUser(null);
  setAccessToken(null);
  setIsAuthenticated(false);
}

    const value = {user,accessToken,isAuthenticated,setAuth,clearAuth};
    
  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export {AuthContext,AuthProvider}