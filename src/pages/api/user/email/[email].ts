import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../server/db/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  const result = await prisma.contributor.count({
    where: {
      email: req.query.email as string,
    }
  })


  console.log(result);

  if (result === 0) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  res.status(302).send("ok");
}