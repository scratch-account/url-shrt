import Link from 'next/link'
import { History } from '@styled-icons/material'

import Form from '../components/form'
import { getShortUrlForId } from '../lib/util'

const Home = () => (
  <>
    <Link href='/history'>
      <a>
        <History width={15} height={15} />
        View history
      </a>
    </Link>
    <p className='description'>
      Paste in a URL to get a nice and short URL (e.g.,{' '}
      {getShortUrlForId('ab2ua98h')}).
    </p>
    <Form />
    <style jsx>{`
      .description {
        text-align: center;
      }

      .description {
        line-height: 1.5;
        font-size: 1.5rem;
      }
    `}</style>
  </>
)

export default Home
