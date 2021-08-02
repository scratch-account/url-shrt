import React from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { ArrowBack } from '@styled-icons/material'

import ShortLink from '../components/short-link'
import prisma from '../lib/prisma'
import { ShortenedUrl } from './api/shorten'

type Props = { urls: ShortenedUrl[] }

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const shortenedUrls = await prisma.shortenedUrl.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    // TODO: Fully implement pagination:
    // https://www.prisma.io/docs/concepts/components/prisma-client/pagination
    take: 10
  })
  const props: Props = { urls: shortenedUrls }
  return { props }
}

const History: React.FC<Props> = (props) => {
  return (
    <>
      <Link href='/'>
        <a>
          <ArrowBack width={15} height={15} /> Back
        </a>
      </Link>
      <ul>
        {props.urls?.map(({ createdAt, id, url }) => (
          <li key={id}>
            <ShortLink createdAt={createdAt} id={id} url={url} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default History
