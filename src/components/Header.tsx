export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold">
          TF
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">TaskFlow</h1>
          <p className="text-sm text-gray-500">
            Gestión de tareas para equipos modernos
          </p>
        </div>
      </div>
    </header>
  );
}
