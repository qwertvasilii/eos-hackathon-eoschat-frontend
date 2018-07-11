const platformName = 'EOS Chat';
const kebabPlatfromName = platformName.split(' ').join('-').toLowerCase();

module.exports = {
    platformName: platformName,


    //local storage
    localStorageMasterPrivateKey: kebabPlatfromName + '-master-private-key',
    localStoragePublicKeys: kebabPlatfromName + '-public-keys',
    localStoragePrivateKeys: kebabPlatfromName + '-private-keys',
    localStorageNickname: kebabPlatfromName + '-nickname',
    localStorageChatKeysPrefix: kebabPlatfromName + '-chat-',
    localStorageMnemonic: kebabPlatfromName + '-mnemonic',

    //api
    nodeProtocol: 'https://',
    nodeUrl: 'chat.i-link.pro/nodeapi',
    serverProtocol: 'https://',
    serverUrl: 'chat.i-link.pro',
    serverRegistrationPath: '/signup/',

    contractName: 'eoschat'
}