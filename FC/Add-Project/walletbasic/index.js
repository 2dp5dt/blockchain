import Web3 from 'web3'

const web3 = new Web3("http://127.0.0.1:8545")

const account = web3.eth.accounts.create()
console.log("account : ", account)

const privateKey = account.privateKey
const encrypt = web3.eth.accounts.encrypt(privateKey, "password")
const decrypt = web3.eth.accounts.decrypt(encrypt, "password")
console.log(decrypt)

const txResult = await web3.eth.accounts.signTransaction(
    {
        to : "0x4C999f33CE0993777E1D6259F17104666071b5Fd",
        value : '1000',
        gas : 1000,
        gasPrice : 10,
        gasLimit : 1000000,
    },
    privateKey
)
console.log(txResult)