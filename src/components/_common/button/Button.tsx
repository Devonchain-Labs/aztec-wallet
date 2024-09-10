import React, { ButtonHTMLAttributes } from 'react';
import styles from "./button.module.css"
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { 
  onClick?: () => void;
  variant?:"primary"|"secondary"
  children?:React.ReactNode
  className?:string
}

const Button: React.FC<ButtonProps> = ({  onClick,variant="primary",className,children,...rest }) => {
  return (
    <button className={`${styles.btn} ${styles[variant]} ${className||""}`} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;