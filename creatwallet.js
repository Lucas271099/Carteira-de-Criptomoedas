/// importando as dependencias . 

const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')
 
///definir Rede//
// bitcoin rede principal 
//testnet rede de test
const network = bitcoin.networks.testnet

///derivacao da carteira
const path = `m/49'/1'/0'/0`

//criando mnemonic para a seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando raiz da carteira hd
let root = bip32.fromSeed(seed, network)

//criando uma conta par pvt key public
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}),address

console.log("Carteira gerada")
console.log("endereco: ", btcAddress)
console.log("Chave privada:", node.toWIF())
console.log("Seed", bip39.mnemonic)