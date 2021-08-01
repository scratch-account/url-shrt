import { createMocks } from 'node-mocks-http'
import nanoid from 'nanoid'

import handle from '../pages/api/shorten'

describe('/api/shorten', () => {
  test('returns an id that acts as a shortened url', async () => {
    const testShortId = `testid123-${Math.random()}`
    const nanoidSpy = jest.spyOn(nanoid, 'nanoid').mockReturnValue(testShortId)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        url: 'https://example.com'
      }
    })

    await handle(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(nanoidSpy).toHaveBeenCalledTimes(1)
    const responseData = JSON.parse(res._getData())
    expect(responseData).toEqual(
      expect.objectContaining({
        id: testShortId,
        url: 'https://example.com'
      })
    )
  })
  test('returns an error response for invalid request (missing url)', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        // Invalid field: urlString should be url
        urlString: 'https://example.com'
      }
    })
    await handle(req, res)
    expect(res._getStatusCode()).toBe(400)
    const responseData = JSON.parse(res._getData())
    expect(responseData).toEqual(
      expect.objectContaining({
        code: 'validation_error'
      })
    )
  })
  test('returns an error response for invalid request (bad url)', async () => {
    const testShortId = `testid123-${Math.random()}`
    const nanoidSpy = jest.spyOn(nanoid, 'nanoid').mockReturnValue(testShortId)
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        // Invalid value: missing protocol (https,http)
        url: 'example.com'
      }
    })
    await handle(req, res)
    expect(res._getStatusCode()).toBe(400)
    const responseData = JSON.parse(res._getData())
    console.log(responseData)
    expect(responseData).toEqual(
      expect.objectContaining({
        code: 'validation_error',
        details:
          'Provided URL is invalid. URL must match the format: http(s)://{domain}/'
      })
    )
  })
})
