import thread from '../assets/thread.webp';

const Header = () => {
  return (
    <div className="p-4 border-b flex">
      <img src={thread} alt="Logo" className="h-5" />
      <h1 className="text-left">thread</h1>
    </div>
  );
};
export default Header;
