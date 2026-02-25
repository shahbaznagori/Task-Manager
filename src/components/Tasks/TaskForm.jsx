import { useState } from "react";
import {
  createTask,
  updateTask,
} from "../../api/taskApi";

function getInitialFormData(task) {
  return {
    title: task?.title || "",
    description: task?.description || "",
    status: task?.status || "pending",
  };
}

export default function TaskForm({
  onTaskSaved,
  editingTask,
  onCancel,
}) {
  const [formData, setFormData] = useState(() =>
    getInitialFormData(editingTask)
  );
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || submitting) return;

    let savedTask;

    try {
      setSubmitting(true);
      if (editingTask) {
        savedTask = await updateTask(
          editingTask._id,
          formData
        );
      } else {
        savedTask = await createTask(formData);
      }
      onTaskSaved(savedTask);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200"
    >
      <h2 className="text-xl font-semibold mb-4 text-slate-800">
        {editingTask
          ? "Update Task"
          : "Add Task"}
      </h2>

      <input
        name="title"
        placeholder="Task title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border border-slate-300 p-2 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <textarea
        name="description"
        placeholder="Task description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border border-slate-300 p-2 mb-3 rounded-lg min-h-24 focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border border-slate-300 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <option value="pending">Pending</option>
        <option value="completed">
          Completed
        </option>
      </select>

      <div className="flex gap-3">
        {editingTask
          ? (
            <button
              type="submit"
              disabled={submitting}
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg w-full hover:bg-cyan-700 disabled:opacity-70"
            >
              {submitting ? "Saving..." : "Update Task"}
            </button>
            )
          : (
            <button
              type="submit"
              disabled={submitting}
              className="bg-cyan-600 text-white px-4 py-2 rounded-lg w-full hover:bg-cyan-700 disabled:opacity-70"
            >
              {submitting ? "Saving..." : "Add Task"}
            </button>
            )}
        <button
          type="button"
          onClick={onCancel}
          className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg w-full hover:bg-slate-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
