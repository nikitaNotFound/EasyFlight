export default class User {
    firstName;
    secondName;
    email;
    password;
    role;

    constructor (firstName, secondName, email, password, role) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}