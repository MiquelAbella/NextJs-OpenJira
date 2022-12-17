export const seedData = {
  entries: [
    {
      description: "This is a todo",
      createdAt: Date.now(),
      status: "pending",
    },
    {
      description: "This is a todo",
      createdAt: Date.now() - 100000,
      status: "in-progress",
    },
    {
      description: "This is a todo",
      createdAt: Date.now() - 100000,
      status: "finished",
    },
  ],
};
