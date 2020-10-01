export const defaultValues = {
  taskPriority: "Low",
  name: "",
  taskStatus: false,
};

export const addLocalTask = (data) => {
  let tasks;
  if (localStorage.getItem("Tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("Tasks"));
  }
  tasks.push(data);
  localStorage.setItem("Tasks", JSON.stringify(tasks));
};

export const deleteLocalTask = (index) => {
  const tasks = JSON.parse(localStorage.getItem("Tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("Tasks", JSON.stringify(tasks));
};

export const fetchTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("Tasks"));
  return tasks;
};
