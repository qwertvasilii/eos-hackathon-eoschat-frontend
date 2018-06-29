import store from './appStore';
import axios from 'axios';
import config from './appConfig';
import errorWrapper from './appErrorWrapper';
import eosController from './appEosController';
import { generateSessionKey, encryptSessionKey, decryptSessionKey, decryptMessage } from '../../utils/crypto';
var Buffer = require('buffer/').Buffer


const url = config.serverProtocol + config.serverUrl + ':' + config.serverPort;

export default {
    getMnemonicSaved: () => {
        let mnemonic = store.getMnemonic();
        if (mnemonic) return false;
        else return true;
    },
    getLoggedIn: () => {
        let masterKey = store.getMasterKey();
        if (masterKey) return true;
        else return false;
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
    signIn: (mnemonic) => {
        return store.generateKeysFromMnemonic(mnemonic).then(result => {
            return result;
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
        })
    },
    getChatKeys: (nickname) => {
        return localStorage.getItem(config.localStorageChatKeysPrefix + nickname);
    },
    sendMessage: (message) => {
        let self = this;
        return eosController.sendMessage(store.getPrivateKeys().active, message, store.getNickname(), localStorage.getItem('selected-chat-user'), true).then(encrypted => {
            store.addPreMessage({from: store.getNickname(), to: localStorage.getItem('selected-chat-user'), message: encrypted.message, trx_id: encrypted.trx_id})
        })
    },
    transfer: (amount) => {
        Backbone.loading.show();
        return eosController.transfer(store.getPrivateKeys().active, amount, store.getNickname(), localStorage.getItem('selected-chat-user')).then(() => {
            Backbone.loading.hide();
        })
    },
    decryptMessage: (message) => {
        let msg = decryptMessage(JSON.parse(localStorage.getItem(config.localStorageChatKeysPrefix + localStorage.getItem('selected-chat-user'))).sessionKey, message)
        return msg;
    },
    checkKeys: (user) => {
        return new Promise((resolve, reject) => {
            let keys = localStorage.getItem(config.localStorageChatKeysPrefix + user.get('account_name'))
            if (keys) keys = JSON.parse(keys);
            else keys = {};
            if (!keys.received) {
               let messages = user.get('messages').filter(_msg => { return _msg.get('from') === user.get('account_name') })
               let myMessages = user.get('messages').filter(_msg => {return _msg.get('from') === store.getNickname()});
               if (messages.length > 0) {
                   let keyMessage = messages[0];
                   let cipher = JSON.parse(keyMessage.get('message'));
                   let pubKey;
                   Backbone.loading.show();
                   eosController.getAccount(user.get('account_name')).then(data => {
                        pubKey = data.permissions[0].required_auth.keys[0].key;
                        cipher.message = Buffer.from(cipher.message, 'hex');
                        let decrypted = decryptSessionKey(store.getPrivateKeys().active, pubKey, cipher).toString();
                        keys.sessionKey = decrypted;
                        if (!keys.send) {
                            let encrypted = encryptSessionKey(store.getPrivateKeys().active, pubKey, decrypted);
                            encrypted.message = encrypted.message.toString('hex');
                            encrypted.nonce = encrypted.nonce.toString();
                            keys.send = true;
                            return eosController.sendMessage(store.getPrivateKeys().active, JSON.stringify(encrypted), store.getNickname(), user.get('account_name'), false);
                        } else {
                            return;
                        }
                   }).then(() => {
                        keys.received = true;
                        localStorage.setItem(config.localStorageChatKeysPrefix + user.get('account_name'), JSON.stringify(keys));
                        Backbone.loading.hide();
                        resolve();
                   }).catch(err => {
                       reject(err);
                   })
               } else if (!keys.send && myMessages.length === 0 ){
                   let pubKey;
                   Backbone.loading.show();
                    eosController.getAccount(user.get('account_name')).then(data => {
                        pubKey = data.permissions[0].required_auth.keys[0].key;
                        return generateSessionKey();
                    }).then(sessionKey => {
                        keys.sessionKey = sessionKey;
                        let encryptedSessionKey = encryptSessionKey(store.getPrivateKeys().active, pubKey, sessionKey);
                        encryptedSessionKey.message = encryptedSessionKey.message.toString('hex');
                        encryptedSessionKey.nonce = encryptedSessionKey.nonce.toString();
                        return eosController.sendMessage(store.getPrivateKeys().active, JSON.stringify(encryptedSessionKey), store.getNickname(), user.get('account_name'), false);
                    }).then(() => {
                        keys.send = true;
                        localStorage.setItem(config.localStorageChatKeysPrefix + user.get('account_name'), JSON.stringify(keys));
                        Backbone.loading.hide();
                        resolve();
                    }).catch(err => {
                        reject(err);
                    })
               } else if (!keys.send && myMessages.length > 0) {
                    keys.send = true;
                    localStorage.setItem(config.localStorageChatKeysPrefix + user.get('account_name'), JSON.stringify(keys));
                    resolve();
               } else {
                   resolve();
               }
            } else {
                resolve();
            }

        }).catch(err => {
            errorWrapper.wrap(err);
        })
    }
}
