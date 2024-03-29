import { Container, DarkMode, Logo, UserMenu, NavBarIcon } from "../..";

const NavBar = () => {
  return (
    <div className="w-full py-3 px-5 md:px-0 md:py-0 shadow bg-light dark:bg-dark">
      <Container>
        <div className="flex flex-row items-center justify-between gap-5 py-4">
          <NavBarIcon />
          <Logo url="/" />

          <div className="flex flex-row gap-5 justify-center items-center">
            {/* <Search /> */}

            <DarkMode />

            <UserMenu />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavBar;
