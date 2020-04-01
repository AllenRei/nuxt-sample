import * as ROUTE from '~/api/routes';
// import { ApiClient as api } from '~/api';
import api from '@nuxtjs/axios';

export class TagsService {
  public createTagFor(eventId, data) {
    return api.post(ROUTE.EVENT_TAGS(eventId), data);
  }
}
