import Web3 from 'web3'

let web3
// Ethereum as provider (Metamask)
if (window.ethereum) {
    web3 = new Web3(window.ethereum)
    window.ethereum.enable() 
} else if (window.web3) { // Update to newest web3 using same provider
    web3 = new Web3(window.web3.currentProvider)
} else { // Web3 is not supported
    console.log("Web3 is not supported")
}

export default web3