/* Magic Mirror
 * Node Helper: MMM-Chore-Manager
 *
 * By Jordan Welch
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({
  socketNotificationReceived(notification, payload) {
    if (notification === 'CM_GET_DATA') {
      const url = `${payload.api_url}/teams/${payload.team_id}/chore_groups`;
      const options = {};

      if (payload.api_key) {
        options.headers = { Authorization: `Bearer ${payload.api_key}` };
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

    this.sendSocketNotification('DATA', parsedResponse);
  }
});
