const platformName = 'Cebab Chat';
const cebabPlatfromName = platformName.split(' ').join('-').toLowerCase();

module.exports = {
    platformName: platformName,


    //local storage
    localStorageMasterPrivateKey: cebabPlatfromName + '-master-private-key',
    localStoragePublicKeys: cebabPlatfromName + '-public-keys',
    localStoragePrivateKeys: cebabPlatfromName + '-private-keys'
}