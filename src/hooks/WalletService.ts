import * as bip39 from '@scure/bip39';
import { wordlist } from '@scure/bip39/wordlists/english';
import { ec as EC } from 'elliptic';
import { getEcdsaKAccount, getEcdsaKWallet } from '@aztec/accounts/ecdsa';
import { getSchnorrAccount, getSchnorrWallet } from '@aztec/accounts/schnorr';
import { 
    AccountWallet, 
    AztecAddress, 
    ContractArtifact, 
    ExtendedNote, 
    Fr, 
    FunctionSelector, 
    GrumpkinScalar, 
    Note, 
    Tx, 
    TxHash 
} from '@aztec/aztec.js';
import pxe from './PXEService.ts';
import { deriveSigningKey } from '@aztec/circuits.js';
import { SimulatedTx } from '@aztec/circuit-types';
import { FunctionType, type NoteSelector } from '@aztec/foundation/abi';
import { TokenContract, TokenContractArtifact } from '@aztec/noir-contracts.js/Token';
import { Fr as FieldFr } from '@aztec/foundation/fields';
import { addPendingTransaction } from './TransactionService.ts';


const ec = new EC('secp256k1');

export const generateMnemonic = (): { mnemonic: string, keyPair: { publicKey: string, privateKey: string } } => {
    // Generate a random mnemonic using bip39
    const mnemonic = bip39.generateMnemonic(wordlist, 256);

    // Derive seed from mnemonic
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    // Generate ECDSA key pair from seed
    const key = ec.genKeyPair({ entropy: seed });
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');

    return {
        mnemonic,
        keyPair: {
            publicKey,
            privateKey
        }
    };
};

export const recoverFromMnemonic = (mnemonic: string): { publicKey: string, privateKey: string } => {
    // Derive seed from mnemonic
    const seed = bip39.mnemonicToSeedSync(mnemonic);

    // Generate ECDSA key pair from seed
    const keyPair = ec.genKeyPair({ entropy: seed });
    const publicKey = keyPair.getPublic(true, 'hex');
    const privateKey = keyPair.getPrivate('hex');

    return {
        publicKey,
        privateKey
    };
}


export const generateAccountWallet = async (privateKey: string): Promise<AccountWallet> => {
    const secretKey: Fr = Fr.random();
    const salt = Fr.random();
    console.log('Secret key:', privateKey);
    let account;
    let wallet;
   
    account = await getEcdsaKAccount(
        pxe, 
        secretKey, 
        Buffer.from(privateKey, 'hex'),
        salt);
    console.log('Account:', account);
    wallet = await account.register();
    const txRecipt = await account.deploy().wait();
    console.log('Transaction receipt:', txRecipt);
    

    console.log('After generating wallet');
    
    return wallet;
}

export const generateSchnorrAccountWallet = async (): Promise<AccountWallet> => {

    const secretKey = Fr.random();
    const salt = Fr.random();
    const schnorrAccount = await getSchnorrAccount(pxe, secretKey, deriveSigningKey(secretKey), salt);
    const wallet = await schnorrAccount.register();
    const txReceipt = await schnorrAccount.deploy().wait();

    console.log('Schnorr account wallet:', wallet);
    console.log('Transaction receipt:', txReceipt);

    return wallet;
}

export const getAccountWallet = async (publicKey: string, privateKey: string): Promise<AccountWallet> => {
    const privateKeyBuffer = Buffer.from(privateKey, 'hex');
    const aztecAddress = AztecAddress.fromString(publicKey);
    const aztecWallet: AccountWallet = await getEcdsaKWallet(pxe, aztecAddress, privateKeyBuffer);

    return aztecWallet;
}

export const getAccountWalletSchnorr = async (publicKey: string, privateKey: string): Promise<AccountWallet> => {
    const privateKeyBuffer = GrumpkinScalar.fromString(privateKey);
    const aztecAddress = AztecAddress.fromString(publicKey);
    const aztecWallet: AccountWallet = await getSchnorrWallet(pxe, aztecAddress, privateKeyBuffer);

    return aztecWallet;

}

export const setWallet = (publicKey: string, privateKey: string) => {
    localStorage.setItem("public", publicKey);
    localStorage.setItem("private", privateKey);
}

export const getWallet = async (): Promise<AccountWallet> => {
    const publicKey = localStorage.getItem("public");
    const privateKey = localStorage.getItem("private");
    if (!publicKey || !privateKey) {
        throw new Error('No wallet found in cache');
    }
    
    const wallet = await getAccountWallet(publicKey, privateKey);
    
    return wallet;
}

// API

export const simulateTransactionPublic = async (name: string, to: string, selector: FunctionSelector, args: Fr[]): Promise<SimulatedTx> => {
    let simulation;

    const contractAddress = AztecAddress.fromString(to);

    const wallet = await getWallet();

    const tx_request = await wallet.createTxExecutionRequest({calls: [{
        name: name,
        to: contractAddress,
        selector: selector,
        type: FunctionType.PUBLIC,
        isStatic: true,
        args: args,
        returnTypes: []
    }]});

    simulation = await wallet.simulateTx(tx_request, true);

    return simulation;
}

export const provePrivateTransaction = async (name: string, to: string, selector: FunctionSelector, args: Fr[]): Promise<Tx> => {
    const contractAddress = AztecAddress.fromString(to);
    const wallet = await getWallet();

    const tx_request = await wallet.createTxExecutionRequest({calls: [{
        name: name,
        to: contractAddress,
        selector: selector,
        type: FunctionType.PRIVATE,
        isStatic: false,
        args: args,
        returnTypes: []
    }]});

    const transaction = await wallet.proveTx(tx_request, true);

    return transaction;
}

// ------------------------------------------------

// UI

export const sendPublicTransaction = async (tx: Tx): Promise<TxHash> => {
    const wallet = await getWallet();
    const transactionHash = await wallet.sendTx(tx);
    addPendingTransaction(transactionHash);
    return transactionHash;
}

export const createPublicTransaction = async (contractAddress: string, methodName: string, contractArtifact: ContractArtifact, args: any[]): Promise<TxHash> => {
    const constructorArtifact = contractArtifact.functions.find((fn: { name: string; }) => fn.name == methodName);
    if (!constructorArtifact) {
        throw new Error('No constructor found in the StatefulTestContract artifact. Does it still exist?');
    }
    
    const fn_selector  = FunctionSelector.fromNameAndParameters(constructorArtifact.name, constructorArtifact.parameters);
    const args_buffer = args.map((arg) => Fr.fromString(arg));
    const simualtion = await simulateTransactionPublic(methodName, contractAddress, fn_selector, args_buffer);
    const tx_hash = await sendPublicTransaction(simualtion.tx);

    return tx_hash;
}

export const createPrivateTransaction = async (contractAddress: string, methodName: string, contractArtifact: ContractArtifact, args: any[]): Promise<Tx> => {
    const constructorArtifact = contractArtifact.functions.find((fn: { name: string; }) => fn.name == methodName);
    if (!constructorArtifact) {
        throw new Error('No constructor found in the StatefulTestContract artifact. Does it still exist?');
    }
    
    const fn_selector  = FunctionSelector.fromNameAndParameters(constructorArtifact.name, constructorArtifact.parameters);
    const args_buffer = args.map((arg) => Fr.fromString(arg));
    const tx = await provePrivateTransaction(methodName, contractAddress, fn_selector, args_buffer);

    return tx;
}

export const getBalance = async (tokenAddress: string): Promise<number> => {
    const wallet = await getWallet();
    console.log("Registered accounts:", await wallet.getRegisteredAccounts());
    const constructorArtifact = TokenContractArtifact.functions.find((fn: { name: string; }) => fn.name == "balance_of_public");
    if (!constructorArtifact) {
        throw new Error('No constructor found in the StatefulTestContract artifact. Does it still exist?');
    }
    
    const fn_selector  = FunctionSelector.fromNameAndParameters(constructorArtifact.name, constructorArtifact.parameters);
    const args_buffer = Fr.fromString(wallet.getAddress().toString());
    console.log("Token address:", tokenAddress);
    const simulation = await simulateTransactionPublic("balance_of_public", tokenAddress, fn_selector, [args_buffer]);
    simulation.publicOutput?.publicReturnValues.forEach((value) => {
        console.log('Value:', value);
    });

    return 0;
}

export const addPendingShieldNoteToPXE = async (constractAddress: string, amount: number, secretHash: Fr, txHash: TxHash) => {
    const wallet = await getWallet();
    const contractAddressAztec = AztecAddress.fromString(constractAddress);
    let note = new Note([new Fr(amount), secretHash]);
    const slot = TokenContract.storage.pending_shields.slot;
    const extendedNote = new ExtendedNote(
        note,
        wallet.getAddress(),
        contractAddressAztec,
        slot as unknown as FieldFr,
        TokenContract.notes.TransparentNote.id as unknown as NoteSelector,
        txHash
    );

    await wallet.addNote(extendedNote);
}
