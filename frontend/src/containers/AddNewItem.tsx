import Header from '../components /Header/Header.tsx';
import ItemForm from '../components /forms/ItemForm.tsx';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { ItemMutation } from '../types';
import { addItem } from '../features/items/itemsThunk.ts';
import { selectUser } from '../features/users/UsersSlice.ts';


const AddNewItem = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onSubmit = async (item: ItemMutation) => {
    if (user) {
      await dispatch(addItem({ item, token: user.token }));
    }
  };

  return (
    <>
      <Header/>
      <ItemForm onSubmit={onSubmit}/>
    </>
  );
};

export default AddNewItem;