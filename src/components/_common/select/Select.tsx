import React, {  SelectHTMLAttributes } from 'react';
import styles from "./select.module.css"
import cx from "classnames"
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> { 
    wrapperClassName?:string
    selectClassName?:string
    errorClassName?:string
    options?:{key:string,value:string,disabled?:boolean}[]
    label?: string;
    error?:string
}

const Select: React.FC<SelectProps> = ({ options,label,error,wrapperClassName,selectClassName,errorClassName,...rest }) => {
  return (
    <div className={cx(styles.container,wrapperClassName||"")}>
    {label && <label className={styles.label}> {label} </label>}
    <select className={cx(styles.selectBox,selectClassName||"",error? styles.error:"")} {...rest}>
      {options?.map(option=><option value={option?.key} disabled={option?.disabled}>{option?.value}</option>)}
    </select>
    {error && (
                <p
                   
                    className={cx(styles.errorMessage,errorClassName||"")}
                >
                    {error}
                </p>
            )}
    </div>
  );
};

export default Select;