const StatCard = ({ title, value }) => (
    <div className="p-4 bg-white shadow rounded-lg text-center">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
)

export default StatCard
