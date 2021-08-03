import { format, formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { OpenInNew } from '@styled-icons/material'
import styled, { css } from 'styled-components'

import { getShortUrlForId } from '../lib/util'

const Container = styled.div`
  margin-bottom: 5px;
`
const Metadata = styled.div`
  display: flex;
`
const muted = css`
  color: gray;
  font-weight: 200;
  font-size: small;
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
  ${muted}
`

function ShortLink({ createdAt = null, id, url = null }) {
  const shortenedUrl = getShortUrlForId(id)
  return (
    <Container>
      <Link href={shortenedUrl}>
        <a title='Try out short link in a new tab' target='_blank'>
          {shortenedUrl} <OpenInNew width={15} height={15} />
        </a>
      </Link>
      <Metadata>
        {createdAt ? (
          <CreatedText title={format(createdAt, 'MMM d yyyy, h:mm:ss a')}>
            {formatDistanceToNow(createdAt)} ago
          </CreatedText>
        ) : null}
        {url ? <LongUrl title={url}>Original: {url}</LongUrl> : null}
      </Metadata>
    </Container>
  )
}

export default ShortLink
