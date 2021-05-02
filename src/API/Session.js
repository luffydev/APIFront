import Net from './Net'
import Cookies from 'js-cookie'

//var encrypter = require('bcryptjs');

var CryptoJS = require("crypto-js");
var currentPayload = null;

class Session {

    mCookie = null;
    mSalt = null;

    checkSession(){
        var lNet = new Net();

        var lSessionCookie = Cookies.get('credentials');

        const lPromise = new Promise((pResolve, pReject) => {
            lNet.postData('checkSession', { session : lSessionCookie }).then( (pResponse) => {

                var lPayload = pResponse.data.payload;
                var lDecoded = Buffer.alloc(29, lPayload, 'hex').toString();

                if('payload' in pResponse.data)
                    pResponse.data['payload'] = lDecoded;

                pResolve(pResponse.data);
            } );
        });

        return lPromise;
    }

    saveSession(pCredentials){
        Cookies.set('credentials', pCredentials, {expires: 2, path: ''});
    }

    getSession(){
        return Cookies.get('credentials');
    }

    removeSession(){
        Cookies.set('credentials', "", {expires: 0, path: ''});
    }

    checkCredential(pUsername, pPassword, pPayload){
        var lNet = new Net();

        currentPayload = pPayload;

        var lPromise = new Promise((pResolve, pReject) => 
        {
                var lPassword = CryptoJS.AES.encrypt(JSON.stringify({"password" : pPassword}), pPayload).toString();

                lPassword = Buffer.alloc(lPassword.length, lPassword).toString('hex');
                currentPayload = Buffer.alloc(currentPayload.length, currentPayload).toString('hex');

                var lData = {'username' : pUsername, 'password' : lPassword, 'payload' : currentPayload};
               
                lNet.postData('sendCredential', lData).then( pResponse => {

                    if('data' in pResponse)
                        pResolve(pResponse.data)
                    else
                        pResolve(false);
                });
        });
        
        return lPromise;
    }

    heartBeatSession()
    {
        var lNet = new Net();
        var lPromise = new Promise((pResolve, pReject) => {
            lNet.postData('heartbeatSession').then( pResponse => {
                
                if(!('status' in pResponse) || pResponse.status !== 200)
                    pResolve(false)
                else
                    pResolve(true);

            });
        });

        return lPromise;
    }

}

export default Session;