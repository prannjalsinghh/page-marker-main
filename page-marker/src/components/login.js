import { GoogleLogin } from 'react-google-login';
import React, { useEffect } from 'react';
import {gapi} from 'gapi-script';

const Component = ()=>{
    const clientId = '671677168964-439uncje4pa71crq8o6f79gogo6jd7te.apps.googleusercontent.com';

    useEffect(()=>{
        function start() {
            gapi.client.init({
                clientId:clientId,
                scope:""
            })
        }
        gapi.load('client:auth2', start);
    },[])

    const onSuccess = (res)=>{
        console.log('[Login Success] currentUser:', res.profileObj);
    }

    const onFailure = (res)=>{
        console.log('[Login Failed] res:', res);
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />

        </div>
    )
}

export default Component;