import Header from '../components /Header/Header.tsx';
import Items from '../features/items/items.tsx';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { useEffect } from 'react';
import { getCategories } from '../features/categories/categoriesThunk.ts';
import { selectCategory } from '../features/categories/categoriesSlice.ts';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector(selectCategory);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <>
      <Header/>
      <div className="container">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category.name}`}
              style={{
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              <Button
                variant="outlined"
                sx={{ fontSize: '16px', textTransform: 'capitalize' }}
              >
                {category.name}
              </Button>
            </Link>
          ))}
        </Box>
        <Items/>
      </div>
    </>
  );
};

export default MainPage;