export default class RegistrationUser {
    firstName;
    secondName;
    email;
    password;

    constructor (firstName, secondName, email, password) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
        this.password = password;
    }
}