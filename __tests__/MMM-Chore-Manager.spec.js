describe('MMM-Chore-Manager', () => {
  beforeAll(() => {
    require('../__mocks__/Logger');
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
});
