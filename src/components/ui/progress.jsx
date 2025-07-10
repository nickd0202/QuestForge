export function Progress({ value, max }) {
  const percentage = (value / max) * 100;
  return (
    <div className="w-full h-4 bg-gray-300 rounded">
      <div
        className="h-full bg-blue-500 rounded"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
