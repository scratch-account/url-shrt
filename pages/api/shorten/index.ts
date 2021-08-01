import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'

import prisma from '../../../lib/prisma'

type ShortenedUrl = {
  id: string
  url: string
}

type ErrorResponse = {
  code: string
  details: any
}

// POST /api/shorten
// Required fields in body: url
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ShortenedUrl | ErrorResponse>
) {
  const id = nanoid(8)
  const { url } = req.body
  try {
    const result = await prisma.shortenedUrl.create({
      data: {
        id,
        url
      }
    })
    res.json(result)
  } catch (e) {
    console.error(e)
    // TODO: Follow https://github.com/prisma/prisma/issues/5040 and add better
    // error handling once the support is added.
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(400).json({ code: 'invalid_request', details: e.message })
      res.end()
      return
    } else if (e instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json({ code: 'validation_error', details: e.message })
      res.end()
      return
    } else if (e instanceof Prisma.PrismaClientInitializationError) {
      res.status(500).json({ code: 'db_connection_error', details: e.message })
      res.end()
      return
    }
    res.status(500).json({ code: 'unknown_error', details: e.message })
    res.end()
    return
  }
}
