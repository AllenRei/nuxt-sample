import { AuthStore } from './AuthStore'
import { AccountStore } from './AccountStore';
import { EventStore } from './EventsStore';
import { UsersStore } from './UsersStore';

export class AppState {
    public authStore = new AuthStore();
    public accountStore = new AccountStore;
    public eventsStore = new EventStore();
    public usersStore = new UsersStore();
}
