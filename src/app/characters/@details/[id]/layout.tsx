import clsx from "clsx";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div
    data-testid="detailed-character"
    className="flex w-96 items-start h-screen relative before:w-96"
  >
    <div
      className={clsx(
        "fixed w-96 flex h-screen p-4 flex-col rounded-md border shadow gap-2 overflow-auto transition-colors",
        "bg-white",
        "dark:bg-zinc-950 dark:border-zinc-800",
      )}
    >
      {children}
    </div>
  </div>
);

export default Layout;
