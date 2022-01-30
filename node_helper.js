/* Magic Mirror
 * Node Helper: MMM-Chore-Manager
 *
 * By Jordan Welch
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');

module.exports = NodeHelper.create({
  // Override socketNotificationReceived method.

  /* socketNotificationReceived(notification, payload)
   * This method is called when a socket notification arrives.
   *
   * argument notification string - The identifier of the noitication.
   * argument payload mixed - The payload of the notification.
   */
  socketNotificationReceived(notification, payload) {
    if (notification === 'MMM-Chore-Manager-NOTIFICATION_TEST') {
      console.log(
        'Working notification system. Notification:',
        notification,
        'payload: ',
        payload
      );
      // Send notification
      this.sendNotificationTest(this.anotherFunction()); // Is possible send objects :)
    }
  },

  // Example function send notification test
  sendNotificationTest(payload) {
    this.sendSocketNotification('MMM-Chore-Manager-NOTIFICATION_TEST', payload);
  },

  // this you can create extra routes for your module
  extraRoutes() {
    const self = this;
    this.expressApp.get('/MMM-Chore-Manager/extra_route', (req, res) => {
      // call another function
      var values = self.anotherFunction();
      res.send(values);
    });
  },

  // Test another function
  anotherFunction() {
    return { date: new Date() };
  }
});
