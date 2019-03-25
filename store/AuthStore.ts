import { AuthService } from '~/services/auth';
import { Account } from '~/models/Account';
import { auth } from "firebase";

import api from '@nuxtjs/axios';


type IDToken = string;
export class AuthStore {
    public user: Account;
    private authService = new AuthService();

    public async getAuthToken(idToken: IDToken) {
        const { token, user } = await this.authService.authorize(idToken);
        this.user = user;
        return token;
    }
    public async authentication() {
        const provider = new auth.GoogleAuthProvider();
        let result: auth.UserCredential;

        try {
            result = await auth().signInWithPopup(provider);
            console.log(result);
            const token = await this.getAuthToken(
                await this.generateIdToken(),
            );
            this.setToken(token);
        } catch (e) {
            console.warn(e);
        }
    }
    private async generateIdToken(): Promise<IDToken> {
        const cu = auth().currentUser;
        if (cu) {
            return await cu.getIdToken(true);
        } else {
            throw Error('user is not authenticated');
        }
    }

    private setToken(token) {
        localStorage.setItem('token', token);
        api.setToken(token);
    }

    private clearToken() {
        api.setToken(false);
    }
}
