export default class User {
    firstName;
    secondName;
    email;
    role;

    constructor (firstName, secondName, email, role, token) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.email = email;
        this.role = role;
    }
}