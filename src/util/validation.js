const isValidEmail = function(value) {
    return /^[\w\.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,}$/
    .test(value);
}

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };

  const isValidMobile = function (input) {
    return /^\d{10}$/.test(input);
};

const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    return passwordRegex.test(password);
};

const isValidPrice = function (value) {
    return /^\d+(\.\d+)?$/.test(value);
}

const isValidInstallment = function (value) {
    return /^\d+$/.test(value);
}

module.exports = {isValid,isValidEmail,isValidMobile,isValidPassword,isValidPrice,isValidInstallment}