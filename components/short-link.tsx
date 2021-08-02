import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { OpenInNew } from '@styled-icons/material'
import styled, { css } from 'styled-components'

import { getShortUrlForId } from '../lib/util'

const Container = styled.div`
  display: flex;
`
const muted = css`
  color: gray;
  font-weight: 200;
`
const LongUrl = styled.div`
  ${muted}
  margin-left: 5px;
  max-width: 20vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const CreatedText = styled.div`
  font-size: small;
  ${muted}
`

function ShortLink({ createdAt = null, id, url = null }) {
  const shortenedUrl = getShortUrlForId(id)
  return (
    <Container>
      <Link href={shortenedUrl}>
        <a target='_blank'>
          {shortenedUrl} <OpenInNew width={15} height={15} />
        </a>
      </Link>
      {url ? <LongUrl title={url}>{url}</LongUrl> : null}
      {createdAt ? (
        <CreatedText>{formatDistanceToNow(createdAt)} ago</CreatedText>
      ) : null}
    </Container>
  )
}

export default ShortLink
