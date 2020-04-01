import { AppState } from '~/store/AppState';
const state = new AppState()
export default function ({ app }, inject) {
    inject('ctx', state);
}