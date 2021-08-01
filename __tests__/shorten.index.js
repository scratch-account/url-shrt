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
    console.log(responseData)
    expect(responseData).toEqual(
      expect.objectContaining({
        id: testShortId,
        url: 'https://example.com'
      })
    )
  })
})
