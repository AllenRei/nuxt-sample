
import * as ROUTE from '~/api/routes';

// import { ApiClient as api } from '~/api';
import api from '@nuxtjs/axios';
import { EventId } from '~/models/Event';
import { Action } from '~/models/Action';

export class ActionsService {
    createActionFor(eventId : EventId, { amount }: Action): Promise<Action> {
        return api.post(ROUTE.EVENT_ACTIONS(eventId), {
            type: 2,
            amount,
            // comment,
        }).then(res => res.data);
    }

    getEventActions(eventId): Promise<Action> {
        return api.get(ROUTE.EVENT_ACTIONS(eventId)).then(res => res.data);
    }
}
