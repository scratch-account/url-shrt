import { PrismaClient } from '@prisma/client'

// Derived from https://github.com/prisma/prisma/issues/1983#issuecomment-741528078
class DBClient {
  public prisma: PrismaClient
  private static instance: DBClient
  private constructor() {
    this.prisma = new PrismaClient()
  }

  public static getInstance = () => {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient()
    }
    return DBClient.instance
  }
}

export default DBClient
