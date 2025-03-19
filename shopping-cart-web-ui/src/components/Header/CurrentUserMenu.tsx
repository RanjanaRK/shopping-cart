import getCurrentUser from "@/hooks/profile/getCurrentUser";
import Link from "next/link";

const CurrentUserMenu = async () => {
  const { data, isError } = await getCurrentUser();

  if (isError) {
    return (
      <>
        <div className="">Something went wrong</div>
      </>
    );
  }

  return (
    <>
      <Link href={"/profile"} className="font-bold capitalize">
        {data?.first_name}
      </Link>
    </>
  );
};

export default CurrentUserMenu;
