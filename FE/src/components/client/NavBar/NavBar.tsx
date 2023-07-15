import { Container, DarkMode, Logo, Search, UserMenu } from "../..";

type NavBarProps = {
  theme: string | null;
  isLogin: boolean;
  imageUser: string;
  handleChangeTheme: (theme: string) => void;
};

const NavBar = ({
  isLogin,
  theme,
  imageUser,
  handleChangeTheme,
}: NavBarProps) => {
  return (
    <>
      <div
        className="
        w-full
        py-3
        md:p-0
        bg-light
        dark:bg-dark"
      >
        <Container>
          <div
            className="
            flex
            flex-row
            items-center
            justify-between
            gap-5"
          >
            <Logo />

            <Search />

            <div
              className="
              flex
              flex-row
              gap-5
              justify-center
              items-center"
            >
              <DarkMode theme={theme} handleChangeTheme={handleChangeTheme} />

              <UserMenu isLogin={isLogin} imageUser={imageUser} />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default NavBar;
