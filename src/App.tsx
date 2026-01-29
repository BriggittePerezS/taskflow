import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import TaskDashboard from "./features/tasks/TaskDashboard";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header corporativo */}
      <Header />

      {/* Mensaje del producto */}
      <Hero />

      {/* Aplicación de tareas (código que YA funciona) */}
      <TaskDashboard />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
