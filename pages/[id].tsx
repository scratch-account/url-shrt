import React from 'react'
import { GetServerSideProps } from 'next'
import redirect from 'nextjs-redirect'

import prisma from '../lib/prisma'

type Props = {url: string }

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const shortenedUrl = await prisma.shortenedUrl.findUnique({
    where: {
      id: params?.id,
    }
  })
  const props: Props = shortenedUrl || { url: null }
  return { props }
}

const RedirectPage: React.FC<Props> = (props) => {
  if (!props.url) {
    return (
      <div>
        It looks like you've followed a bad link or maybe there is a typo in your{' '}
        URL (Note: URLs are case sensitive).
      </div>
    )
  }
  const Redirect = redirect(props.url)
  return (
    <Redirect>
      <div>Redirecting to {props.url}</div>
    </Redirect>
  )
}

export default RedirectPage
