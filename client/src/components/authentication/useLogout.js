import Axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/login-slice";

export const useLogout = () => {

    const dispatch = useDispatch();

    const handleLogout = async () => {
        await Axios.get("http://localhost:4000/auth/logout")
            .then(res => { 
                console.log(res); 
                dispatch(loginActions.removeAdminStatus()); 
                dispatch(loginActions.removeLoginStatus()); 
                dispatch(loginActions.clearInfo());
            })
            .catch(err => console.log(err));
    }

    //useEffect(() => {
    //    dispatch(loginActions.clearInfo());
    //}, [handleLogout])

    return { handleLogout }
}