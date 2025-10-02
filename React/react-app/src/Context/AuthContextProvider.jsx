import React , { useReducer , useEffect , useState} from "react";

import { AuthContext } from "./AuthContext";
const authReducer = (state , action) => {
    switch(action.type) {
        case "LOGIN" :
            return {user : action.payload};
            case "LOGOUT" :
                localStorage.removeItem("token")
                return {user : null};
                default :
                return state;
    }
}
const AuthContextProvider = ({children}) => {

    const [state , dispatch] = useReducer(authReducer,{user : null});

    const[loading , setLoading] = useState(true);

    useEffect(() => {
        let user = localStorage.getItem("token");
        if(user != null) {
            dispatch({type : "LOGIN" , payload : user})
        }

        setLoading(false);
    },[])

    if(loading) {
        return <p>Loading ...</p>;
    }
    return (
       <AuthContext.Provider value = {{...state,dispatch}}>
{children}

       </AuthContext.Provider>
    )
}

export default AuthContextProvider;