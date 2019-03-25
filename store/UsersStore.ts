import {  Event } from '~/models/Event';
import { UsersService } from '~/services/user';
import { Participant } from '~/models/Participant';
import { UserID } from '~/models/User';

export class UsersStore {
    private usersService: UsersService = new UsersService()
    public  users: Participant[] = [];

    getUser(id: UserID): Participant | UserID {
        const user = this.users.find(u => u._id === id);
        if(!user) console.log('cant find user for '+id);
        return user || id;
    }
    public async populateEventUsers(e: Event) {
        let ps: string[] = [];
        e.participants.forEach((p) => ps.push(p));
        e.actions.forEach(a => {
            if (!ps.find(u => u === a.author) && !this.users.find(u => u._id === a.author)) ps.push(a.author);
        });
        let participants = await this.usersService.fetchMany(ps);
        this.users = [...participants, ...this.users];
        console.log("Cached users: ", ps)
    }
}
