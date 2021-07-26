import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../../lib/prisma'

type ShortenedUrl = {
  id: string,
  url: string
}

// POST /api/shorten
// Required fields in body: url
export default async function handle(req: NextApiRequest, res: NextApiResponse<ShortenedUrl>) {
  const id = nanoid(8)
  const { url } = req.body;
  const result = await prisma.shortenedUrl.create({
    data: {
      id,
      url
    }
  })
  res.json(result);
}
