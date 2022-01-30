/* Magic Mirror
 * Node Helper: MMM-Chore-Manager
 *
 * By Jordan Welch
 * MIT Licensed.
 */

const fetch = require('node-fetch');
const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({
  socketNotificationReceived(notification, payload) {
    if (notification === 'CM_GET_DATA') {
      const url = `${payload.apiUrl}/teams/${payload.teamId}/chore_groups`;
      const options = {};

      if (payload.apiKey) {
        options.headers = {
          Authorization: `Bearer ${payload.apiKey}`,
          Accept: 'application/json'
        };
      } else {
        options.headers = {
          Accept: 'application/json'
        };
      }

      this.getData(url, options);
    }
  },

  async getData(url, options) {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.error(
        `Fetching chores: ${response.status} ${response.statusText}`
      );

      return;
    }

    const parsedResponse = await response.json();

    this.sendSocketNotification('CM_DATA', parsedResponse);
  }
});
