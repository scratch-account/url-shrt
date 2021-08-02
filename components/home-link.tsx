import Link from 'next/link'
import { ArrowBack } from '@styled-icons/material'

function HomeLink() {
  return (
    <Link href='/'>
      <a>
        <ArrowBack width={15} height={15} /> Back
      </a>
    </Link>
  )
}

export default HomeLink
