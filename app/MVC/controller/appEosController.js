import {Keystore, Keygen} from '../../utils/eosjs-keygen';
import Eos from '../../utils/eos';
import config from './appConfig';

const url = config.nodeProtocol + config.nodeUrl;

const eos = Eos({
    httpEndpoint: url
})
export default {
    generateKeys: () => {
        return Keygen.generateMasterKeys();
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
            console.log("b", result);
            return result;
        });
    },
    loadMessages: (nickname) => {
        return eos.getActions(nickname).then(result => {
            let msgs = [];
              result.actions.forEach(r => {
                if (r.action_trace.act) {
                  const isEOSchat = r.action_trace.act.account === "eoschat";
                  const isSend = r.action_trace.act.name === "send";
                  if (isEOSchat && isSend) {
                    msgs.push(r.action_trace.act.data);
                  }
                }
              });
            
            console.log("m", msgs);
            return msgs;
          });
    }
}