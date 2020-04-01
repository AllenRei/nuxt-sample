
import * as ROUTE from '~/api/routes';
// import { ApiClient as api } from '~/api';
import api from '@nuxtjs/axios';
import { Account } from '~/models/Account';

export class ProfileService {
    public getMe(): Promise<Account> {
        return api.get(ROUTE.GET_ME).then(res => res.data);
    }
    public changeProfilePicture(picture) {
        const fd = new FormData();
        fd.append('picture', picture);
        return api.post(ROUTE.CHANGE_AVATAR, fd, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }
}
