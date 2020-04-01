import { Event } from '~/models/Event';
import { EventsService } from '~/services/events';
import { EventId } from '~/models/Event';

export class EventsStore {
    public events: Event[] = [];

    private eventService = new EventsService();

    public get eventsList(): Event[] {
        return this.events;
    }

    public async fetchEvents() {
        this.events = await this.eventService.getMyEvents();
        return this.events;
    }

    public async getEvent(id: EventId): Promise<Event> {
         let e = this.events.find((e: Event) => e._id == id);
         if(e) return e;
         return this.eventService.getEventById(id);
    }

    public async create(e: Event) {
        const newEvent = await this.eventService.createEvent(e);
        this.events.push(newEvent);
    }

    public async redeemInvite(code: string) {
        return await this.eventService.redeemInvite(code);
    }
}
