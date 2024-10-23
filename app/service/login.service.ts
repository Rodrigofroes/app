import Api from "../http/api.http"
import Token from "../temp/token.temp";
import { LoginGateway } from "./gateway/login.gateway";

export default class LoginService implements LoginGateway {
    async login(email: string, password: string) {
        try {
            if (email && password) {
                let con = new Api();
                let response = await con.post('auth/login', { email, password });
                if (response.token) {
                    let token = new Token();
                    token.setToken(response.token);
                    console.log(response);
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (e: any) {
            return false;
        }
    }

    async logout() {
        try {
            let con = new Api();
            let response = await con.get('auth/logout', true);
            if (response) {
                return response;
            } else {
                return false;
            }
        } catch (e: any) {
            return false;
        }
    }
}