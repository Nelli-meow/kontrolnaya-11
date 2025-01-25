import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectItems } from './itemsSlice.ts';
import { useEffect } from 'react';
import { getItems } from './itemsThunk.ts';
import ItemsItem from '../../components /items/ItemsItem.tsx';
import { Box } from '@mui/material';


const Items = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);


  useEffect(() => {
    dispatch(getItems());
  },[dispatch]);

  return (
    <>
      <div className="container">
        <h2 className="text-center mt-5">All items</h2>
        {items.map((item) => (
          <Box key={item._id}>
            <ItemsItem title={item.title} price={item.price} image={item.image}/>
          </Box>
        ))}
      </div>
    </>

  );
};

export default Items;