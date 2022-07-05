var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const validateEmail = (email) => {
    if (!email) return 'Please enter your email address';
    else if (!email.match(mailFormat)) return 'Email address is not valid';
    else return '';
}

export const validatePassword = (password) => {
    if (!password) return 'Please enter your password';
    else if (password.length < 6) return 'Password must be at least 6 characters';
    else return '';
}
