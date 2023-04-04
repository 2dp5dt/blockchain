//let web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/b0821e33cc8342e189df1b62485d6d06"));
let web3 = new Web3();
let sha25

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
    let password = document.getElementById("createWallet").value;
    console.log(password);

    let createAddress = web3.eth.accounts.create();
    console.log("Address :\n"+createAddress.address+"\nPrivateKey :\n"+createAddress.privateKey);

    let keystore = createAddress.encrypt(password);
    console.log("keystore :\n", keystore);

    let privatekey = web3.eth.accounts.decrypt(keystore, password);
    console.log("Account :\n", privatekey);
}

function createSeed(){
    let rand128 = web3.utils.randomHex(32);
    console.log(rand128);
}

let rand128 = web3.utils.randomHex(16);
console.log(rand128);

//let rand128 = web3.eth.accounts.create();
let rand256 = web3.utils.randomHex(32);
console.log(rand256)

let randsha256 = CryptoJS.SHA256(rand128).toString();
console.log(randsha256);

