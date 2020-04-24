const emailBtn = document.querySelector('.button-email');
const mobileBtn = document.querySelector('.button-mobile');

const signup = document.querySelector('.signup');
const backdrop = document.querySelector('.backdrop');
const exit = document.querySelector('.signup__exit');

const inputLabel = document.querySelector('.registration__label');
const input = document.querySelector('.registration__input');

const infoText = document.querySelector('.information--input');
const currencyText = document.querySelector('.information--currency');
const termsText = document.querySelector('.information--terms');

const paragraph = document.querySelector('.form__information');

const spinner = document.querySelector('.spinner');

let emailValidation;
let validInput;

function validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    return regex.test(String(email).toLowerCase());
}

function validatePhoneNumber(number) {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,8}$/;
    return regex.test(number);
}

function checkInput(valid) {
    if(!valid) {
        input.classList.add('invalid');
        inputLabel.classList.add('invalid');
    } else {
        input.classList.remove('invalid');
        inputLabel.classList.remove('invalid');
    }
}

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function setupUI(name) {
    input.setAttribute('name', name);
    const value = capitalizeFirstLetter(name);
    inputLabel.textContent = `${value}`;
    infoText.textContent = `${value}` == 'Email' ? 'Email is required!' : 'Phone number is required!';
}

function handleInput(e) {
    infoText.classList.remove('invalid');
    if (emailValidation) {
        infoText.textContent = 'Email is required.';
        validInput = validateEmail(e.target.value);
        checkInput(validInput);
    } else {
        infoText.textContent = 'Phone number is required.';
        validInput = validatePhoneNumber(e.target.value);
        checkInput(validInput);
    }

    if(e.target.value.length === 0) {
        input.classList.remove('invalid');
        inputLabel.classList.remove('invalid');
    }
}

function handleRegistration() {
    signup.classList.add('signup--active');
    backdrop.classList.add('backdrop--active');

    if (emailValidation) {
        setupUI('email');
    } else {
        setupUI('phone');
    }
}

const register = value => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
    
            if(value === 'vlada@test.com') {
                reject('Account is already in use! Please go to login page.');
            } else if (value === '0641234567') {
                reject('Account is already in use! Please go to login page.');
            } else {
                resolve('You have successfully created account. Proceed to login page!');
            }
    
        }, randomIntFromInterval(1000, 3000))

    })
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random()*(max - min) + min);
}

function handleSubmit(e) {
    e.preventDefault();
    const value = input.value;
    const currency = document.querySelector('input[name="currency"]:checked');
    const terms = document.querySelector('input[name="terms"]:checked');

    if(!validInput && emailValidation) {
        infoText.classList.add('invalid');
        infoText.textContent = 'Please enter valid email address!';
        input.focus();
        return;
    } else if (!validInput && !emailValidation) {
        infoText.classList.add('invalid');
        infoText.textContent = 'Please enter valid phone number!';
        input.focus();
        return;
    } else if (currency == null) {
        currencyText.classList.add('invalid');
        currencyText.textContent = 'Please select currency!';
        return;
    } else if (terms == null) {
        termsText.classList.add('invalid');
        termsText.textContent = 'Please check that you agree with terms and conditions!';
        return;
    } else {
        spinner.classList.add('active');
        register(value).then((data) => {
            spinner.classList.remove('active');
            paragraph.textContent = data;
            paragraph.classList.add('success');
            document.registration.reset();
        }).catch((err) => {
            spinner.classList.remove('active');
            paragraph.textContent = err;
            paragraph.classList.add('invalid');
            document.registration.reset();
        })
        currencyText.classList.remove('invalid');
        currencyText.textContent = 'Select currency.';
        termsText.classList.remove('invalid');
        termsText.textContent = '';
    }
}

function handleBackdrop() {
    signup.classList.remove('signup--active');
    backdrop.classList.remove('backdrop--active');
}

emailBtn.addEventListener('click', () => {
    emailValidation = true;
    handleRegistration();
});
mobileBtn.addEventListener('click', () => {
    emailValidation = false;
    handleRegistration();
});

input.addEventListener('keyup', handleInput);

document.registration.addEventListener('submit', handleSubmit);

backdrop.addEventListener('click', handleBackdrop);
exit.addEventListener('click', handleBackdrop);