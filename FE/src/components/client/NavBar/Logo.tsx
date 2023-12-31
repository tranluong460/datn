import { useNavigate } from "react-router-dom";

type LogoProps = {
  url: string;
};

const Logo = ({ url }: LogoProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(url)}
      className="hidden md:block cursor-pointer p-3"
    >
      <span className="text-2xl italic text-textLight dark:text-textDark">
        Seventeen
      </span>
    </div>
  );
};

export default Logo;
