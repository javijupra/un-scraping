import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

prisma.records.count().then((result) => console.log(result));
