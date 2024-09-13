export const getStatusClassName = (status: string) => {
    switch (status) {
        case "failed":
            return "colorError";
        case "success":
            return "colorSuccess";
        case "pending":
            return "colorWarning";
        default:
            return "colorNormal";
    }
};
export const truncate = (inputStr: string, length: number, separator?: string): string => {
    if (inputStr.length <= length) return inputStr;

    separator = separator || "...";

    return inputStr.substring(0, length) + separator + inputStr.substring(inputStr.length - 4);
};
