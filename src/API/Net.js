import axios from 'axios';
import CONFIG from './../config'
import Session from './Session'

class Net {
    
    postData(pService, pData) {

        var lCurrentSession = new Session();

        /*var lHeader = {
            Authorization: "Basic "+CONFIG.api_auth_key
        }*/

        var lHeader = {};
        var lSessionID = lCurrentSession.getSession();

        if(lSessionID)
            lHeader['Authorization'] = "Basic "+ lCurrentSession.getSession();
        
        var lHost = 'http://' + CONFIG.api_host + '/internal/API/';

        if(CONFIG.api_is_dev)
            lHost = 'http://' + CONFIG.api_host + ':'+ CONFIG.api_dev_port + '/API/';

        return axios.post(lHost+pService, pData, {
            headers : lHeader,
            validateStatus: false
        })
    }
}

export default Net;