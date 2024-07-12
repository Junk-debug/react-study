export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-gray-100 text-zinc-800">{children} </main>
  );
}
