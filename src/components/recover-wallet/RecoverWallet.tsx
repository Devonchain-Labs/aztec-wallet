/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import  { getAccountWalletSchnorr, recoverFromMnemonic, setWallet } from '../../hooks/WalletService.ts';
import styles from "./recover-wallet.module.css"
import Button from '../_common/button/Button.tsx';
import Input from '../_common/input/Input.tsx';
import {Formik,}from "formik"
import * as Yup from 'yup';
interface RecoverWalletProps {
  onProceed: () => void;
}

const RecoverWalleetSchema=Yup.object().shape({
  mnemonic:Yup.string().required('Required')
})
const RecoverWallet: React.FC<RecoverWalletProps> = ({ onProceed }) => {
  const handleSubmit = async (values:any) => {   
    const keyPair = recoverFromMnemonic(values?.mnemonic);
    console.log('Recovered key pair:', keyPair);
    // TODO: Save the key pair in a local DB
    const accountWallet = await getAccountWalletSchnorr(keyPair.publicKey, keyPair.privateKey);
    setWallet(keyPair.publicKey, keyPair.privateKey);
    console.log('Recovered account wallet:', accountWallet);
    onProceed();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Recover Wallet</h2>
      <Formik  
      initialValues={{
        mnemonic: ''
      }} 
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSubmit={(values,_actions)=>{
        handleSubmit(values)
      }}
      validationSchema={RecoverWalleetSchema}
      validateOnChange={false}
      >
        {props=><form onSubmit={props?.handleSubmit} className={styles.recoverForm}>        
        <Input label='Mnemonic:' type="text" id="mnemonic" inputClassName={styles.input}  value={props.values.mnemonic}
            onChange={props.handleChange} error={props.errors.mnemonic}/>
        <Button variant='primary' type="submit">Recover</Button>
      </form>}
      </Formik>
      
    </div>
  );
};

export default RecoverWallet;