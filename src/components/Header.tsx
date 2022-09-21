import { Link } from 'react-router-dom';
import thread from '../assets/thread.webp';

const Header = () => {
  return (
    <div className="p-4 border-b flex">
      <img src={thread} alt="Logo" className="h-5" />
      <Link to="/">
        <h1 className="text-left">thread</h1>
      </Link>
    </div>
  );
};
export default Header;
