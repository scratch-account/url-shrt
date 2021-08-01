import React from 'react'
import { GetServerSideProps } from 'next'
import redirect from 'nextjs-redirect'

import prisma from '../lib/prisma'
import Custom404 from './404'

type Props = { url: string }

const INVALID_ID_PROPS = { url: null }

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const idParam = params?.id
  if (!idParam || Array.isArray(idParam)) {
    return { props: INVALID_ID_PROPS }
  }
  const shortenedUrl = await prisma.shortenedUrl.findUnique({
    where: {
      id: idParam
    }
  })
  const props: Props = shortenedUrl || INVALID_ID_PROPS
  return { props }
}

const RedirectPage: React.FC<Props> = (props) => {
  if (!props.url) {
    return <Custom404 />
  }
  const Redirect = redirect(props.url)
  // TODO: Determine if we would rather not show a redirect page.
  return (
    <Redirect>
      <div>Redirecting to {props.url}</div>
    </Redirect>
  )
}

export default RedirectPage
