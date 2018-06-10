import config from './appConfig';
import eosController from './appEosController';
import UserList from '../model/collections/UserList';
import ChatList from '../model/collections/ChatList';
import _ from 'lodash';
import { decryptSessionKey } from '../../utils/crypto';
import workshop from './appWorkshop';
import errrorWrapper from './appErrorWrapper';

class Store {
    constructor() {
        this.store = {
            masterKey: localStorage.getItem(config.localStorageMasterPrivateKey) || null,
            publicKeys: JSON.parse(localStorage.getItem(config.localStoragePublicKeys)) || null,
            privateKeys: JSON.parse(localStorage.getItem(config.localStoragePrivateKeys)) || null,
            nickname: localStorage.getItem(config.localStorageNickname) || null,
            users: new UserList()
        }
    }
    getPrivateKeys() {
        return this.store.privateKeys;
    }
    getPublicKeys() {
        return this.store.publicKeys;
    }
    getMasterKey() {
        return this.store.masterKey;
    }
    setKeys(keys) {
        this.store.masterKey = keys.masterPrivateKey;
        this.store.publicKeys = keys.publicKeys;
        this.store.privateKeys = keys.privateKeys;
    }
    setNickname(nickname) {
        this.store.nickname = nickname;
    }
    saveNickname() {
        localStorage.setItem(config.localStorageNickname, this.store.nickname);
    }
    getNickname() {
        return this.store.nickname;
    }
    clear() {
        this.store = {users: new UserList()};
        localStorage.clear();
    }
    saveKeys() {
        localStorage.setItem(config.localStorageMasterPrivateKey, this.store.masterKey);
        localStorage.setItem(config.localStoragePrivateKeys, JSON.stringify(this.store.privateKeys));
        localStorage.setItem(config.localStoragePublicKeys, JSON.stringify(this.store.publicKeys));
    }
    generateKeys() {
        let self = this;
        return eosController.generateKeys().then(keys => {
            self.setKeys(keys);
            return;
        })
    }
    getUsers() {
        return this.store.users;
    }
    loadUsers() {
        let self = this;
        let nick = this.store.nickname;
        return eosController.loadUsers().then(data => {
            console.log(data);
            self.store.users.add(_.filter(data.rows, _row => { return _row.account_name !== nick}), {merge: true});
        })
    }
    loadMessages() {
        let self = this;
        return eosController.loadMessages().then(data => {
            self.store.users.forEach(_user => {
                let msgs =_.filter(data, _msg => {
                    return (_msg.from === _user.get('account_name') && _msg.to === self.getNickname()) || (_msg.from === self.getNickname() && _msg.to === _user.get('account_name'))
                })
                msgs = _.sortBy(msgs, 'seq');
                _user.get('messages').add(msgs, {merge: true})
            })
        })
    }
    loadData() {
        let self = this;
        return this.loadUsers().then(() => {
            return self.loadMessages();
        }).then(() => {
            return self.loadTransactions();
        }).then(() => {
            return self.loadBalance();
        })
    }
    loadTransactions() {
        let self = this;
        return eosController.loadTransactions(this.store.nickname).then(data => {
            console.log(data);
            self.store.transactions = data;
        })
    }
    loadBalance() {
        let self = this;
        return eosController.getBalance(this.store.nickname).then(data => {
            console.log(data)
            self.store.balance = data
        })
    }
    startPolling() {
        let self = this;
        console.log('poll')
        this.loadData().then(() => {
            self.startPolling();
        })
    }
}

let store = new Store();

export default store;