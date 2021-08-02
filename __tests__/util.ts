import { isValidUrl } from '../lib/util'

type TestTuple = [string, boolean]

describe('/lib/util isValidUrl', () => {
  test.each<TestTuple>([
    //// Valid cases
    ['https://example.com', true],
    ['http://example.com', true],
    ['http://sub.google.com', true],
    ['http://sub.google.com/path?address=123 Main St', true],
    //// Invalid cases
    // No input
    [null, false],
    [undefined, false],
    // Invalid domain name (no TLD)
    ['http://localhost', false],
    ['http://localhost:8080', false],
    ['http://foo', false],
    // TLD does not exist
    ['https://intranet.local', false],
    ['https://www.www', false],
    // Check special characters
    ['https://*.com', false],
    // Do not permit ports (even 80)
    ['https://google.com:80', false],
    ['https://google.com:9000', false],
    // Ensure protocol is http or https
    ['scp://example.com', false],
    ['ftp://example.com', false],
    ['example.com', false],
    ['t.co', false],
    ['foo.bar', false]
  ])('input URL of %p should return %p', (url, expectedResult) => {
    const result = isValidUrl(url)
    expect(result).toEqual(expectedResult)
  })
})
