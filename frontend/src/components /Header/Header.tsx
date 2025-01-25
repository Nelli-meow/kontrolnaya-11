import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/users/UsersSlice.ts';
import UserMenu from '../UI/UserMenu.tsx';
import AnonymousMenu from '../UI/AnonymousMenu.tsx';


const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <header className="bg bg-warning bg-gradient text-dark mb-5">
      <div className="container p-3 d-flex justify-content-between">
        <Link to="/" className="h3 text-decoration-none">Nelli Market :3</Link>
        <div>
          {user
            ?
            <>
              <UserMenu user={user} />
            </>
            :
            <>
              <AnonymousMenu/>
            </>
          }
        </div>
      </div>
    </header>
  );
};

export default Header;