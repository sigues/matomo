/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { defineAsyncComponent } from 'vue';
import { createAngularJsAdapter } from 'CoreHome';

const AsyncWebsiteTimeDisplay = defineAsyncComponent(() => import('./WebsiteTimeDisplay.vue'));

export default createAngularJsAdapter({
  component: AsyncWebsiteTimeDisplay,
  scope: {
    timezone: {
      angularJsBind: '@',
    },
  },
  directiveName: 'websiteTimeDisplay',
});
