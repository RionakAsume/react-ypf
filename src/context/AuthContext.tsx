import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { registerRequest, loginRequest, registerClienteRequest, verifyTokenRequest, logout } from "../api/auth";
import Cookies from 'js-cookie'

interface AuthContextType {
  user: any | null; 
  isAutheticaded: boolean;
  authErrors: string[];
  loading: boolean;
  signup: (user: any) => Promise<any | void>;
  signin: (user: any) => Promise<any | void>;
  signupCliente: (user: any) => Promise<void>;
  logoutUser: () => Promise<void>;
}


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deberia estar dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(null);
  const [isAutheticaded, setIsAutheticaded] = useState(false);
  const [authErrors, setAuthErros] = useState<string[]>([]);
  const [loading, setLoading] = useState(true)



  const signup = async (user: any) => {
    try {
      const res = await registerRequest(user);
      console.log(res)
      setIsAutheticaded(true);
      return res.data; // Devuelve el usuario creado
    } catch (error:any) {
      if (Array.isArray(error.response.data)) {
        setAuthErros(error.response.data);
      } else {
        setAuthErros([error.response.data.message]);
      }
    }
  };

  const signin = async (user:any) => {
    try {
      const res = await loginRequest(user);

      const createdUser = res.data; 
      setUser(createdUser); 
      setIsAutheticaded(true);
      return createdUser; 

    } catch (error:any) {
      if (Array.isArray(error.response.data)) {
        return setAuthErros(error.response.data);
      }
      setAuthErros([error.response.data.message]);
    }
  };

  const signupCliente = async (user:any) => {
    try {
      const res = await registerClienteRequest(user);
      console.log(res);

    } catch (error:any) {
      if (Array.isArray(error.response.data)) {
        return setAuthErros(error.response.data);
      }
      setAuthErros([error.response.data.message]);
    }
  };

  const logoutUser = async () => {
    try {
      const res = await logout();
      console.log(res);
      setUser(null);
      setIsAutheticaded(false);

    } catch (error:any) {
      if (Array.isArray(error.response.data)) {
        return setAuthErros(error.response.data);
      }
      setAuthErros([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (authErrors.length > 0) {
      const timer = setTimeout(() => {
        setAuthErros([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [authErrors]);


  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
  
      if (!cookies.token) {
        setIsAutheticaded(false);
        setLoading(false);
        return setUser(null);
      }
  
      try {
        const res = await verifyTokenRequest();
        if (res.data) {
          setUser(res.data);
          setIsAutheticaded(true);
        } else {
          setUser(null);
          setIsAutheticaded(false);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
        setIsAutheticaded(false);
      } finally {
        setLoading(false); 
      }
    }
  
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        signupCliente,
        user,
        isAutheticaded,
        authErrors,
        loading,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
