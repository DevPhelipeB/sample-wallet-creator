const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Declaring network (use bitcoin.networks.bitcoin for mainnet)
const network = bitcoin.networks.testnet;

// HD Wallet path for SegWit-compatible wallets
const path = `m/49'/1'/0'/0`; // 1 indicates testnet in the path

// Generate mnemonic and seed
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Derive root from seed and network
let root = bip32.fromSeed(seed, network);

// Derive account from root at the specified path
let account = root.derivePath(path);
let node = account.derive(0).derive(0); // deriving the first address

// Generate a SegWit-compatible P2SH address for testnet
let { address: bitcoinAddress } = bitcoin.payments.p2sh({
    redeem: bitcoin.payments.p2wpkh({
        pubkey: node.publicKey,
        network: network,
    }),
});

console.log(":: Generated wallet ::");
console.log("Address: ", bitcoinAddress);
console.log("Private Key: ", node.toWIF());
console.log("Seed: ", mnemonic);