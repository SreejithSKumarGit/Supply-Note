import { LOGIN_SUCCESS, LOGIN_UNSUCCESS } from "./AuthActions";



const AuthReducer=(store={auth:{status:false}},{type,payload})=>
{
    switch(type)
    {
        case LOGIN_SUCCESS:
            return  {
                ...store,auth:{status:true,...payload}
            }
        case LOGIN_UNSUCCESS:
            return{
                ...store,auth:{status:false}
            }
        default :
        return store;
    }
}
export default AuthReducer;