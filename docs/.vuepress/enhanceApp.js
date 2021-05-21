import VueCompositionAPI from '@vue/composition-api';
import I18nDateComponent from './components/I18nDateComponent.vue';
import ToggleDarkMode from './components/ToggleDarkMode.vue';

import './public/style/main.css';
import './plugins/dayjs.js';

export default ({ Vue }) => {
  Vue.use(VueCompositionAPI);
  Vue.component('I18nDateComponent', I18nDateComponent);
  Vue.component('ToggleDarkMode', ToggleDarkMode);
};
