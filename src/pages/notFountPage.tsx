import Button from "../components/ui/button";

interface Props {}

const NotFountPage: React.FC<Props> = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-center mb-6">Page not found</h1>
      <Button>Go back</Button>
    </div>
  );
};

export default NotFountPage;
