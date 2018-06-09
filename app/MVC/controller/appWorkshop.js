import store from './appStore';
import axios from 'axios';
import config from './appConfig';
import errorWrapper from './appErrorWrapper';
import eosController from './appEosController';

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
            return axios.get(url + config.serverRegistrationPath + nickname + '/' + pubKeys.active + '/' + pubKeys.owner);
        }).then(response => {
            if (response.data.ok) {
                // 
                store.setNickname(nickname);
                store.saveNickname();
                return {success: true}
            } else {
                return {success: false, err: 'soon'}
            }
        }).catch(err => {
            errorWrapper.wrap(err);
        })
    },
    contractSignUp: () => {
        return eosController.contractSignUp(store.getNickname(), store.getPrivateKeys().active).then(data => {
            store.saveKeys();
            return;
        }).catch(err => {
            errorWrapper.wrap(err);
        })
    },
    loadMessages: (userList) => {
        return eosController.loadMessages(store.getNickname()).then(data => {
            console.log(data);
        })
    }
}