import config from './appConfig';
import eosController from './appEosController';

class Store {
    constructor() {
        this.store = {
            masterKey: localStorage.getItem(config.localStorageMasterPrivateKey) || null,
            publicKeys: JSON.parse(localStorage.getItem(config.localStoragePublicKeys)) || null,
            privateKeys: JSON.parse(localStorage.getItem(config.localStoragePrivateKeys)) || null
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
}

let store = new Store();

export default store;