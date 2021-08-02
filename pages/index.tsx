import Link from 'next/link'
import { History } from '@styled-icons/material'

import Form from '../components/form'
import { getShortUrlForId } from '../lib/util'

const Home = () => (
  <div className='container'>
    <Link href='/history'>
      <a>
        <History width={15} height={15} />
        View history
      </a>
    </Link>
    <p className='description'>
      Paste in a loooooong URL in exchange for a short one
    </p>
    <p className='sample'>(e.g., {getShortUrlForId('ab2ua98h')})</p>
    <Form />
    <style jsx>{`
      .container {
        text-align: center;
      }

      .description {
        line-height: 1.5;
        font-size: 1.5rem;
        margin-bottom: 0;
      }

      .sample {
        margin-bottom: 2rem;
      }
    `}</style>
  </div>
)

export default Home
