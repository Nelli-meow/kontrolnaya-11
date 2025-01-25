import Header from '../components /Header/Header.tsx';
import Items from '../features/items/items.tsx';

const MainPage = () => {

  return (
    <>
      <Header/>
      <div className="container">
        <Items/>
      </div>
    </>
  );
};

export default MainPage;