// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { db, seedData } from "../../database";
import { Entry } from "../../models";

export default async function handler(req, res) {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({
      message: "Access to this endpoint denied",
    });
  }

  await db.connect();

  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries);

  await db.disconnect();

  res.status(200).json({ message: "Success!" });
}
