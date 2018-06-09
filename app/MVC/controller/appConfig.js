const platformName = 'Cebab Chat';
const cebabPlatfromName = platformName.split(' ').join('-').toLowerCase();

module.exports = {
    platformName: platformName,


    //local storage
    localStorageMasterPrivateKey: cebabPlatfromName + '-master-private-key',
    localStoragePublicKeys: cebabPlatfromName + '-public-keys',
    localStoragePrivateKeys: cebabPlatfromName + '-private-keys',
    localStorageNickname: cebabPlatfromName + '-nickname',

    //api
    nodeProtocol: 'http://',
    nodeUrl: '89.223.88.56/nodeapi',
    serverProtocol: 'http://',
    serverUrl: '89.223.88.56',
    serverPort: '3000',
    serverRegistrationPath: '/signup/',

    contractName: 'eoschat'
}