export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/characters",
      permanent: true,
    },
  };
}

export default function HomePage() {
  return null;
}
