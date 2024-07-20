const validator = {
    validateEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    validatePassword: (password) => {
        // Check if the password is at least 64 characters long (SHA-256 hash)
        return password?.length === 64;
    },

    validateRequiredField: (field) => {
        return field && field.trim() !== '';
    }
};

module.exports = validator;
