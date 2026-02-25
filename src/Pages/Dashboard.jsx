import { useEffect, useState } from "react";
import {
  getTasks,
  deleteTask,
  filterTasks,
} from "../api/taskApi";
import TaskForm from "../components/Tasks/TaskForm";
import TaskCard from "../components/Tasks/TaskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [serverError, setServerError] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");

  async function loadTasks() {
    try {
      setServerError("");
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setTasks([]);
      setServerError(
        err.response?.data?.message || "Failed to load tasks"
      );
    }
  }

  // Load once after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const applyStatusFilter = async (nextStatus) => {
    if (!nextStatus) {
      return loadTasks();
    }

    try {
      setServerError("");
      const data = await filterTasks({
        status: nextStatus,
      });
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setServerError(
        err.response?.data?.message || "Failed to filter tasks"
      );
    }
  };

  const handleStatusFilterChange = (status) => {
    setStatusFilter(status);
    applyStatusFilter(status);
  };

  const handleTitleFilterChange = (title) => {
    setTitleFilter(title);
  };

  const normalizedTitleFilter = titleFilter
    .trim()
    .toLowerCase();

  const filteredTasks = normalizedTitleFilter
    ? tasks.filter((task) =>
      (task.title || "")
        .toLowerCase()
        .includes(normalizedTitleFilter)
    )
    : tasks;

  const handleTaskSaved = (task) => {
    if (editingTask && task?._id) {
      setTasks((prev) =>
        prev.map((t) =>
          t._id === task._id ? task : t
        )
      );
      setEditingTask(null);
    } else if (task) {
      setTasks((prev) => [task, ...prev]);
    }
    setIsFormOpen(false);
  };

  const openCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingTask(null);
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Available Tasks
            </h1>
            <p className="text-sm text-slate-600">
              Manage your tasks from one place.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateForm}
            className="bg-cyan-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-cyan-700 shrink-0"
          >
            Add Task
          </button>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-3">
          <select
            value={statusFilter}
            onChange={(e) =>
              handleStatusFilterChange(
                e.target.value
              )
            }
            className="border border-slate-300 p-2 rounded-lg bg-white min-w-44"
          >
            <option value="">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="completed">
              Completed
            </option>
          </select>

          <input
            type="search"
            value={titleFilter}
            onChange={(e) =>
              handleTitleFilterChange(
                e.target.value
              )
            }
            placeholder="Search by task title"
            className="border border-slate-300 p-2 rounded-lg bg-white w-full md:max-w-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {serverError && (
          <p className="mb-4 text-sm text-red-600">{serverError}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onEdit={() =>
                openEditForm(task)
              }
            />
          ))}
        </div>

        {!filteredTasks.length && !serverError && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-600 mt-4">
            No tasks yet. Click "Add Task" to create one.
          </div>
        )}
      </div>

      {isFormOpen && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          onClick={closeForm}
        >
          <div
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <TaskForm
              key={editingTask?._id || "new-task-form"}
              onTaskSaved={handleTaskSaved}
              editingTask={editingTask}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}
