import store from './appStore';
import axios from 'axios';
import config from './appConfig';
import errorWrapper from './appErrorWrapper';
import eosController from './appEosController';
import { generateSessionKey, encryptSessionKey, decryptSessionKey, decryptMessage } from '../../utils/crypto';
var Long = require('long')
var Buffer = require('buffer/').Buffer

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
    },
    getChatKeys: (nickname) => {
        return localStorage.getItem(config.localStorageChatKeysPrefix + nickname);
    },
    // checkChatKeys: (nickname) => {
    //     return new Promise((resolve, reject) => {
    //         let keys = JSON.parse(localStorage.getItem(config.localStorageChatKeysPrefix + nickname));

    //         if (!keys) {
    //             console.log('pass', keys)
    //             let pubKey;
    //             let sessionKey;
    //             eosController.getAccount(nickname).then(data => {
    //                 pubKey = data.permissions[0].required_auth.keys[0].key;
    //                 localStorage.setItem(config.localStorageChatKeysPrefix + nickname, JSON.stringify({pubKey: pubKey, sent: false, received: false}))
    //                 return generateSessionKey();
    //             }).then(key => {
    //                 sessionKey = key;
    //                 console.log(pubKey)
    //                 let encryptedSessionKey = encryptSessionKey(store.getPrivateKeys().active, pubKey, key);
    //                 encryptedSessionKey.message = encryptedSessionKey.message.toString('hex');
    //                 encryptedSessionKey.nonce = encryptedSessionKey.nonce.toString();
    //                 return eosController.sendMessage(store.getPrivateKeys().active, JSON.stringify(encryptedSessionKey), store.getNickname(), nickname, false)
    //             }).then(data => {
    //                 keys = JSON.parse(localStorage.getItem(config.localStorageChatKeysPrefix + nickname));
    //                 keys.sessionKey = sessionKey;
    //                 keys.sent = true;
    //                 localStorage.setItem(config.localStorageChatKeysPrefix + nickname, JSON.stringify(keys));
    //                 resolve();
    //             }).catch(err => {
    //                 reject(err);
    //             })
    //         } else if (!keys.sent) {
    //             let pubKey;
    //             let sessionKey;
    //             eosController.getAccount(nickname).then(data => {
    //                 pubKey = data.permissions[0].required_auth.keys[0].key;
    //                 localStorage.setItem(config.localStorageChatKeysPrefix + nickname, JSON.stringify({pubKey: pubKey, sent: false}))
    //                 return generateSessionKey();
    //             }).then(key => {
    //                 sessionKey = key;
    //                 let encryptedSessionKey = encryptSessionKey(store.getPrivateKeys().active, pubKey, key);
    //                 return eosController.sendMessage(store.getPrivateKeys().active, JSON.stringify(encryptedSessionKey), store.getNickname(), nickname, false)
    //             }).then(data => {
    //                 let keys = JSON.parse(localStorage.getItem(config.localStorageChatKeysPrefix + nickname));
    //                 keys.sessionKey = sessionKey;
    //                 keys.sent = true;
    //                 localStorage.setItem(config.localStorageChatKeysPrefix + nickname, JSON.stringify(keys));
    //                 resolve();
    //             }).catch(err => {
    //                 reject(err);
    //             })
    //         } else {
    //             resolve();
    //         }
    //     }).catch(err => {
    //         errorWrapper.wrap(err);
    //     })
        
    // },
    // checkReceiveKeys(user) {
    //     console.log('DSDFSDF');
    //     let self = this;
    //     return new Promise((resolve, reject) => {
    //         if (user.get('messages').length > 0) {
    //             console.log('pass 1')
    //             let keys = JSON.parse(localStorage.getItem(config.localStorageChatKeysPrefix + user.get('account_name')));
    //             if (!keys || !keys.received) {
    //                 console.log('pass 2');
    //                 let pubKey;

    //                 let income = user.get('messages').filter(_msg => { return _msg.get('from') === user.get('account_name')});
    //                 console.log(income)
    //                 if (income.length > 0) {
    //                     console.log('pass 3');
    //                     let cipher = JSON.parse(income[0].get('message'));
                        
    //                     eosController.getAccount(user.get('account_name')).then(data => {
    //                         pubKey = data.permissions[0].required_auth.keys[0].key;
    //                         cipher.message = Buffer.from(cipher.message, 'hex');
    //                         // cipher.nonce = new Long(cipher.nonce.low, cipher.nonce.high, cipher.nonce.unsigned);
    //                         console.log(cipher);
    //                         let decrypted = decryptSessionKey(store.getPrivateKeys().active, pubKey, cipher).toString();
    //                         let encrypted = encryptSessionKey(store.getPrivateKeys().active, pubKey, decrypted);
    //                         if (!keys) keys = {}
    //                         // keys.foreignSessionKey = decrypted;
    //                         keys.received = true;
    //                         localStorage.setItem(config.localStorageChatKeysPrefix + user.get('account_name'), JSON.stringify(keys));
    //                         resolve();
    //                     }).catch(err => {
    //                         reject(err);
    //                     })
    //                 } else {
    //                     resolve();
    //                 }
    //             } else {
    //                 resolve();
    //             }
    //         } else {
    //             resolve();
    //         }
    //     }).catch(err => {
    //         errorWrapper.wrap(err);
    //     })
    // },
    sendMessage: (message) => {
        return eosController.sendMessage(store.getPrivateKeys().active, message, store.getNickname(), localStorage.getItem('selected-chat-user'), true);
    },
    transfer: (amount) => {
        return eosController.transfer(store.getPrivateKeys().active, amount, store.getNickname(), localStorage.getItem('selected-chat-user'));
    },
    decryptForeignMessage: (message) => {
        return decryptMessage(JSON.parse(localStorage.getItem(config.localStorageChatKeysPrefix + localStorage.getItem('selected-chat-user'))).foreignSessionKey, message)
    },
    checkKeys: (user) => {
        return new Promise((resolve, reject) => {
            let keys = localStorage.getItem(config.localStorageChatKeysPrefix + user.get('account_name'))
            if (keys) keys = JSON.parse(keys);
            else keys = {};
            if (!keys.received) {
               let messages = user.get('messages').filter(_msg => { return _msg.get('from') === user.get('account_name') })
               if (messages.length > 0) {
                   let keyMessage = messages[0];
                   let cipher = JSON.parse(keyMessage.get('message'));
                   let pubKey;
                   eosController.getAccount(user.get('account_name')).then(data => {
                        pubKey = data.permissions[0].required_auth.keys[0].key;
                        cipher.message = Buffer.from(cipher.message, 'hex');
                        let decrypted = decryptSessionKey(store.getPrivateKeys().active, pubKey, cipher).toString();
                        keys.sessionKey = decrypted;
                        if (!keys.send) {
                            let encrypted = encryptSessionKey(store.getPrivateKeys().active, pubKey, decrypted);
                            keys.send = true;
                            return eosController.sendMessage(store.getPrivateKeys().active, JSON.stringify(encrypted), store.getNickname(), user.get('account_name'), false);
                        } else {
                            return;
                        }
                   }).then(() => {
                        keys.received = true;
                        localStorage.setItem(config.localStorageChatKeysPrefix + user.get('account_name'), JSON.stringify(keys));
                        resolve();
                   }).catch(err => {
                       reject(err);
                   })
               } else {
                   let pubKey;
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
                        resolve();
                    }).catch(err => {
                        reject(err);
                    })
               }
            } else {
                resolve();
            }

        }).catch(err => {
            errorWrapper.wrap(err);
        })
    }
}
