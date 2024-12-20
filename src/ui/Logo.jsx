function Logo({className}) {
  return (
    <div className={`flex justify-center ${className}`}>
      <img className="max-h-36 object-contain" src="/logo-light.png" alt="Logo" />
    </div>
  );
}

export default Logo;
