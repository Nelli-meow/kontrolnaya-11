import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Button, MenuItem, TextField, Typography } from '@mui/material';
import { ItemMutation } from '../../types';
import { useNavigate } from 'react-router-dom';
import FileInput from '../FileInput/FileInput.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCategory } from '../../features/categories/categoriesSlice.ts';
import { getCategories } from '../../features/categories/categoriesThunk.ts';


interface Props {
  onSubmit: (item: ItemMutation) => void;
}

const initialState = {
  title: '',
  description: '',
  price: 0,
  image: null,
  category: '',
}

const ItemForm: React.FC<Props> = ({onSubmit} ) => {
  const [item, setItem] = useState<ItemMutation>(initialState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategory);


  useEffect(() => {
    dispatch(getCategories());
  },[dispatch]);


  const submitFormHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!item.title || !item.description || !item.price) {
      alert('Please enter title and description and price');
      return;
    }

    console.log(item)

    onSubmit({...item});
    navigate('/');
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setItem(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setItem((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };



  return (
    <form
      onSubmit={submitFormHandler}
      style={{
        backgroundColor: 'rgba(245,245,245,0.84)',
        margin: '10px auto',
        padding: '10px 10px 40px 10px',
        width: '70%',
        borderRadius: '5px'
      }}
    >
      <Typography variant="body1" sx={{width: '100%', fontSize: '50px',  color: 'rgba(41,43,42,0.82)', textAlign: 'center'}}>New Post</Typography>
      <Grid container spacing={2} sx={{mx: 'auto', width: '80%'}}>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            variant="outlined"
            label="Title"
            id="title"
            name="title"
            value={item.title}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            multiline
            sx={{width: '100%'}}
            variant="outlined"
            placeholder="description"
            minRows={2}
            label="Description"
            id="description"
            name="description"
            value={item.description}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            variant="outlined"
            label="Price"
            id="price"
            name="price"
            type="number"
            value={item.price}
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{ width: '100%' }}
            variant="outlined"
            select
            label="Category"
            id="category"
            name="category"
            value={item.category}
            onChange={inputChangeHandler}
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid size={12}>
          <FileInput name="image" label="Image" onGetFile={getFile}/>
        </Grid>
        <Grid size={12}>
          <Button
            sx={{width: '100%'}}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ItemForm;