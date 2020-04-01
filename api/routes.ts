
import { EventId } from '~/models/Event';

export const LOGIN = '/auth';

export const GET_ME = `/me`;
export const CHANGE_AVATAR = `/me/avatar`;

export const EVENTS = '/events';
export const EVENT_BY_ID = (id: EventId) => `/events/${id}`;
export const EVENT_INVITE = (id: EventId) => `/events/${id}/invite`;
export const EVENT_ACTIONS = (id: EventId) => `/events/${id}/actions`;
export const EVENT_PARTICIPANTS = (id: EventId) => `/events/${id}/participants`;
export const EVENT_CALCULATE = (id: EventId) => `/events/${id}/calculate`;
export const EVENT_CALCULATE_LEGACY = (id: EventId) => `/events/${id}/calculate-legacy`;
export const EVENT_TAGS = (id: EventId) => `/events/${id}/tags`;
export const EVENT_THREAD = (id: EventId) => `/events/${id}/thread`;
export const EVENT_COUNT = `/events/count`;

export const REDEEM_INVITE = `/invites`;
export const USER_BY_ID = (id: EventId) => `/users/${id}`;
export const GET_USERS = `/users`;
