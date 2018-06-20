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
    nodeProtocol: 'http://',
    nodeUrl: '18.219.50.252/nodeapi',
    serverProtocol: 'http://',
    serverUrl: '18.219.50.252',
    serverPort: '3000',
    serverRegistrationPath: '/signup/',

    contractName: 'eoschat'
}