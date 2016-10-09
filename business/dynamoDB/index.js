var _ = require('lodash');
var uuid = require('uuid');
var awsSecrets = require('../../config/secrets/aws.json');
var dynasty = require('dynasty')(awsSecrets);
var customers = dynasty.table('static-customers');

function insert(info, device, type) {
    var mergedInfo = _mergeDevice(info, device);
    mergedInfo.type = type;
    _insert(mergedInfo);
}

function _mergeDevice(info, device) {
    var newInfo = _.cloneDeep(info);
    newInfo.deviceType = device.type;
    newInfo.deviceName = device.name;
    return newInfo
}

function _insert(info) {
    info.id = uuid.v4();
    info.insertTime = Date.now();
    customers.insert(info, function (err, res) {
        if (err) {
            console.log('Failed to save ' + info.type + ' - ' + JSON.stringify(err, null, 2));
        } else {
            console.log(info.type + ' is persisted')
        }
    });
}

module.exports = {
    insert: insert,
    infoType: {
        contact: 'contact',
        seller: 'seller'
    }
};