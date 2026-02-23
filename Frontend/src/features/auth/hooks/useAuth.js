import {useContext} from 'react';
import { AuthContext } from '../auth.context';
import {login , register , getme} from "../services/auth.api";

export const useAuth = () =>{
    const context = useContext(AuthContext)

    const {user , loading , setUser , setLoading} = context

    const handleLogin = async (username , password) =>{
        setLoading(true)

        const response = await login(username , password)

        setUser(response.user_info)

        setLoading(false)

    }

    const handleRegister = async (username , email , password) =>{
        setLoading(true)
        const response = await register(username , email , password);
        setUser(response.user_info)
        setLoading(false)
    }

    return{
        user , loading, handleLogin , handleRegister
    }
}