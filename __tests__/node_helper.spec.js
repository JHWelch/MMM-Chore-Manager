/* eslint no-undef: "off" */
const { generateResponse } = require('../__mocks__/mockResponse');

describe('node_helper', () => {
  let helper;

  beforeEach(() => {
    helper = require('../node_helper');

    helper.setName('MMM-Chore-Manager');

    fetchMock.mockResponseOnce(JSON.stringify(generateResponse()), {
      status: 200
    });
  });

  describe('api_url and team_id specified', () => {
    test('triggers call to specified endpoint', () => {
      helper.socketNotificationReceived('CM_GET_DATA', {
        api_url: 'http://example.com/cm/api',
        team_id: 1
      });

      expect(fetchMock).toHaveBeenNthCalledWith(
        1,
        'http://example.com/cm/api/teams/1/chore_groups',
        {}
      );
    });

    describe('api_key specified', () => {
      test('call made with auth header', () => {
        helper.socketNotificationReceived('CM_GET_DATA', {
          api_url: 'http://example.com/cm/api',
          team_id: 1,
          api_key: 'API_KEY'
        });

        expect(fetchMock).toHaveBeenNthCalledWith(
          1,
          'http://example.com/cm/api/teams/1/chore_groups',
          {
            headers: { Authorization: 'Bearer API_KEY' }
          }
        );
      });
    });
  });

  test('data fetching logs error on failure', async () => {
    fetchMock.resetMocks();
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Forbidden' }), {
      status: 403
    });

    helper.socketNotificationReceived('CM_GET_DATA', {
      api_url: 'http://example.com/cm/api',
      team_id: 1
    });

    await waitForAsync();

    expect(console.error).toHaveBeenCalledWith(
      'Fetching chores: 403 Forbidden'
    );
    expect(helper.sendSocketNotification).not.toHaveBeenCalled();
  });
});
