import React from 'react'
import { GetServerSideProps } from 'next'
import redirect from 'nextjs-redirect'

import prisma from '../lib/prisma'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const shortenedUrl = await prisma.shortenedUrl.findUnique({
    where: {
      id: params?.id,
    }
  })
  return {
    props: shortenedUrl,
  }
}

const RedirectPage: React.FC<{}> = (props) => {
  console.log(props)
  const Redirect = redirect(props.url)
  return (
    <Redirect>
      <div>Redirecting to {props.url}</div>
    </Redirect>
  )
}

export default RedirectPage
