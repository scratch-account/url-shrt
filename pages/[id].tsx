import React from 'react'
import { GetServerSideProps } from 'next'
import redirect from 'nextjs-redirect'

import DBClient from '../lib/prisma'
import Custom404 from './404'

type Props = { url: string }

const INVALID_ID_PROPS = { url: null }

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const idParam = params?.id
  if (!idParam || Array.isArray(idParam)) {
    return { props: INVALID_ID_PROPS }
  }
  const { prisma } = DBClient.getInstance()
  const shortenedUrl = await prisma.shortenedUrl.findUnique({
    where: {
      id: idParam
    }
  })
  // FIXME: Next.js doesn't like to deserialize types like DateTime. superjson has
  // a plugin to resolve this (see https://github.com/blitz-js/superjson#using-with-nextjs)
  // which has been added to this repo, but does not appear to work with this page
  // for some reason (there are no issues with history.tsx).
  // This hack allows us to handle parsing the createdAt field correctly.
  const string = JSON.stringify(shortenedUrl)
  const parsed = JSON.parse(string)
  const props: Props = parsed || INVALID_ID_PROPS
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
