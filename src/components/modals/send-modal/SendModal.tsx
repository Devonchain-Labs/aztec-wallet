import React, { useState } from "react";
import Modal, { BaseModalProps } from "../../_common/modal/Modal.tsx";
import styles from "./send-modal.module.css"
import ModalHeader from "../../_common/modal-header/ModalHeader.tsx";
import cx from "classnames"
import { Formik } from "formik";
import * as Yup from "yup"
import Button from "../../_common/button/Button.tsx";
import Input from "../../_common/input/Input.tsx";
import Select from "../../_common/select/Select.tsx";
import ValueWithLabel from "../../_common/value-with-label/ValueWithLabel.tsx";
const tabs=['Transactions Details','Transaction Summary']
const sendTransactionSchema=Yup.object().shape({
  currency:Yup.string().required('Required'),
  amount:Yup.number().positive("The  amount must be greather than 0.").required('Required').typeError("The amount must be a number"),
  receiver:Yup.string()?.required("Required")
})
const sendTransactionInitialValues={
  currency:"",
  amount:0,
  receiver:""
}
const currencies=[
  {key:"",value:"Select Currency",disabled:true},
  {key:"ETH",value:"Ethereum"},
  {key:"WBTC",value:"Wrapped Bitcoin"},
  {key:"USDC",value:"USD Coin"},
]


interface SendTransactionProps{
  currency:string,
  amount:number,
  receiver:string
}
const SendModal: React.FC<BaseModalProps> = ({ onClose, isOpen }) => {
  const [step,setStep]=useState(0);
  const [values,setValues]=useState<Partial<SendTransactionProps>>({})

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <div className={styles.container}>
              <ModalHeader onClose={onClose} title="Send">
              </ModalHeader>
              <div className={styles.content}>
                <div className={styles.tabsContainer}>                 
                    {tabs?.map((item,index)=>( 
                      <div key={item} className={cx(styles.tabWrapper ,index===step ? styles.open :'')}> 
                        <p>{item}</p>
                      </div>))}
                      </div>
                    {step===0 ?
                     
                        <Formik
                        initialValues={sendTransactionInitialValues}
                              onSubmit={(values,actions)=>{
                                console.log(values)
                                setValues(values)
                                setStep(1)
                                actions?.setSubmitting(false)
                              }}
                              validationSchema={sendTransactionSchema}
                              validateOnChange={false}>
                          {props=>(
                          <form onSubmit={props?.handleSubmit} className={styles.sendForm}>
                            <Select label="Currency:" value={props?.values?.currency} onChange={props.handleChange} options={currencies}  id="currency" error={props?.errors?.currency} selectClassName={styles.selectClassName}>                       
                            </Select>
                            <Input       
                              type="number"                                                  
                              value={props?.values?.amount}
                              onChange={props.handleChange}
                              label="Amount:"                         
                              error={props?.errors?.amount}
                              id="amount"                              
                            />
                            <Input
                              type="text"
                              value={props?.values?.receiver}
                              onChange={props.handleChange}
                              id="receiver"
                              label="Receiver Address:"                             
                            />
                            <Button variant='primary' type="submit" className={styles.trBtn}>Transaction Summary</Button>
                        </form>)}
                          
                        </Formik>                     
                    :null}
                    {step===1 ?<div className={styles.summaryContainer}>
                      <ValueWithLabel label="Currency:" value={currencies?.find(item=>item.key==values?.currency)?.value}/>
                      <ValueWithLabel label="Amount:" value={values?.amount}/>
                      <ValueWithLabel label="Receiver Address:" value={values?.receiver}/>
                      <ValueWithLabel label="Fee:" value={"ceva mock aici"}/>
                      <Button variant='primary'  className={styles.trBtn} onClick={()=>setStep(2)}>Confirm</Button>
                      <Button variant='secondary'  className={styles.trBtn} onClick={()=>setStep(0)}>Back</Button>
                    </div>:null}
                    {step===2 ? <div className={styles.successWrapper}> <h1 className={styles.successMessage}>Success!</h1></div> : null}
                </div>
              
            </div>
        </Modal>
    );
};
export default SendModal;
