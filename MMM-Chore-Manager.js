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

  requiresVersion: '2.1.0', // Required version of MagicMirror

  start() {
    const self = this;
    // const dataRequest = null;
    // const dataNotification = null;

    // Flag for check if module is loaded
    this.loaded = false;

    // Schedule update timer.
    this.getData();
    setInterval(() => {
      self.updateDom();
    }, this.config.updateInterval);
  },

  /*
   * getData
   * function example return data and show it in the module wrapper
   * get a URL request
   *
   */
  getData() {
    const self = this;

    const urlApi = 'https://jsonplaceholder.typicode.com/posts/1';
    let retry = true;

    const dataRequest = new XMLHttpRequest();
    dataRequest.open('GET', urlApi, true);
    dataRequest.onreadystatechange = function () {
      console.log(this.readyState);
      if (this.readyState === 4) {
        console.log(this.status);
        if (this.status === 200) {
          self.processData(JSON.parse(this.response));
        } else if (this.status === 401) {
          self.updateDom(self.config.animationSpeed);
          Log.error(self.name, this.status);
          retry = false;
        } else {
          Log.error(self.name, 'Could not load data.');
        }
        if (retry) {
          self.scheduleUpdate(self.loaded ? -1 : self.config.retryDelay);
        }
      }
    };
    dataRequest.send();
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

  processData(data) {
    const self = this;
    this.dataRequest = data;
    if (this.loaded === false) {
      self.updateDom(self.config.animationSpeed);
    }
    this.loaded = true;

    // the data if load
    // send notification to helper
    this.sendSocketNotification('MMM-Chore-Manager-NOTIFICATION_TEST', data);
  },

  // socketNotificationReceived from helper
  socketNotificationReceived(notification, payload) {
    if (notification === 'MMM-Chore-Manager-NOTIFICATION_TEST') {
      // set dataNotification
      this.dataNotification = payload;
      this.updateDom();
    }
  }
});
