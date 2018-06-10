const ecc = require("./eosjs-ecc");
import Eos from "./eos";
var aesjs = require("aes-js");

const generateSessionKey = function() {
  return ecc.randomKey();
};

const encryptSessionKey = function(A_priv, B_pub, sessionKey) {
  const cipher = ecc.Aes.encrypt(A_priv, B_pub, sessionKey);
  return cipher;
};

const decryptSessionKey = function(B_priv, A_pub, cipher) {
  console.log(B_priv, A_pub, cipher)
  const dec = ecc.Aes.decrypt(
    B_priv,
    A_pub,
    cipher.nonce,
    cipher.message,
    cipher.checksum
  );
  return dec;
};

const encryptMessage = function(sessionKey, message) {
  let key = ecc.sha256(sessionKey);
  key = Buffer.from(key.slice(0, 32));
  const textBytes = aesjs.utils.utf8.toBytes(message);
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  const encryptedBytes = aesCtr.encrypt(textBytes);
  const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
  return encryptedHex;
};

const decryptMessage = function(sessionKey, encryptedMessage) {
  let key = ecc.sha256(sessionKey);
  key = Buffer.from(key.slice(0, 32));
  const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  const encryptedBytes = aesjs.utils.hex.toBytes(encryptedMessage);
  const decryptedBytes = aesCtr.decrypt(encryptedBytes);
  const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
  return decryptedText;
};

/*
  protocol
  
  A gen session key S
  A encrypt Aprk Bpuk S => AeS
  A send AeS to B
  B encrypt Bprk Apuk S => BeS
  B send BeS to A
  A,B encrypt msg with S
  */

module.exports = {
  generateSessionKey,
  encryptSessionKey,
  decryptSessionKey,
  encryptMessage,
  decryptMessage
};
