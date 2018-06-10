const platformName = 'Kebab Chat';
const kebabPlatfromName = platformName.split(' ').join('-').toLowerCase();

module.exports = {
    platformName: platformName,


    //local storage
    localStorageMasterPrivateKey: kebabPlatfromName + '-master-private-key',
    localStoragePublicKeys: kebabPlatfromName + '-public-keys',
    localStoragePrivateKeys: kebabPlatfromName + '-private-keys',
    localStorageNickname: kebabPlatfromName + '-nickname',
    localStorageChatKeysPrefix: kebabPlatfromName + '-chat-',

    //api
    nodeProtocol: 'http://',
    nodeUrl: '89.223.88.56/nodeapi',
    serverProtocol: 'http://',
    serverUrl: '89.223.88.56',
    serverPort: '3000',
    serverRegistrationPath: '/signup/',

    contractName: 'eoschat'
}