import ProtectedRoute from "../../components/ProtectedRoute";
import Home from "./Home";




const Index = () => {
  return (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  );
};

export default Index;
