import Header from '../components /Header/Header.tsx';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { useEffect } from 'react';
import { deleteItem, getOneItem } from '../features/items/itemsThunk.ts';
import { useParams } from 'react-router-dom';
import { selectOneItem } from '../features/items/itemsSlice.ts';
import { Box, Button, Container } from '@mui/material';
import Typography from '@mui/joy/Typography';
import { apiURL } from '../globalConstants.ts';
import { IItemFull } from '../types';
import { selectUser } from '../features/users/UsersSlice.ts';

const OneItemInfo = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const user = useAppSelector(selectUser);

  const itemInfo = useAppSelector(selectOneItem) as IItemFull | null;

  useEffect(() => {
    if (id) {
      dispatch(getOneItem(id));
    }
  }, [dispatch, id]);

  const onDelete = (id: string) => {
    if (id) {
      dispatch(deleteItem(id));
      console.log(id)
    }
  };

  const isSeller = user && itemInfo && user._id === itemInfo.salesman._id;


  return itemInfo ? (
    <>
      <Header />
      <div className="container">
        <Container sx={{ backgroundColor: 'rgba(245,245,245,0.87)', borderRadius: '5px' }}>
          <Box sx={{ width: '100%', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


            <Box sx={{ width: '400px', marginBottom: '20px' }}>
              <img
                style={{ borderRadius: '20px', width: '100%' }}
                src={apiURL + '/' + itemInfo.image}
                alt={itemInfo.title}
                loading="lazy"
              />
            </Box>


            <Box sx={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>
              <Typography level="h1">{itemInfo.title}</Typography>
              <Box sx={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>
                <Typography level="h1">{itemInfo.title}</Typography>
                <Typography level="h3">Full Name: {itemInfo.salesman.displayName}</Typography>
                <Typography level="h3">Phone: {itemInfo.salesman.phoneNumber}</Typography>
              </Box>
            </Box>


            <Box sx={{ padding: '10px', marginTop: '40px', width: '100%' }}>
              <Typography level="h4" sx={{ textAlign: 'start', margin: '20px 0' }}>{itemInfo.description}</Typography>
              <Typography level="h3" sx={{ textAlign: 'start', margin: '20px 0' }}>${itemInfo.price}- USD</Typography>
            </Box>

            {isSeller && (
              <Box sx={{ marginTop: '20px' }}>
                <Button variant="text"  onClick={() => {
                  if (id) {
                    onDelete(id);
                  }
                }} sx={{color: 'red', fontSize: '16px', display: 'flex', justifyContent: 'start', wordWrap: 'break-word', '&:hover': {color: 'rgb(49,172, 300)'}, marginTop: '10px'}}>Delete item</Button>
              </Box>
            )}

          </Box>
        </Container>
      </div>
    </>
  ) : null;
};

export default OneItemInfo;