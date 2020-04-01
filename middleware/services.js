import { AppState } from '~/store/AppState';
const state = new AppState()
export default function (context) {
    context.$state = state
}
