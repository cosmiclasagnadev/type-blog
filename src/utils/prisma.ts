// this is gonna be our prisma client

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
// essentially this code will stop prisma from creating a new instance if one is already running
