export default function TaskCard({
  task,
  onDelete,
  onEdit,
}) {
  const isCompleted = task.status === "completed";

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold text-slate-800 text-lg">
          {task.title}
        </h3>
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            isCompleted
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {isCompleted ? "Completed" : "Pending"}
        </span>
      </div>

      <p className="text-sm text-slate-600 mt-3 min-h-12">
        {task.description || "No description added."}
      </p>

      <div className="flex gap-3 mt-4">
        <button
          onClick={onEdit}
          className="flex-1 text-cyan-700 bg-cyan-50 rounded-lg py-2 text-sm font-medium hover:bg-cyan-100"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 text-red-700 bg-red-50 rounded-lg py-2 text-sm font-medium hover:bg-red-100"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
