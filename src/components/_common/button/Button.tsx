import React from 'react';
import styles from "./button.module.css"
interface ButtonProps { 
  onClick: () => void;
  variant?:"primary"|"secondary"
  children?:React.ReactNode
  className?:string
}

const Button: React.FC<ButtonProps> = ({  onClick,variant="primary",className,children }) => {
  return (
    <button className={`${styles.btn} ${styles[variant]} ${className||""}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;