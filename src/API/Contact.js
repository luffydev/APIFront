import Net from './Net'


class Contact {

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

    getContactByID(pID, pFrom){
        
        var lNet = new Net();
        var lData = { 'id' : pID, 'from' : pFrom };

        const lPromise = new Promise((pResolve, pReject) => {
            lNet.postData('getByID', lData).then(pResponse => {
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

    getWhatsAppStatus(pNumber){
        
        var lNet = new Net();
        var lData = {numero : pNumber};

        const lPromise = new Promise((pResolve, pReject) => {
            lNet.postData('getWhatsAppStatus', lData).then(pResponse => {
                pResolve(pResponse.data);
            }).catch(pError => {
                pResolve({success : false});
            });
        });

        return lPromise;
    }

    toggleToFavorite(pID, pFrom, pValue){
        var lNet = new Net();
        var lData = {'id' : pID, 'from' : pFrom, 'value' : pValue};

        const lPromise = new Promise((pResolve, pReject) => {
            lNet.postData('setFavorite', lData).then(pResponse => {
                pResolve(pResponse.data);
            }).catch(pError => {
                pResolve({success : false});
            });
        });

        return lPromise;
    }

    loadFavorite(pFrom) {
        var lNet = new Net();
        var lData = {'from' : pFrom};

        const lPromise = new Promise((pResolve, pReject) => {
            lNet.postData('loadFavorite', lData).then((pResponse) => {
                pResolve(pResponse.data);
            });
        });

        return lPromise;
    }
}

export default Contact;