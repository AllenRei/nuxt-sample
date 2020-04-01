import { AuthStore } from './AuthStore'
import { AccountStore } from './AccountStore';
import { EventsStore } from './EventsStore';
import { UsersStore } from './UsersStore';

export class AppState {
    public authStore = new AuthStore();
    public accountStore = new AccountStore;
    public eventsStore = new EventsStore();
    public usersStore = new UsersStore();
}
