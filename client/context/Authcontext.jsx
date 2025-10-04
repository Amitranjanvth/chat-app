import { useContext, useEffect, useState , createContext} from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {io} from 'socket.io-client'

const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
     

    const [token, setToken] = useState(localStorage.getItem('token'))
    const [authUser, setAuthUser] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [socket, setSocket] = useState(null)

    const checkAuth = async () => {
        try {
            const {data} = await axios.get('/api/auth/check')
            if(data.success){
                setAuthUser(data.user)
                connectSocket(data.user)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  
    const login = async (state,Credential) => {
        try {
        
            const { data } = await axios.post(`/api/auth/${state}`, Credential);
            if (data.success) {
                
                setAuthUser(data.userData);
                connectSocket(data.userData);
                axios.defaults.headers.common['token'] = data.token
                setToken(data.token);
                localStorage.setItem('token', data.token);
    
                toast.success(data.message || "Login successful");
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
             toast.error(error.message || "Login failed");
        } 

    }

    const logout = async () => {
        try {
            localStorage.removeItem('token');
            setAuthUser(null);
            setToken(null);
            setOnlineUsers([]);
            axios.defaults.headers.common['token'] = null
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.message || "Logout failed");
        }
    };

    const updateProfile = async (profileData) => {
        try {
            const { data } = await axios.put('/api/auth/update', profileData);
            if (data.success) {
                setAuthUser(data.user);
                toast.success(data.message || "Profile updated");
            } else {
                toast.error(data.message || "Update failed");
            }
        } catch (error) {
            toast.error(error.message || "Update failed");
        }
    };


    const connectSocket = (userData) => {
        if (!userData || socket?.connected) return;
        const newSocket = io(backendUrl, {
            query: { userId: userData._id }
            });
        newSocket.connect();
        setSocket(newSocket);
        newSocket.on('getonlineUsers', (userIds) => {
            setOnlineUsers(userIds);
        });
    }
   

useEffect(() => {
    if (token) {
        axios.defaults.headers.common["token"] = token;
        checkAuth();
    }
    // eslint-disable-next-line
}, [token]);
    

    const value = {
        axios,
        token,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider> 
    )
}