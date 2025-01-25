import MainPage from './containers/MainPage.tsx';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './features/users/RegisterPage.tsx';
import LoginPage from './features/users/LoginPage.tsx';
import Items from './features/items/items.tsx';
import AddNewItem from './containers/AddNewItem.tsx';
import OneItemInfo from './containers/OneItemInfo.tsx';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/items" element={<Items/>} />
        <Route path="/items/:id" element={<OneItemInfo/>} />
        <Route path="/items/addNewItem" element={<AddNewItem/>}/>
        <Route path="*" element={<p className="card-text my-5">Page is not  found</p>} />
      </Routes>
    </>
  )
};

export default App
