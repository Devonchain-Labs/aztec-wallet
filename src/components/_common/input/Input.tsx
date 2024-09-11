import React, {  InputHTMLAttributes } from 'react';
import styles from "./input.module.css"
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    wrapperClassName?:string
    inputClassName?:string
    errorClassName?:string
    id?:string
    error?:string
}

const Input: React.FC<InputProps> = ({ id,label,error,wrapperClassName,inputClassName,errorClassName,...rest }) => {
  return (
    <div className={`${styles.container} ${wrapperClassName||""}`}>
        {label && <label className={styles.label} htmlFor={id}> {label} </label>}          
        <input id={id} className={`${styles.input} ${error? styles.error:""} ${inputClassName||""}`}{...rest}  /> 
        {error && (
                <p
                   
                    className={`${styles.errorMessage} ${errorClassName||""}`}
                >
                    {error}
                </p>
            )}
    </div>
  );
};

export default Input;