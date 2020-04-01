import Firebase from 'firebase';
import VueFire from 'vuefire';
import Vue from 'vue';

import { firebaseConfig } from '~/config';

if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig);
}

Vue.use(VueFire);
