import { ProfileService } from '~/services/profile';
import { Account } from '~/models/Account';

export class AccountStore {
    public account: Account;
    private profileService = new ProfileService();

    public async getAccountInfo() {
        this.account = await this.profileService.getMe();
    }
    get isAuthenticated() {
        return !!localStorage.getItem('token');
    }
}
