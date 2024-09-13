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
