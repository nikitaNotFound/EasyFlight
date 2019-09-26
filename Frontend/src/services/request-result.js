export default class RequestResult {
    successful;
    value;

    constructor (successful, value) {
        this.successful = successful;
        this.value = value;
    }
}