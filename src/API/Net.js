import axios from 'axios';
import CONFIG from './../config'

class Net {
    constructor() {
    }

    postData(pService, pData) {

        var lHeader = {
            Authorization: "Basic "+CONFIG.api_auth_key
        }

        return axios.post('http://' + CONFIG.api_host + '/internal/API/'+pService, pData, {
            headers : lHeader
        })
    }
}

export default Net;