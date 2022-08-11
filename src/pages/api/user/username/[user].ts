import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../../server/db/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  try {
    console.log("attempting to get user:", req.query.user);

    const result = await prisma.contributor.count({
      where: {
        username: req.query.user as string,
      }
    })
  
    if (result === 0) {
      console.log("user not found");
      return res.status(404).send("not found");
    }
  
    console.log("user found");
    res.status(302).send("ok");
  } catch (e) {
    console.log("something went wrong", e);
    res.status(500).send("server error, please open up an issue on github");
  }
}