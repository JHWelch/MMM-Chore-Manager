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

  getTemplate() {
    return 'templates/MMM-Chore-Manager.njk';
  },

  getTemplateData() {
    return {
      chores: this.chores.past_due.concat(this.chores.today),
      loading: this.loading
    };
  },

  getScripts() {
    return [];
  },

  getStyles() {
    return ['MMM-Chore-Manager.css'];
  },

  getTranslations() {
    return {
      en: 'translations/en.json',
      es: 'translations/es.json'
    };
  },

  socketNotificationReceived(notification, payload) {
    if (notification === 'CM_DATA') {
      this.chores = payload.data;
      this.loading = false;
      this.updateDom(300);
    }
  }
});
