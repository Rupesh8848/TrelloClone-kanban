export const getTasksByStatus = (tasks, status) => {
  return tasks.filter((task) => task.status === status);
};

export const getTaskById = (tasks, id) => {
  return tasks.find((task) => task.id === id);
};
