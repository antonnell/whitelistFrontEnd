import fetch from "node-fetch";
var crypto = require('crypto');
var bip39 = require('bip39');
var sha256 = require('sha256');
var mnemonic = require('mnemonic')

let Dispatcher = require("flux").Dispatcher
let Emitter = require("events").EventEmitter

let dispatcher = new Dispatcher()
let emitter = new Emitter()

let apiUrl = "https://api.whitelist.cryptocurve.network/";

var Store = () => {

  dispatcher.register(function(payload) {
    switch (payload.type) {
    case "whitelist":
      this.whitelist(payload);
      break;
    }
  }.bind(this))

  this.whitelist = function(payload) {
    var url = "api/v1/whitelist"
    var postJson = {
      emailAddress: payload.content.emailAddress,
      ethereumAddress: payload.content.ethAddress,
      wanchainAddress: payload.content.wanAddress
    }

    console.log(postJson)
    this.callApi(url,
      "POST",
      postJson,
      payload)
  }

  this.callApi = function(url, method, postData, payload) {
    var call = apiUrl+url

    const signJson = JSON.stringify(postData);
    const signMnemonic = bip39.generateMnemonic();
    const cipher = crypto.createCipher('aes-256-cbc', signMnemonic);
    const signEncrypted = cipher.update(signJson, 'utf8', 'base64') + cipher.final('base64');
    var signData = {
      e: signEncrypted.hexEncode(),
      m: signMnemonic.hexEncode(),
      u: "EDBBBA5EDFC477E59BBDE868B28AD698FA7065378A037737108453DD501A87B1",
      p: "5D866AD91A8A473215B4BF663A600BF8B4B4E4E1BEA3C725B7696DF119481947",
      t: new Date().getTime(),
    }
    const signSeed = JSON.stringify(signData)
    const signSignature = sha256(signSeed)
    signData.s = signSignature

    fetch(call, {
        method: method,
        body: JSON.stringify(signData),
        headers: { "Content-Type": "application/json", "authorization": "Basic NDk5MUQ1OTJFN0ZFQTE1MDkyQ0IwNjhFQkZCREVFQzczNzNBMTk0NEU1MTA3QTFERDE5MUMzMTBENkY5MDRBMDowRkYxNUI0NDMxQjI0RkE0M0U5RTYwODIxMERGNEU0QTVBNjBCQ0MzMTUzREIzMTlEMTU1MUE4RjEzQ0ZEMkUx" },
    })
    .then(res => res.json())
    .then((res) => {
      emitter.emit(payload.type, null, res)
    })
    .catch((error) => {
      emitter.emit(payload.type, error, null)
    });
  }
}

var store = new Store()

String.prototype.hexEncode = function(){
    var hex, i;
    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }
    return result
}
String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

function decrypt(text,seed){
  var decipher = crypto.createDecipher('aes-256-cbc', seed)
  var dec = decipher.update(text,'base64','utf8')
  dec += decipher.final('utf8');
  return dec;
}

export default ({
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
})
