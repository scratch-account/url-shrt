import Link from 'next/link'

function ShortLink({ id, url = null }) {
  const shortenedUrl = `http://localhost:3000/${id}`
  return (
    <span>
      <Link href={shortenedUrl}>
        <a target='_blank'>{shortenedUrl}</a>
      </Link>
      {url ? <span> ({url})</span> : null}
    </span>
  )
}

export default ShortLink
