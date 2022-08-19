export const LOGIN_SUCCESS="LOGIN_SUCCESS";
export const LOGIN_UNSUCCESS="LOGIN_UNSUCCESS";


export const loginSuccess=(payload)=>
{
    return {
        type:LOGIN_SUCCESS,
        payload
    }
}
export const loginUnsuccess=()=>
{
    return {
        type:LOGIN_UNSUCCESS,
        
    }
}