import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../src/services/api";
import { Button } from "../components/ui/Button";

export function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken("");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <Button variant="secondary" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-gray-500 text-lg">
            Todo List functionality coming soon! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
