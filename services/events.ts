
import * as ROUTE from '~/api/routes';
// import { ApiClient as api } from '~/api';
import api from '~/api';
import { EventId, Event } from '~/models/Event';
import { ChainedCalculation } from '~/models/Calculation';

interface IInviteResponse {
    code: string;
}
export class EventsService  {
    public createEvent(event: Event, invites = []): Promise<Event> {
        return api.$post(ROUTE.EVENTS, {
            ...event,
            invites
        });
    }

    public getMyEvents(): Promise<Event[]> {
        return api().get(ROUTE.EVENTS).then(res => res.data);
    }

    public editEvent(id, title, description) {
        return api.put(ROUTE.EVENTS, {
            id,
            title,
            description,
        });
    }
    public deleteEvent(id) {
        return api.delete(ROUTE.EVENT_BY_ID(id as EventId));
    }
    public calculateEvent(eventId) {
        return api.$get(ROUTE.EVENT_CALCULATE(eventId));
    }
    public calculateEventLegacy(eventId) : Promise<ChainedCalculation> {
        return api.$get(ROUTE.EVENT_CALCULATE_LEGACY(eventId));
    }
    public getEventById(eventId : EventId): Promise<Event> {
        return api.$get(ROUTE.EVENT_BY_ID(eventId));
    }
    public countEvents() {
        return api.get(ROUTE.EVENT_COUNT);
    }
    public getEventParticipants(eventId) {
        return api.get(ROUTE.EVENT_PARTICIPANTS(eventId));
    }
    public createActionFor(eventId, { type, amount }) {
        return api.post(ROUTE.EVENT_ACTIONS(eventId), {
            type,
            amount,
        });
    }
    public getEventActions(eventId) {
        return api.get(ROUTE.EVENT_ACTIONS(eventId));
    }
    public redeemInvite(code: string) {
        return api.post(ROUTE.REDEEM_INVITE+'?code='+code, { code })
    }
    public generateInvite(eventId: EventId): Promise<IInviteResponse> {
        return api.post(ROUTE.EVENT_INVITE(eventId)).then(res => res.data);
    }
}
