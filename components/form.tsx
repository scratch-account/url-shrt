import React, { useState } from "react";
import { nanoid } from 'nanoid'
import Link from 'next/link'

import prisma from '../lib/prisma'

function Form() {
  const [url, setUrl] = useState("");
  const [id, setId] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const id = nanoid(8)
      const body = { id, url };
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json()
      setId(data.id)
    } catch (error) {
      console.error(error)
    }
  };
  const shortenedUrl = `http://localhost:3000/${id}`
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
        value={url} />
      <button type='submit'>Shorten it!</button>
      {id &&
        <div>
          Here's your url!{' '}
          <Link href={shortenedUrl}>
            <a target='_blank'>{shortenedUrl}</a>
          </Link>
        </div>
      }
    </form>
  )
}

export default Form
