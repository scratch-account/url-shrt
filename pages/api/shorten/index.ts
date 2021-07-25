import prisma from '../../../lib/prisma'

// POST /api/shorten
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { id, url } = req.body;
  const result = await prisma.shortenedUrl.create({
    data: {
      id,
      url
    }
  })
  res.json(result);
}
