export default class RequestResult {
    successful;
    bodyContent;

    constructor (successful, bodyContent) {
        this.successful = successful;
        this.bodyContent = bodyContent;
    }
}