import React from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { ArrowBack } from '@styled-icons/material'

import ShortLink from '../components/short-link'
import DBClient from '../lib/prisma'
import { ShortenedUrl } from './api/shorten'

type Props = { urls: ShortenedUrl[] }

const LIMIT = 10

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { prisma } = DBClient.getInstance()
  const shortenedUrls = await prisma.shortenedUrl.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    // TODO: Fully implement pagination:
    // https://www.prisma.io/docs/concepts/components/prisma-client/pagination
    take: LIMIT
  })
  const props: Props = { urls: shortenedUrls }
  return { props }
}

// TODO: Implement auth and only permit users to see history for themselves.
const History: React.FC<Props> = (props) => {
  return (
    <>
      <Link href='/'>
        <a>
          <ArrowBack width={15} height={15} /> Back
        </a>
      </Link>
      {props.urls.length > 0 ? (
        <ul>
          {props.urls.map(({ createdAt, id, url }) => (
            <li key={id}>
              <ShortLink createdAt={createdAt} id={id} url={url} />
            </li>
          ))}
        </ul>
      ) : (
        <div>No URLs have been shortened yet!</div>
      )}
      <div>Showing the {LIMIT} most recent URLs</div>
      <style jsx>{`
        ul {
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
      `}</style>
    </>
  )
}

export default History
