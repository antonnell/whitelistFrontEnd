import React from "react"
import WelcomeComponent from "../components/welcome"
const createReactClass = require("create-react-class")
const isEthereumAddress  = require('is-ethereum-address');
let emitter = require("../store/store.js").default.emitter
let dispatcher = require("../store/store.js").default.dispatcher

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
    } /*else if (!isEthereumAddress(this.state.wanAddress)) {
      this.setState({wanAddressError: true, wanAddressErrorText: "Invalid Wanchain address"});
      error = true;
    }*/

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
