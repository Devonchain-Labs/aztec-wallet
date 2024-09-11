import React, {  InputHTMLAttributes } from 'react';
import styles from "./value-with-label.module.css"
import cx from "classnames"
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    wrapperClassName?:string
    valueClassName?:string
    labelClassName?:string  
    value?:string|number
}

const ValueWithLabel: React.FC<InputProps> = ({ label,wrapperClassName,valueClassName,labelClassName,value }) => {
  return (
    <div className={cx(styles.container,wrapperClassName||"")}>
        {label && <label className={cx(styles.label,labelClassName||"")} > {label} </label>}          
        <p  className={cx(styles.value,valueClassName||"")} >{value}</p> 
       
    </div>
  );
};

export default ValueWithLabel;