import React from "react";
import styles from "./typography.module.css";
import cx from "classnames";
export interface TypographyProps {
    className?: string;
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    children: React.ReactNode;
    size?: "xs" | "sm" | "md" | "lg";
    color?: "primary" | "secondary" | "aztec-button-color";
    weight?:
        | "w-100"
        | "w-200"
        | "w-300"
        | "w-400"
        | "w-500"
        | "w-600"
        | "w-700"
        | "w-800"
        | "w-900";
}

const Typography: React.FC<TypographyProps> = ({
    className,
    variant = "p",
    children,
    size = "md",
    color = "primary",
    weight = "w-400",
}) => {
    const Tag = variant;
    return (
        <Tag
            className={cx(
                styles.typography,
                className,
                styles[size],
                styles[color],
                styles[weight],
            )}
        >
            {children}
        </Tag>
    );
};

export default Typography;
