describe('MMM-Chore-Manager', () => {
  beforeAll(() => {
    require('../__mocks__/Module');
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
    expect(MMMChoreManager.requiresVersion).toBe('2.1.0');
  });

  describe('defaults', () => {
    test('updateInterval', () => {
      expect(MMMChoreManager.defaults.updateInterval).toBe(60000);
    });
    test('retryDelay', () => {
      expect(MMMChoreManager.defaults.retryDelay).toBe(5000);
    });
  });

  describe('getData', () => {});
});
