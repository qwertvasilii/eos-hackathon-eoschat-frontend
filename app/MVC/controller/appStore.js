import config from './appConfig';
import eosController from './appEosController';
import UserList from '../model/collections/UserList';
import TransactionList from '../model/collections/TransactionList';
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
            mnemonic: localStorage.getItem(config.localStorageMnemonic) || null,
            users: new UserList(),
            balance: new Backbone.Model(),
            numbers: new Backbone.Model(),
            transactions: new TransactionList()
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
    setKeys(keys, mnemonic) {
        this.store.masterKey = keys.masterPrivateKey;
        this.store.publicKeys = keys.publicKeys;
        this.store.privateKeys = keys.privateKeys;
        this.store.mnemonic = mnemonic;
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
        this.store = {users: new UserList(), balance: new Backbone.Model(), transactions: new TransactionList(), numbers: new Backbone.Model()};
        localStorage.clear();
    }
    saveKeys() {
        localStorage.setItem(config.localStorageMasterPrivateKey, this.store.masterKey);
        localStorage.setItem(config.localStoragePrivateKeys, JSON.stringify(this.store.privateKeys));
        localStorage.setItem(config.localStoragePublicKeys, JSON.stringify(this.store.publicKeys));
        localStorage.setItem(config.localStorageMnemonic, this.store.mnemonic);
    }
    generateKeys() {
        let self = this;
        // let mnemonic = eosController.generateMnemonic();
        // console.log(mnemonic);
        // let seed = eosController.makeMasterPrivateFromMnemonic(mnemonic);
        // return eosController.generateKeysFromMnemonic(seed).then(keys => {
        //     self.setKeys(keys, mnemonic);
        //     return;
        // })
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
            self.store.users.add(_.filter(data.rows, _row => { return _row.account_name !== nick}), {merge: true});
        })
    }
    loadMessages() {
        let self = this;
        return eosController.loadMessages().then(data => {
            let totalMsg = 0;
            self.store.users.forEach(_user => {
                let msgs =_.filter(data, _msg => {
                    return (_msg.from === _user.get('account_name') && _msg.to === self.getNickname()) || (_msg.from === self.getNickname() && _msg.to === _user.get('account_name'))
                })
                msgs = _.sortBy(msgs, 'seq');
                let myMessages = _.sortBy(_user.get('messages').filter(_msg => {
                    return _msg.get('from') === self.getNickname();
                }),'seq');
                let foreignMessages = _.sortBy(_user.get('messages').filter(_msg => {
                    return _msg.get('from') === _user.get('account_name');
                }),'seq');
                let firstServiceMsg = -1;
                let secondServiceMsg = -1;
                if (myMessages.length > 0)
                    firstServiceMsg = myMessages[0].get('seq');
                if (foreignMessages.length > 0)
                    secondServiceMsg = foreignMessages[0].get('seq');
                _user.get('messages').add(msgs, {merge: true})
                if (_user.get('messages').length > 0) {
                    if (_user.get('messages').at(_user.get('messages').length - 1).get('from') !== self.getNickname()) {
                        let num = _user.get('messages').length - 1;
                        let checkMsg = _user.get('messages').at(num);
                        let numOfNew = 0;
                        while (checkMsg.get('from') !== self.getNickname() && num > 0) {
                            if (checkMsg.get('seq') !== firstServiceMsg && checkMsg.get('seq') !== secondServiceMsg)
                                numOfNew++;
                            num--;
                            checkMsg = _user.get('messages').at(num);
                        }
                        _user.set('new_msg', numOfNew);
                        totalMsg += numOfNew;
                    } else {
                        _user.set('new_msg', 0);
                    }
                } 
                self.store.numbers.set('new_msg', totalMsg);
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
            self.store.transactions.add(data, {merge: true});
        })
    }
    loadBalance() {
        let self = this;
        return eosController.getBalance(this.store.nickname).then(data => {
            self.store.balance.set({amount: data[0]})
        })
    }
    startPolling() {
        let self = this;
        this.loadData().then(() => {
            self.startPolling();
        })
    }
}

let store = new Store();

export default store;