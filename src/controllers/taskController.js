import Task from "../models/Tasks.js";

export const createTask = async (req, res, next) => {
  try {
    console.log(req.body);
    const task = await Task.create({
      ...req.body,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      data: task,
    });

  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    console.log("THIS IS GETING CALLED")
    const tasks = await Task.find({ user: req.user });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });

  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: task,
    });

  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!task) {
      const error = new Error("Task not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};


export const filterTasks = async (req, res, next) => {
  try {
    const { status, search, page = 1, limit = 10, sort = "desc" } = req.query;

    let query = { user: req.user };

    if (status) {
      query.status = status;
    }

    // ✅ Mongoose text search (no regex)
    if (search) {
      query.$text = { $search: search };
    }

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const sortOption = sort === "asc" ? 1 : -1;

    const tasks = await Task.find(query)
      .sort({ createdAt: sortOption })
      .skip(skip)
      .limit(limitNumber);

    const total = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: pageNumber,
      pages: Math.ceil(total / limitNumber),
      data: tasks,
    });

  } catch (error) {
    next(error);
  }
};