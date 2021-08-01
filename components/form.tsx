import React, { useState } from 'react'

import { ErrorResponse, ShortenedUrl } from '../pages/api/shorten'
import ShortLink from './short-link'

function Form() {
  const [url, setUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState(null)
  const [error, setError] = useState('')
  const onSuccess = (shortenedUrl: ShortenedUrl) => {
    setShortenedUrl(shortenedUrl)
    setError('')
  }
  const onError = (errorMessage: string) => {
    setShortenedUrl(null)
    setError(errorMessage)
  }
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      // TODO: Prevent invalid URLs (e.g., localhost, blacklisted domains)
      const body = { url }
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      if (res.status >= 400) {
        const data: ErrorResponse = await res.json()
        onError(data.code)
        return
      }
      const shortenedUrl: ShortenedUrl = await res.json()
      onSuccess(shortenedUrl)
    } catch (error) {
      console.error(error)
      const errorMessage = typeof error === 'string' ? error : 'Unknown error!'
      onError(errorMessage)
    }
  }
  const lastUrl = shortenedUrl?.url
  return (
    <form onSubmit={submitData}>
      <label htmlFor='url'>URL</label>
      <input
        id='url'
        name='url'
        onChange={(e) => setUrl(e.target.value)}
        pattern='https?://.+'
        required
        type='url'
        value={url}
      />
      <button disabled={lastUrl === url} type='submit'>
        Shorten it!
      </button>
      {shortenedUrl && (
        <div>
          <div>Here's your shortened url for {shortenedUrl.url}!</div>
          <ShortLink id={shortenedUrl.id} />
        </div>
      )}
      {error && (
        <div>
          The following error encountered while shortening your url: {error}
        </div>
      )}
    </form>
  )
}

export default Form
