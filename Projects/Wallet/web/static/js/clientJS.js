const Web3 = require('web3');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const HDKey = require('hdkey');
const wif = require('wif');
const EC = require('elliptic').ec;
const web3 = new Web3();
const ec = new EC('secp256k1');
//const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/b0821e33cc8342e189df1b62485d6d06"));



function callFunction(name){
    switch(name){
        case "privk":
            connectWithPriv();
            break;
        case "mnemonic":
            connectWtihWords();
            break;
        case "createWallet":
            createWalletWithPW();
            break;
    }
}

function connectWithPriv(){
    const regex = /^[0-9|a-f|A-F]+$/;
    let value = document.getElementById("privk").value;
    console.log(value);
    if (value.substr(0,2)== "0x"){
        value = value.substring(2);
    }
    if (value.length==64 && regex.test(value)){
        console.log("success");
    }else{
        console.log("fail.. write correct letters");
    }
}

function connectWtihWords(){
    const regex = /^[a-z|A-Z|\s]+$/;
    let value = document.getElementById("mnemonic").value;
    console.log(value);
    let words;
    if (regex.test(value) == false){
        console.log("fail.. write correct letters");
        return;
    }
    words = value.split(" ");
    console.log(words);
    if (words.length == 12){
        console.log("success 12words"+'\n'+words)
    }else if (words.length == 24){
        console.log("success 24words"+'\n'+words)
    }else{
        console.log("fail.. write correct letters");
    }
}

function createWalletWithPW(){
    // let signPw = document.getElementById("createWallet").value;
    // let createAddress = web3.eth.accounts.create();
    // let keystore = createAddress.encrypt(signPw);
    // let solveKeystore = web3.eth.accounts.decrypt(keystore, signPw);

    const alertPlaceholder = document.getElementById('liveAlertSeedPlaceholder')
    const appendAlert = (message, type) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
    }
    bip39.setDefaultWordlist('korean')
    let strRandWords = bip39.generateMnemonic();
    appendAlert(strRandWords, 'success')
    const seed = bip39.mnemonicToSeedSync(strRandWords);
    console.log(seed.toString('hex'));
    const wallet = createSeed(seed);
    wallet.newAddr('BTC');
    wallet.newAddr('ETH');
}

function createSeed(seed){
    const hdkey = HDKey.fromMasterSeed(seed);
    console.log('xprv : '+hdkey.privateExtendedKey);
    console.log('xpub : '+hdkey.publicExtendedKey);
    return hdkey;
}

HDKey.prototype.newAddr = function (coin){
    switch(coin){
        case 'BTC':
            const btcChild = this.derive("m/44'/0'/0'/0/0");
            console.log('btc 1: '+btcChild.privateKey.toString('hex'));
            const btcAddr = bitcoin.payments.p2pkh({pubkey:btcChild.publicKey})
            console.log('btc: '+btcAddr.address);
            break;
        case 'ETH':
            const ethChild = this.derive("m/44'/60'/0'/0/0");
            console.log('eth 1: '+ethChild.privateKey.toString('hex'));
            
            const pubHash = web3.utils.keccak256(ethChild.publicKey);
            
            console.log(ethChild.publicKey.toString('hex'));
            const ethAddr = '0x'+pubHash.substring(pubHash.length-40,);
            console.log('eth: '+ethAddr);
            break
        default:
            console.log('aaaa');
            break
        
    }
}


callFunction();
global.callFunction = callFunction;