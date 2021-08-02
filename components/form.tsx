import React, { useState } from 'react'

import CopyButton from './copy-button'
import { isValidUrl, getShortUrlForId } from '../lib/util'
import { ErrorResponse, ShortenedUrl } from '../pages/api/shorten'
import ShortLink from './short-link'

const URL_FORMAT = 'http(s)://{domain}'

function Form() {
  // inputUrl default value must be empty string to avoid upsetting React when
  // setting <input /> value prop
  const [inputUrl, setInputUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState(null)
  const [error, setError] = useState(null)
  const onSuccess = (shortenedUrl: ShortenedUrl) => {
    setShortenedUrl(shortenedUrl)
    setError(null)
  }
  const onError = (errorMessage: string) => {
    setShortenedUrl(null)
    setError(errorMessage)
  }
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!isValidUrl(inputUrl)) {
      setError(`Note: URLs must match the format: ${URL_FORMAT}`)
      return
    }
    try {
      // TODO: Prevent invalid URLs (e.g., localhost, blacklisted domains)
      const body = { url: inputUrl }
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
      onError(
        `The following error encountered while shortening your url: ${errorMessage}`
      )
    }
  }
  const lastUrl = shortenedUrl?.url
  return (
    <div className='form-container'>
      <form onSubmit={submitData}>
        <label htmlFor='url'>Enter your URL</label>
        <input
          id='url'
          name='url'
          onChange={(e) => {
            if (shortenedUrl) setShortenedUrl(null)
            setInputUrl(e.target.value)
          }}
          pattern='https?://.+'
          placeholder='E.g. https://example.com'
          required
          type='url'
          value={inputUrl}
        />
        <button disabled={lastUrl === inputUrl} type='submit'>
          Shorten it!
        </button>
      </form>
      {shortenedUrl && (
        <div className='success message'>
          <div className='label'>
            Here's your shortened url for
            <div className='original-url' title={shortenedUrl.url}>
              {shortenedUrl.url}
            </div>
          </div>
          <div className='result'>
            <ShortLink id={shortenedUrl.id} />
            <CopyButton text={getShortUrlForId(shortenedUrl.id)} />
          </div>
        </div>
      )}
      {error && <div className='error message'>{error}</div>}
      <style jsx>{`
        .form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        form {
          margin-bottom: 20px;
        }

        form > input {
          width: 20vw;
        }

        form > * {
          margin: 0 10px;
        }

        .message {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .error.message {
          color: #a51212;
        }

        .message .label {
          display: flex;
        }

        .original-url {
          font-weight: 500;
          margin-left: 5px;
          max-width: 30vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .message > * {
          margin: 10px 0px;
        }

        .result {
          display: flex;
          justify-content: space-evenly;
        }
      `}</style>

      <style jsx global>{`
        .result > * {
          margin: 0 10px;
        }
      `}</style>
    </div>
  )
}

export default Form
