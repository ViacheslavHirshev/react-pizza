import { Link } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  to?: string;
  type: "small" | "primary" | "secondary";
}

function Button({ children, disabled = false, type, to }: ButtonProps) {
  const base = `inline-block text-sm bg-yellow-400 uppercase font-semibold text-stone-800 
  py-3 px-4 tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300
  focus:outline-none focus:ring focus:bg-yellow-300 focus:ring-yellow-300 focus:ring-offset-2
  disabled:cursor-not-allowed sm:px-6 sm:py-4 cursor-pointer`;

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary: `inline-block text-sm uppercase font-semibold text-stone-400 
  py-3 px-4 tracking-wide rounded-full border-2 border-stone-300 hover:bg-stone-300 transition-colors duration-300
  focus:outline-none focus:ring focus:bg-stone-300 focus:ring-stone-300 focus:ring-offset-2 focus:text-stone-800
  disabled:cursor-not-allowed sm:px-6 sm:py-4 px-4 py-2.5 md:px-6 md:py-3.5 cursor-pointer hover:text-stone-800`,
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
