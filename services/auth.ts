
import * as ROUTE from '~/api/routes'
// import { ApiClient as api } from '~/api';
import api from '@nuxtjs/axios';
import { Account } from '~/models/Account';

interface IAuthResponse {
    token: string;
    user: Account;
}
export class AuthService {
    authorize(idToken: string) : Promise<IAuthResponse> {
        return api.post(ROUTE.LOGIN, { token: idToken }).then(res => res.data);
    }
}
