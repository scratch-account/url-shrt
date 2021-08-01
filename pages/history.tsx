import React from 'react'
import { GetServerSideProps } from 'next'

import ShortLink from '../components/short-link'
import prisma from '../lib/prisma'
import { ShortenedUrl } from './api/shorten'

type Props = { urls: ShortenedUrl[] }

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const shortenedUrls = await prisma.shortenedUrl.findMany()
  const props: Props = { urls: shortenedUrls }
  return { props }
}

const History: React.FC<Props> = (props) => {
  if (!props.urls) {
    return <div>Error fetching URLs</div>
  }
  return (
    <ul>
      {props.urls.map(({ id, url }) => (
        <li key={id}>
          <ShortLink id={id} url={url} />
        </li>
      ))}
    </ul>
  )
}

export default History
