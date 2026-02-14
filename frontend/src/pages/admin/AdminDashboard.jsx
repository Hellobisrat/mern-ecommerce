export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-gray-900">Admin dashboard</h1>
      <p className="text-sm text-gray-600">
        Here we’ll add product management, orders, categories, and user management.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-4 text-sm text-gray-700 shadow-sm">
          Products overview
        </div>
        <div className="rounded-2xl border bg-white p-4 text-sm text-gray-700 shadow-sm">
          Orders overview
        </div>
        <div className="rounded-2xl border bg-white p-4 text-sm text-gray-700 shadow-sm">
          Users overview
        </div>
      </div>
    </div>
  );
}