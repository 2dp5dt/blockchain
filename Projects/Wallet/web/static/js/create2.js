//let web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/b0821e33cc8342e189df1b62485d6d06"));
const Web3 = require('web3');
const crypto = require('crypto');
const bip39 = require('bip39');
const bitcoinjs = require('bitcoinjs-lib');
const {ECPairInterface, ECPairFactory, ECPairAPI, tinySecp256k1Interface} = require('ecpair');
const tinysecp = require('tiny-secp256k1');
const bs58check = require('bs58check');
const pbkdf2 = require('pbkdf2');
const web3 = new Web3();


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
    createBTCAddr(seed);
}

function encPw(password) {
    const pw = password;
    const salt = crypto.randomBytes(32);
    const iter = 100000;
    const keyLen = 64;
    const result = pbkdf2.pbkdf2Sync(pw, salt, iter, keyLen, 'sha512');
    console.log(result.toString('hex'));
    return result;
}

function createBTCAddr(seed){
    // const seedEncrypt = CryptoJS.HmacSHA512(seed, '').toString();
    const key = encPw('');
    const seedEncrypt = crypto.createHmac('sha512',key).update(seed).digest();
    console.log('seedEncrypt : '+seedEncrypt.toString('hex'));
    const half = seedEncrypt.length/2;
    const privKey = seedEncrypt.slice(0,half)
    const CC = seedEncrypt.slice(half);

    console.log("priv : "+privKey.toString('hex'));
    console.log("CC : "+CC.toString('hex'));

    const ECPair = ECPairFactory(tinysecp);
    const encoded = ECPair.fromPrivateKey(privKey).toWIF();
    console.log(encoded);
    const keyPair = ECPair.fromWIF(encoded);
    const pubKey = keyPair.publicKey;
    // const address = bitcoinjs.payments.p2pkh({pubkey: pubKey});
    console.log('pubkey: '+pubKey.toString('hex'));

    const compPubKey = ECPair.fromPublicKey(pubKey).publicKey;
    const address = bitcoinjs.payments.p2pkh({pubkey: compPubKey}).address;

    console.log('BTC address : '+address);
}
function createETHAddr(seed){
    const seedEncrypt = web3.utils.keccak256(seed)
}

console.log("pbkdf2 : ");
encPw('wjdgur23');

bip39.setDefaultWordlist('korean')
const strRandWords = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(strRandWords).toString('hex')
createBTCAddr(seed);
