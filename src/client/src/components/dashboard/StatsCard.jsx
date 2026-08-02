function StatsCard({ title, value, color }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border-l-4" style={{ borderColor: color }}>
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <h1 className="text-3xl font-bold mt-2">
        {value}
      </h1>
    </div>
  );
}

export default StatsCard;