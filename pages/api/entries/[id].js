import mongoose from "mongoose";
import { db } from "../../../database";
import { Entry } from "../../../models";

export default function handler(req, res) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Id is not valid" + id });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntryById(req, res);

    default:
      return res.status(200).json({ message: "Method does not exist" });
  }
}

const updateEntry = async (req, res) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "Not entry with this id" + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updateEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      { runValidators: true, new: true }
    );
    await db.disconnect();
    res.status(200).json(updateEntry);
  } catch (error) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }
};

const getEntryById = async (req, res) => {
  const { id } = req.query;

  await db.connect();

  try {
    const entry = await Entry.findById(id);

    if (!entry) {
      await db.disconnect();
      return res.status(400).json({ message: "Not entry with this id" + id });
    }

    await db.disconnect();
    res.status(200).json(entry);
  } catch (error) {
    res.status(400).json({ message: error.errors.status.message });
  }
};
