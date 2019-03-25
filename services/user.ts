
import * as ROUTE from '~/api/routes';
// import { ApiClient as api } from '~/api';
import api from '@nuxtjs/axios';
import { UserID } from '~/models/User';
import { Participant } from 'models/Participant';

export class UsersService {
    public fetchMany(users: UserID[]): Promise<Participant[]> {
        return api.post(ROUTE.GET_USERS, { users }).then(res => res.data);
    }
}
