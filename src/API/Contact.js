import CONFIG from './../config'
import Net from './Net'


class Contact {
    
    constructor(){
    }

    getContactByName(pName, pFrom){
        
        var lNet = new Net();
        var lData = { 'nom' : pName, 'from' : pFrom };

        const lPromise = new Promise((pResolve, pReject) => {
            lNet.postData('getByName', lData).then(pResponse => {
                    pResolve(pResponse.data);
            }).catch(pError => {
                pResolve({success : false});
            });
        })
        
        return lPromise;
    }

    getContactByNumber(pNumber, pFrom){
        
        var lNet = new Net();
        var lData = { 'numero' : pNumber, 'from' : pFrom };

        const lPromise = new Promise((pResolve, pReject) => {
            lNet.postData('getByNumber', lData).then(pResponse => {
                    pResolve(pResponse.data);
            }).catch(pError => {
                pResolve({success : false});
            });
        })
        
        return lPromise;
    }

    getContactByNameAndSubname(pName, pSubname, pFrom){
        
        var lNet = new Net();
        var lData = { 'nom' : pName, 'prenom' : pSubname, 'from' : pFrom };

        const lPromise = new Promise((pResolve, pReject) => {
            lNet.postData('getByNameAndSubName', lData).then(pResponse => {
                    pResolve(pResponse.data);
            }).catch(pError => {
                pResolve({success : false});
            });
        })
        
        return lPromise;
    }

    getWhatsAppStatus(pNumber, pFrom){
        
        var lNet = new Net();
        var lData = {numero : pNumber, from : pFrom};

        const lPromise = new Promise((pResolve, pReject) => {
            lNet.postData('getWhatsAppStatus', lData).then(pResponse => {
                pResolve(pResponse.data);
            }).catch(pError => {
                pResolve({success : false});
            });
        });

        return lPromise;
    }
}

export default Contact;