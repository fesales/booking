import { getUrlWithQueryParams } from '../url';

describe('url', () => {
  it('shouldget url with query params', async () => {
    const endpoint = 'some-endpoint/queryParam1={queryParam1}&queryParam2={queryParam2}';
    const queryParams = {
      queryParam1: 'one',
      queryParam2: 'two',
    };

    expect(getUrlWithQueryParams(endpoint, queryParams)).toEqual(
      'some-endpoint/queryParam1=one&queryParam2=two'
    );
  });
});
