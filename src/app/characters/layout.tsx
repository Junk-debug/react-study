import Flyout from "@/app/characters/flyout";
import ThemeToggler from "@/components/themeToggler";

export default function CharactersLayout({
  children,
  details,
}: Readonly<{
  children: React.ReactNode;
  details: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="mx-auto w-full py-8 px-4 max-w-5xl flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between">
          <ThemeToggler />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-center">
          Rick and Morty characters
        </h1>
        {children}
        <Flyout />
      </div>
      {details}
    </div>
  );
}
