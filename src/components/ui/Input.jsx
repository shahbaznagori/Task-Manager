export default function Input({ label, error, ...props }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium">
          {label}
        </label>
      )}

      <input
        {...props}
        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
}