import { useDarkMode } from "../context/DarkModeContext";

function Logo({className}) {
  const { isDarkMode } = useDarkMode()

  const src = isDarkMode ? '/logo-dark.png' : '/logo-light.png'

  return (
    <div className={`flex justify-center ${className}`}>
      <img className="max-h-36 object-contain" src={src} alt="Logo" />
    </div>
  );
}

export default Logo;
