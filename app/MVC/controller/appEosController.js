import {Keystore, Keygen} from '../../utils/eosjs-keygen';
import Eos from '../../utils/eos';
import config from './appConfig';
import { generateSessionKey, encryptMessage } from '../../utils/crypto';
import { generateMnemonic, mnemonicToSeedHex } from 'bip39';
import { seedPrivate, sign } from '../../utils/eosjs-ecc';


const url = config.nodeProtocol + config.nodeUrl;

const eos = Eos({
    httpEndpoint: url
})
export default {
    generateMnemonic: () => {
        return generateMnemonic();
    },
    makeMasterPrivateFromMnemonic: (mnemonic) => {
        return 'PW' + seedPrivate(mnemonicToSeedHex(mnemonic))
    }, 
    generateKeysFromMnemonic: (seed) => {
        return Keygen.generateMasterKeys(seed)
    },
    generateKeys: () => {
        return Keygen.generateMasterKeys();
    },
    transfer: (privateKey, amount, sender, receiver) => {
        const eosPrivate = Eos({
            keyProvider: privateKey,
            httpEndpoint: url
        })
        return eosPrivate.transfer({
            from: sender,
            to: receiver,
            quantity: amount + " EOS",
            memo: ""
          });
    },
    getByPubKey: (pubKey) => {
        return eos.getKeyAccounts(pubKey).then(names => {
            return names.account_names;
        })
    },
    contractSignUp: (nickname, privateKey) => {
        const eosPrivate = Eos({
            keyProvider: privateKey,
            httpEndpoint: url
        })
        return eosPrivate.transaction({
            actions: [
                {
                account: config.contractName,
                name: "signup",
                authorization: [
                    {
                    actor: nickname,
                    permission: "active"
                    }
                ],
                data: {
                    account: nickname,
                    username: nickname
                },
                delay_sec: 15
                }
            ]
        })
    },
    loadUsers: () => {
        return eos.getTableRows(true, "eoschat", "eoschat", "user", null, null, null, 100).then(result => {
            return result;
        });
    },
    loadMessages: () => {
        return eos.getActions(config.contractName, 0, 1000).then(result => {
            let msgs = [];
              result.actions.forEach(r => {
                if (r.action_trace.act) {
                  const isEOSchat = r.action_trace.act.account === "eoschat";
                  const isSend = r.action_trace.act.name === "send";
                  if (isEOSchat && isSend) {
                      let _msg = r.action_trace.act.data;
                      _msg.seq = r.global_action_seq;
                      _msg.time = r.block_time; 
                    msgs.push(_msg);
                  }
                }
              });
            return msgs;
          });
    },
    loadTransactions: (user) => {
        return eos.getActions("eosio.token", 0, 1000).then(result => {
            let transactions = [];
            result.actions.forEach(r => {
              if (r.action_trace.act) {
                const isTransfer = r.action_trace.act.name == "transfer";
                if (isTransfer) {
                  const data = r.action_trace.act.data;
                  const isMy = data.from === user || data.to === user;
                  if (isMy) {
                      data.seq = r.global_action_seq;
                      transactions.push(data);
                  }
                }
              }
              
            });
            return transactions;
          });
    },
    getBalance: (user) => {
        return eos.getCurrencyBalance("eosio.token", user).then(result => {
            return result;
          });
    },
    sendMessage: (privateKey, message, sender, receiver, encrypt) => {
        
        
        const eosPrivate = Eos({
            keyProvider: privateKey,
            httpEndpoint: url
        })
        if (encrypt) {
            message = encryptMessage(JSON.parse(localStorage.getItem(config.localStorageChatKeysPrefix + receiver)).sessionKey, message);
        }
        return eosPrivate.transaction({
            actions: [
                {
                    account: config.contractName,
                    name: "send",
                    authorization: [
                        {
                            actor: sender, 
                            permission: "active"
                        }
                    ],
                    data: {
                        from: sender,
                        to: receiver,
                        message: message
                    }
                }
            ]
        })
    },
    getAccount: (nickname) => {
        return eos.getAccount(nickname).then(result => {
            return result;
        });
    }
}