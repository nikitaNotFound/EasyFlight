export default class User {
    id;
    name;
    email;
    password;
    role;

    constructor (id, name, email, password, role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}