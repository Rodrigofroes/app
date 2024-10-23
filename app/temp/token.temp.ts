export default class Token {
    private token: string;

    constructor() {
        this.token = '';
    }

    setToken(token: string) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }
}