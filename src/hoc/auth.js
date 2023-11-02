import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

// null - 누구나 출입 가능, true - 로그인 유저만 출입 가능, false - 로그인 유저는 출입 불가 
export default function(SpecificComponent, option, adminRoute = null){
    function AuthenticationCheck(props){
        const navigate = useNavigate();
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                console.log(response)

                if(!response.payload.isAuth){
                    // 로그인 하지 않은 경우
                    if(option){
                        navigate('/login')
                    }
                } else {
                    // 로그인 한 경우
                    if(adminRoute && !response.payload.isAdmin){
                        navigate('/')
                    } else {
                        if(option === false){
                            navigate('/')
                        }
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        );
    }

    return <AuthenticationCheck />;
}