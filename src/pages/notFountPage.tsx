import { useNavigate } from "react-router-dom";
import Button from "../components/ui/button";

interface Props {}

const NotFountPage: React.FC<Props> = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-center mb-6">Page not found</h1>
      <Button onClick={() => navigate("/")}>Go home</Button>
    </div>
  );
};

export default NotFountPage;
