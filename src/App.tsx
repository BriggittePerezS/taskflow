import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import TaskDashboard from "./features/tasks/TaskDashboard.tsx";


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header corporativo */}
      <Header />

      {/* Hero / mensaje de producto */}
      <Hero />

      {/* 🔑 DASHBOARD CON LAYOUT (AQUÍ ESTÁ LA CLAVE) */}
      
        <TaskDashboard />
     
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
