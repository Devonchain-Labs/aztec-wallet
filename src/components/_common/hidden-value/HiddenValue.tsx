import React, { useState } from 'react';
import styles from "./hidden-value.module.css"
import cx from "classnames"
import EyeIconSlash from '../icons/EyeIconSlash.tsx';
import EyeIcon from '../icons/EyeIcon.tsx';
export interface InputProps {
    hiddenValue?:string
    valueClassName?:string
    value?:string|number
    wrapperClassName?:string
    iconClassName?:string
}

const HiddenValue: React.FC<InputProps> = ({valueClassName,value,hiddenValue,wrapperClassName,iconClassName }) => {
    const [isHidden,setIsHidden]=useState(true)
  return (     
        <div className={cx(styles.wrapper,wrapperClassName||"")}><p  className={cx(styles.value,valueClassName||"")} >
            {isHidden ? hiddenValue : value}</p> 
            {isHidden  ?<EyeIconSlash onClick={()=>setIsHidden(prev=>!prev)}  className={cx(styles.icon,iconClassName||"")}/> :
            <EyeIcon onClick={()=>setIsHidden(prev=>!prev)} className={cx(styles.icon,iconClassName||"")}/>}</div>
       );
};

export default HiddenValue;