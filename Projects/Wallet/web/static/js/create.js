//let web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/b0821e33cc8342e189df1b62485d6d06"));
const Web3 = require('web3');
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
    const seed = bip39.mnemonicToSeedSync(strRandWords).toString('hex')
    createBTCAddr(seed);
}

function createSeed(){
    let rand128 = web3.utils.randomHex(32);
    console.log(rand128);
}

function createBTCAddr(seed){
    const seedEncrypt = CryptoJS.HmacSHA512(seed, '').toString();
    console.log(seed);
    const halfLen256 = 128
    const privKey = seedEncrypt.substring(0,halfLen256)
    const CC = seedEncrypt.substring(halfLen256,halfLen256)
    console.log("priv : "+privKey);
    console.log("CC : "+CC);


    console.log(bitcoinjs);
    const keyPair = bitcoinjs.ECPair.fromWIF(privKey);
    const pubKey = keyPair.publicKey;
    const address = bitcoinjs.payments.p2pkh({pubkey: pubKey});
    console.log(address);
}
function createETHAddr(seed){
    const seedEncrypt = web3.utils.keccak256(seed)
}

let rand128 = web3.utils.randomHex(16);
console.log(rand128);

//let rand128 = web3.eth.accounts.create();
let rand256 = web3.utils.randomHex(32);
console.log(rand256)

let randsha256 = CryptoJS.SHA256(rand128).toString();
console.log(randsha256);

