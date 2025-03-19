import { cookies } from "next/headers";
import AddProdcutButton from "./Header/AddProdcutButton";
import CurrentUserMenu from "./Header/CurrentUserMenu";
import LoginButton from "./Header/LoginButton";
import LogoutButton from "./Header/LogoutButton";

const Header = async () => {
  const token = (await cookies()).get("directus_session_token")
    ?.value as string;

  if (!token) {
    return (
      <>
        <AddProdcutButton />
        <LoginButton />
      </>
    );
  }

  if (token) {
    return (
      <>
        <div className="flex items-center gap-2">
          <CurrentUserMenu />
          <LogoutButton />
        </div>
      </>
    );
  }
};

export default Header;
