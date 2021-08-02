import { createMocks } from 'node-mocks-http'

import handle, { SHORT_ID_LENGTH } from '../pages/api/shorten'

const REQUESTS_PER_SECOND_TARGET = 20
const SHORT_ID_REGEX = new RegExp(`[a-zA-Z0-9_-]{${SHORT_ID_LENGTH}}`)

describe('/api/shorten', () => {
  test(`can handle ${REQUESTS_PER_SECOND_TARGET} requests per second`, async () => {
    const startTime = new Date()
    let i = 0
    const runs = []
    while (i < REQUESTS_PER_SECOND_TARGET) {
      runs.push(
        createMocks({
          method: 'POST',
          body: {
            url: 'https://example.com'
          }
        })
      )
      i++
    }
    const ids = []
    await Promise.all(
      runs.map(({ req, res }) => {
        return handle(req, res).then(() => {
          expect(res._getStatusCode()).toBe(200)
          const { id } = JSON.parse(res._getData())
          expect(id).toMatch(SHORT_ID_REGEX)
          ids.push(id)
        })
      })
    )
    console.log(`Short IDs: ${ids.join(', ')}`)
    const endTime = new Date()
    const millisToFulfillRequests = endTime.getTime() - startTime.getTime()

    console.log(
      `API load test (${REQUESTS_PER_SECOND_TARGET} requests) took ${millisToFulfillRequests} ms`
    )
    expect(millisToFulfillRequests).toBeLessThan(1000)
  })
})
