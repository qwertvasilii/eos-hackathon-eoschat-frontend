import {Keystore, Keygen} from '../../utils/eosjs-keygen';

export default {
    generateKeys: () => {
        return Keygen.generateMasterKeys();
    }
}