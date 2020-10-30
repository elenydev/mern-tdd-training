import Task from "../models/task.js";
import socket from '../socket.js'

export const createTasks = async (req, res, next) => {
  const content = req.body.content;
  const status = req.body.status
  const prio = req.body.prio;
  const creatorId = req.body.creatorId;
  const task = new Task({ content, status, prio, creatorId });
  try {
    const result = await task.save();
    const tasks = await Task.find();
    socket.getIO().emit("tasks", { action: "fetchTasks", tasks: tasks });
    res.status(201)
    res.json({ message: "Task created" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    console.log(err);
    next(err);
  }
};

export const fetchTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    socket.getIO().emit("tasks", { action: "fetchTasks", tasks: tasks });
    res.send(JSON.stringify(tasks));
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const findTask = async (req, res, next) => {
  const title = req.body.title;
  try {
    const task = await Task.findOne({ prio: title });
    res.redirect("/");
  } catch (err) {
    console.log(err);
    next(err)
  }
};

export const toggleDone = async (req,res,next) => {
  const id = req.body.id
  try{
    const task = await Task.findById(id)
    task.status = !task.status
    await task.save()
    const tasks = await Task.find();
    socket.getIO().emit("tasks", { action: "fetchTasks", tasks: tasks });
    res.status(201)
    res.json({ message: "Status changed" });
  }
  catch (err) {
    next(err)
  }
}


export const deleteTask = async (req,res,next) =>{
  const id = req.body.id
  try{
    const task = await Task.findByIdAndDelete(id)
    const tasks = await Task.find();
    socket.getIO().emit("tasks", { action: "fetchTasks", tasks: tasks });
    res.status(201);
    res.json({ message: "Task deleted" });
  }
  catch (err) {
    console.log(err)
    next(err)
  }
}

export const editTask = async (req, res, next) => {
  const taskId = req.body._id;
  const content = req.body.data.content;
  const status = req.body.data.status;
  const prio = req.body.data.prio;
  const creatorId = req.body.creatorId;
  try {
    const task = await Task.findById(taskId); 
    if (task) {
            task.content = content;
            task.prio = prio;
            task.status = status;
            task.creatorId = creatorId;
            await task.save();
            const tasks = await Task.find();
            socket
              .getIO()
              .emit("tasks", { action: "fetchTasks", tasks: tasks });
            res.status(201);
            res.json({ message: "Successfully edited task" });
    }
  } catch (err) {
    next(err);
  }
};