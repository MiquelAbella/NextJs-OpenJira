import { isValidObjectId } from "mongoose";

import { Entry } from "../models";

import { db } from "./";

export const getEntryById = async (id) => {
  if (!isValidObjectId) {
    return null;
  }

  await db.connect();
  const entry = await Entry.findById(id).lean();
  await db.disconnect();

  //aixo es perque _id: ObjectId(248thgunfdfuh4289h) i no és llegit només 248thgunfdfuh4289h
  return JSON.parse(JSON.stringify(entry));
};
