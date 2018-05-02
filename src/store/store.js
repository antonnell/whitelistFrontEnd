import fetch from "node-fetch";

let Dispatcher = require("flux").Dispatcher
let Emitter = require("events").EventEmitter

let dispatcher = new Dispatcher()
let emitter = new Emitter()

let apiUrl = "http://localhost:4000/";

var Store = () => {

  dispatcher.register(function(payload) {
    switch (payload.type) {
    case "whitelist":
      this.whitelist(payload);
      break;
    }
  }.bind(this))

  this.whitelist = function(payload) {
    var url = "/api/v1/whitelist"
    var postJson = {
      emailAddress: payload.content.emailAddress,
      ethAddress: payload.content.ethAddress,
      wanAddress: payload.content.wanAddress
    }

    emitter.emit(payload.type, null, {success: true})
    /*this.callApi(url,
      "POST",
      postJson,
      payload)*/
  }

  this.callApi = function(url, method, postData, payload) {
    var call = apiUrl+url

    fetch(call, {
        method: method,
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" },
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

export default ({
  store: store,
  dispatcher: dispatcher,
  emitter: emitter
})
