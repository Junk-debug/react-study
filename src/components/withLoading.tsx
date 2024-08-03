import Loader from "@/components/ui/loader";
import useRouteLoading from "@/hooks/useRouteLoading";

const LoadingPage = () => (
  <div className="h-full w-full flex justify-center items-center">
    <Loader />
  </div>
);

const WithLoading = ({ children }: { children: React.ReactNode }) => {
  const loading = useRouteLoading();

  if (loading) {
    return <LoadingPage />;
  }

  return children;
};

export default WithLoading;
