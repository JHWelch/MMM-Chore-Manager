/* global Module */

/* Magic Mirror
 * Module: MMM-Chore-Manager
 *
 * By Jordan Welch
 * MIT Licensed.
 */

Module.register('MMM-Chore-Manager', {
  defaults: {
    updateInterval: 60000,
    retryDelay: 5000
  },

  requiresVersion: '2.2.0', // Required version of MagicMirror

  loading: true,

  start() {
    Log.info(`Starting module: ${this.name}`);
    const self = this;

    this.getData();

    setInterval(() => {
      self.getData();
    }, this.config.updateInterval);
  },

  getData() {
    this.sendSocketNotification('CM_GET_DATA', {
      apiUrl: this.config.apiUrl,
      apiKey: this.config.apiKey,
      teamId: this.config.teamId
    });
  },

  /* scheduleUpdate()
   * Schedule next update.
   *
   * argument delay number - Milliseconds before next update.
   *  If empty, this.config.updateInterval is used.
   */
  scheduleUpdate(delay) {
    let nextLoad = this.config.updateInterval;
    if (typeof delay !== 'undefined' && delay >= 0) {
      nextLoad = delay;
    }

    const self = this;
    setTimeout(() => {
      self.getData();
    }, nextLoad);
  },

  getDom() {
    // create element wrapper for show into the module
    const wrapper = document.createElement('div');
    // If this.dataRequest is not empty
    if (this.dataRequest) {
      const wrapperDataRequest = document.createElement('div');
      // check format https://jsonplaceholder.typicode.com/posts/1
      wrapperDataRequest.innerHTML = this.dataRequest.title;

      const labelDataRequest = document.createElement('label');
      // Use translate function
      //             this id defined in translations files
      labelDataRequest.innerHTML = this.translate('TITLE');

      wrapper.appendChild(labelDataRequest);
      wrapper.appendChild(wrapperDataRequest);
    }

    // Data from helper
    if (this.dataNotification) {
      const wrapperDataNotification = document.createElement('div');
      // translations  + datanotification
      wrapperDataNotification.innerHTML =
        this.translate('UPDATE') + ': ' + this.dataNotification.date;

      wrapper.appendChild(wrapperDataNotification);
    }
    return wrapper;
  },

  getScripts() {
    return [];
  },

  getStyles() {
    return ['MMM-Chore-Manager.css'];
  },

  // Load translations files
  getTranslations() {
    // FIXME: This can be load a one file javascript definition
    return {
      en: 'translations/en.json',
      es: 'translations/es.json'
    };
  },

  socketNotificationReceived(notification, payload) {
    if (notification === 'CM_DATA') {
      // Set local variables from payload
      this.chores = payload.data;
      this.loading = false;
      this.updateDom(300);
    }
  }
});
