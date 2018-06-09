import store from './appStore';
import axios from 'axios';
import config from './appConfig';
import errorWrapper from './appErrorWrapper';

const url = config.serverProtocol + config.serverUrl + ':' + config.serverPort;

export default {
    getLoggedIn: () => {
        let masterKey = store.getMasterKey();
        if (masterKey) return true;
        else false;
    },
    signUp: (nickname) => {
        return store.generateKeys().then(() => {
            let pubKeys = store.getPublicKeys();
            console.log(pubKeys)
            return axios.get(url + config.serverRegistrationPath + nickname + '/' + pubKeys.active + '/' + pubKeys.owner);
        }).then(response => {
            if (response.data.ok) {
                store.saveKeys();
                return {success: true}
            } else {
                return {success: false, err: 'soon'}
            }
        }).catch(err => {
            errorWrapper.wrap(err);
        })
    }
}