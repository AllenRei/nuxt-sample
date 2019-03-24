const fs = require("fs");
const crypto = require("crypto");

module.exports = {
  loadFrom: (name, path) => {
    // loads modules from dir to global namespace
    let elements = fs.readdirSync(`${global.basepath}/${path}`);
    /** @type {[string] : Model} */
    global[name] = {};
    elements.map(elem => {
      let elemName = elem.replace(".js", "");
      global[name][elemName] = require(`${global.basepath}/${path}/${elem}`) ;
    });
  },
  randomString: length => {
    let value = crypto.randomBytes(length).toString("hex");
    return value;
  },
  randomNumber: (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  encryptCode: (val) => {
    let buff = new Buffer(val);  
    return buff.toString('base64');
  },
  decryptCode: val => {
    let buff = new Buffer(val, 'base64');
    return buff.toString('ascii');
  },
  uniqueElementsById(arr) {
    return arr.filter(
      a => !res.find(r => r.toString() === a.toString())
    )
  }
};
