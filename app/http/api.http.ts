import axios from 'axios';
import Token from '../temp/token.temp';

let token = new Token();

export default class Api {
    private url: string;
    private token: string;

    constructor() {
        this.url = 'http://localhost:3000';
        this.token = token.getToken();
    }

    async get(path: string, token: boolean = false) {
        let response = await axios.get(`${this.url}/${path}`, {
            headers: {
                Authorization: token ? `Bearer ${this.token}` : ''
            }
        });

        if (response.status === 200) {
            return response.data;
        }

        return false;
    }

    async post(path: string, data: object, token: boolean = false) {
        let response = await axios.post(`${this.url}/${path}`, data, {
            headers: {
                Authorization: token ? `Bearer ${this.token}` : ''
            }
        });

        if (response.status === 200) {
            return response.data;
        }

        return false;
    }
}