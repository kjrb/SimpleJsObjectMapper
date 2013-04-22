/**
 * Created with JetBrains WebStorm.
 * User: jola
 * Date: 4/21/13
 * Time: 12:02 AM
 * To change this template use File | Settings | File Templates.
 */
function Mapper (mapping) {
    this.cache = {};
    this.sourceToDestinationMap = mapping;
}

Mapper.prototype.map = function(source, destination, subpath) {

        if (!source) return;

        var fromKey, config = this.sourceToDestinationMap, memoize = false;

        if (subpath) {
            if (!this.cache[subpath]) {
                this.cache[subpath] = {};
                memoize = true;
            }
            else {
                config = this.cache[subpath];
            }
        }

        for(fromKey in config) {
            if (memoize) {
                if (fromKey.lastIndexOf(subpath, 0) !== 0) {
                    continue;
                }
                else {
                    this.cache[subpath][fromKey] = config[fromKey];
                }
            }

            process(source, fromKey, destination, config);
        }

    function process(from, fromKey, to, config) {
        var fromValue = getSourceValue(from, fromKey);

        if (config[fromKey].converter) {
            fromValue = config[fromKey].converter(fromValue, from);
        }

        if (fromValue !== null) {
            setDestinationValue(fromValue, config[fromKey].to, to);
        }
    }

    function getSourceValue(obj, key) {
        var path = key.split('.'), len = path.length, i, context = obj;
        for (i = 0; i < len; i++) {
            if (context && context.hasOwnProperty(path[i])) {
                context = context[path[i]];
            }
            else {
                return null;
            }
        }

        return context;
    }

    function setDestinationValue(fromValue, key, toObject) {
        var path = key.split('.'), len = path.length - 1, i, context = toObject;
        for (i = 0; i < len; i++) {
            if (!context.hasOwnProperty(path[i])) {
                context[path[i]] = {};
            }
            context = context[path[i]];
        }

        context[path[len]] = fromValue;
    }


};

//Mapper.prototype.process = function(from, fromKey, to, config) {
//        var fromValue = this.getSourceValue(from, fromKey);
//
//        if (config[fromKey].converter) {
//            fromValue = config[fromKey].converter(fromValue, from);
//        }
//
//        if (fromValue !== null) {
//            this.setDestinationValue(fromValue, config[fromKey].field, to);
//        }
//    }
//
//Mapper.prototype.getSourceValue = function (obj, key) {
//        var path = key.split('.'), len = path.length, i, context = obj;
//        for (i = 0; i < len; i++) {
//            if (context && context.hasOwnProperty(path[i])) {
//                context = context[path[i]];
//            }
//            else {
//                return null;
//            }
//        }
//
//        return context;
//    }
//
//Mapper.prototype.setDestinationValue = function (fromValue, key, toObject) {
//        var path = key.split('.'), len = path.length - 1, i, context = toObject;
//        for (i = 0; i < len; i++) {
//            if (!context.hasOwnProperty(path[i])) {
//                context[path[i]] = {};
//            }
//            context = context[path[i]];
//        }
//
//        context[path[len]] = fromValue;
//    }
//
