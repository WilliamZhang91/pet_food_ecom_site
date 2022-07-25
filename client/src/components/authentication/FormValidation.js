export const checkName = (name) => {
    const removeWhiteSpace = name.trim();
    const nameValidation = /^[a-zA-Z0-9_-]{3,30}$/
    if (nameValidation.test(removeWhiteSpace)) {
        console.log({ name_validation: "passed" });
        return true;
    } else {
        console.log({ name_validation: "failed" });
        return false;
    };
};

export const checkEmail = (email) => {
    const removeWhiteSpace = email.trim();
    const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailValidation.test(removeWhiteSpace)) {
        console.log({ email_validation: "passed" })
        return true;
    } else {
        console.log({ email_validation: "failed" })
        return false;
    };
};

export const checkPassword = (password) => {
    const removeWhiteSpace = password.trim();
    const passwordValidation = /^[a-zA-Z0-9_-]{8,30}$/
    if (passwordValidation.test(removeWhiteSpace)) {
        console.log({ password_validation: "passed" });
        return true;
    } else {
        console.log({ password_validation: "failed" });
        return false;
    };
};

export const checkConfirmPassword = (password) => {
    const removeWhiteSpace = password.trim();
    if (removeWhiteSpace === password) {
        console.log({ confirm_password_validation: "passed" });
        return true
    } else {
        console.log({ confirm_password_validation: "failed" });
        return false;
    };
};