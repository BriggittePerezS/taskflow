export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TaskFlow Inc. · Software interno de gestión
      </div>
    </footer>
  );
}
