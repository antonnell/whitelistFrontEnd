import React from "react"
import WelcomeComponent from "../components/welcome"
import { sha3 } from 'ethereumjs-util';
const createReactClass = require("create-react-class")
const isEthereumAddress  = require('is-ethereum-address');
let emitter = require("../store/store.js").default.emitter
let dispatcher = require("../store/store.js").default.dispatcher

function isWanchainAddress(address: string): boolean {
  if (address === '0x0000000000000000000000000000000000000000') {
    return false;
  }
  if (address.substring(0, 2) !== '0x') {
    return false;
  } else if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
  /*} else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    return true;*/
  } else {
    return isChecksumAddress(address);
  }
}
function toChecksumWaddress(address: string): boolean {
  /* stripHexPrefix */
  if (typeof address !== 'string') {
    return false;
  }
  address = address.slice(0, 2) === '0x' ? address.slice(2) : address;
  address = address.toLowerCase();
  /* toChecksumWaddress */
  const hash = sha3(address).toString('hex');
  let ret = '0x';

  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) < 8) {
      ret += address[i].toUpperCase();
    } else {
      ret += address[i];
    }
  }console.log(ret)
  return ret;
}
function isChecksumAddress(address: string): boolean {
  return address === toChecksumWaddress(address);
}

let Welcome = createReactClass({
  getInitialState() {
    return {
      loaded: false,
      loading: false,
      error: null,

      emailAddress: "",
      emailAddressError: false,
      ethAddress: "",
      ethAddressError: false,
      wanAddress: "",
      wanAddressError: false,

      smartContractAddress: '0x1abc',
      snackOpen: false
    };
  },

  componentWillMount() {
    emitter.on("whitelist", this.whitelistReturned);
  },

  componentWillUnmount() {
    emitter.removeAllListeners("whitelist");
  },

  render() {
    return (
      <WelcomeComponent
        handleChange={this.handleChange}
        submitWhitelist={this.submitWhitelist}
        onWhitelistKeyDown={this.onWhitelistKeyDown}
        smartContractAddress={this.state.smartContractAddress}
        onCopyClicked={this.onCopyClicked}
        emailAddress={this.state.emailAddress}
        emailAddressError={this.state.emailAddressError}
        emailAddressErrorText={this.state.emailAddressErrorText}
        ethAddress={this.state.ethAddress}
        ethAddressError={this.state.ethAddressError}
        ethAddressErrorText={this.state.ethAddressErrorText}
        wanAddress={this.state.wanAddress}
        wanAddressError={this.state.wanAddressError}
        wanAddressErrorText={this.state.wanAddressErrorText}
        snackOpen={this.state.snackOpen}
        handleSnackClose={this.handleSnackClose}
        loading={this.state.loading}
        loaded={this.state.loaded}
        error={this.state.error}
      />
    );
  },

  handleSnackClose() {
    this.setState({snackOpen: false})
  },

  onCopyClicked() {
    var succeed;
    var textArea = document.createElement("textarea");
    textArea.value = this.state.smartContractAddress;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
  	  succeed = document.execCommand("copy");
    } catch(e) {
      succeed = false;
    }

    document.body.removeChild(textArea);
    this.setState({snackOpen: succeed})
  },

  handleChange (event, name) {
    if(event != null && event.target != null) {
      this.setState({
        [name]: event.target.value
      });
    }
  },

  onWhitelistKeyDown(event) {
    if (event.which == 13) {
      this.submitWhitelist();
    }
  },

  validateEmail(emailAddress) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailAddress);
  },

  submitWhitelist() {
    var error = false;
    this.setState({emailAddressError: false, ethAddressError: false, wanAddressError: false, error: null});

    if(this.state.emailAddress == "") {
      this.setState({emailAddressError: true, emailAddressErrorText: "Email Address is required"});
      error = true;
    } else if (!this.validateEmail(this.state.emailAddress)) {
      this.setState({emailAddressError: true, emailAddressErrorText: "Invalid Email Address"});
      error = true;
    }
    if(this.state.ethAddress == "") {
      this.setState({ethAddressError: true, ethAddressErrorText: "Etherium Address is required"});
      error = true;
    } else if (!isEthereumAddress(this.state.ethAddress)) {
      this.setState({ethAddressError: true, ethAddressErrorText: "Invalid Etherium Address"});
      error = true;
    }
    if(this.state.wanAddress == "") {
      this.setState({wanAddressError: true, wanAddressErrorText: "Wanchain Address is required"});
      error = true;
    } else if (!isWanchainAddress(this.state.wanAddress)) {
      this.setState({wanAddressError: true, wanAddressErrorText: "Invalid Wanchain address"});
      error = true;
    }

    if(!error) {
      this.setState({loading: true});
      var content = {emailAddress: this.state.emailAddress, ethAddress: this.state.ethAddress, wanAddress: this.state.wanAddress};
      dispatcher.dispatch({type: "whitelist", content})
    }
  },

  whitelistReturned(error, data) {
    this.setState({loading: false});
    if(error) {
      return this.setState({error: error.toString()});
    }

    if(data.success) {
      this.setState({loaded: true});
    } else {
      this.setState({error: data.errorMsg});
    }
  },
})

export default (Welcome);
