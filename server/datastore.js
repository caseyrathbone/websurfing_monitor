/* datastore.js */

var myStorage = (function() {
    var obj = {};
    
    var dataArray = [];
    
    obj.getData = function() {
        return dataArray;
    };
    
    obj.addData = function(newData) {
        dataArray.push(newData);
    }
    
    obj.deleteData = function() {
        dataArray = [];
    }
    
    return obj;
})();

module.exports = myStorage;