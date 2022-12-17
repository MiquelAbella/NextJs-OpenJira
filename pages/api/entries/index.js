import { db } from "../../../database";
import { Entry } from "../../../models";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return getEntries(res);

    case "POST":
      return postEntry(req, res);

    default:
      return res.status(400).json({ message: "Endpoint does not exist" });
  }
}

const getEntries = async (res) => {
  await db.connect();
  const entries = await Entry.find();
  entries.sort((a, b) => {
    return a.createdAt - b.createdAt;
  });
  await db.disconnect();

  res.status(200).json(entries);
};

const postEntry = async (req, res) => {
  const { description = "" } = req.body;

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
    status: "pending",
  });

  try {
    await db.connect();

    await newEntry.save();

    await db.disconnect();

    return res.status(201).json(newEntry);
  } catch (error) {
    await db.disconnect();
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong, take a look at server console" });
  }
};
