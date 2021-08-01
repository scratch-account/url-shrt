import { nanoid } from 'nanoid'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma } from '@prisma/client'
import validUrl from 'valid-url'

import prisma from '../../../lib/prisma'

export type ShortenedUrl = {
  id: string
  url: string
}

type ErrorCode =
  | 'validation_error'
  | 'invalid_request'
  | 'db_connection_error'
  | 'unknown_error'

export type ErrorResponse = {
  code: ErrorCode
  details: string
}

// POST /api/shorten
// Required fields in body: url
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ShortenedUrl | ErrorResponse>
) {
  const id = nanoid(8)
  const { url } = req.body
  if (!validUrl.isUri(url)) {
    res
      .status(400)
      .json(
        getErrorJson(
          'Provided URL is invalid. URL must match the format: http(s)://{domain}/',
          'validation_error'
        )
      )
    res.end()
    return
  }
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
      res.status(400).json(getErrorJson(e.message, 'invalid_request'))
      res.end()
      return
    } else if (e instanceof Prisma.PrismaClientValidationError) {
      res.status(400).json(getErrorJson(e.message, 'validation_error'))
      res.end()
      return
    } else if (e instanceof Prisma.PrismaClientInitializationError) {
      res.status(500).json(getErrorJson(e.message, 'db_connection_error'))
      res.end()
      return
    }
    res.status(500).json(getErrorJson(e?.message))
    res.end()
    return
  }
}

function getErrorJson(
  details = 'Unknown error encountered!',
  code: ErrorCode = 'unknown_error'
): ErrorResponse {
  return { code, details }
}
