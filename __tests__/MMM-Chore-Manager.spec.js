describe('MMM-Chore-Manager', () => {
  beforeAll(() => {
    require('../__mocks__/Module');
    require('../__mocks__/Logger');
  });

  const name = 'MMM-Chore-Manager';

  let MMMChoreManager;

  beforeEach(() => {
    jest.resetModules();
    require('../MMM-Chore-Manager');

    MMMChoreManager = global.Module.create(name);
    MMMChoreManager.setData({ name, identifier: `Module_1_${name}` });
  });

  test('requires version 2.1', () => {
    expect(MMMChoreManager.requiresVersion).toBe('2.2.0');
  });

  describe('defaults', () => {
    test('updateInterval', () => {
      expect(MMMChoreManager.defaults.updateInterval).toBe(60000);
    });
    test('retryDelay', () => {
      expect(MMMChoreManager.defaults.retryDelay).toBe(5000);
    });
  });

  test('inits module with state loading === true', () => {
    expect(MMMChoreManager.loading).toBe(true);
  });

  describe('start', () => {
    const originalInterval = setInterval;
    const configObject = {
      apiUrl: 'http://example.com/api',
      apiKey: 'CM_API_KEY',
      teamId: 1
    };

    beforeEach(() => {
      MMMChoreManager.setConfig(configObject);
      global.setInterval = jest.fn();
    });

    afterEach(() => {
      global.setInterval = originalInterval;
    });

    test('logs start of module', () => {
      MMMChoreManager.start();

      expect(global.Log.info).toHaveBeenNthCalledWith(
        1,
        'Starting module: MMM-Chore-Manager'
      );
    });

    test('requests data from node_helper with config variables', () => {
      MMMChoreManager.start();

      expect(MMMChoreManager.sendSocketNotification).toHaveBeenNthCalledWith(
        1,
        'CM_GET_DATA',
        configObject
      );
    });

    test('interval requests data from node_helper', () => {
      MMMChoreManager.start();
      console.log(global.setInterval.mock.calls[0][0]);
      global.setInterval.mock.calls[0][0]();

      expect(MMMChoreManager.sendSocketNotification).toHaveBeenCalledTimes(2);
      expect(MMMChoreManager.sendSocketNotification).toHaveBeenNthCalledWith(
        1,
        'CM_GET_DATA',
        configObject
      );
    });

    test('interval set starts with default value', () => {
      MMMChoreManager.setConfig({ updateInterval: 100000 });
      MMMChoreManager.start();

      expect(global.setInterval).toHaveBeenNthCalledWith(
        1,
        expect.any(Function),
        100000
      );
    });
  });

  describe('socketNotificationReceived', () => {
    const { generateResponse } = require('../__mocks__/mockResponse');

    const payload = generateResponse();

    test('sets loading to false after receiving data', () => {
      MMMChoreManager.socketNotificationReceived('CM_DATA', payload);

      expect(MMMChoreManager.loading).toBe(false);
    });

    test('updates dom after receiving data', () => {
      MMMChoreManager.socketNotificationReceived('CM_DATA', payload);

      expect(MMMChoreManager.updateDom).toHaveBeenNthCalledWith(1, 300);
    });

    test('does nothing if notification is different than DATA', () => {
      MMMChoreManager.socketNotificationReceived('OTHER NOTIFICATION', payload);

      expect(MMMChoreManager.loading).toBe(true);
    });

    test('assigns data correctly', () => {
      MMMChoreManager.socketNotificationReceived('CM_DATA', payload);

      expect(MMMChoreManager.chores).toMatchObject(payload.data);
    });

    test('does nothing if notification is different than DATA', () => {
      MMMChoreManager.socketNotificationReceived('OTHER NOTIFICATION', payload);

      expect(MMMChoreManager.loading).toBe(true);
    });
  });

  test('registers font-awesome and custom css', () => {
    expect(MMMChoreManager.getStyles()).toMatchObject([
      'MMM-Chore-Manager.css'
    ]);
  });
});
