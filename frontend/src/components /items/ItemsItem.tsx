import NoPic from '../../assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
import { apiURL } from '../../globalConstants.ts';
import { CardMedia, Typography,Button } from '@mui/material';
import React from 'react';
import { Card, CardContent } from '@mui/joy';
import {  useNavigate } from 'react-router-dom';


interface Props {
  title: string;
  image: string | null;
  price: number;
  _id: string;
}

const ItemsItem: React.FC<Props> = ({image, title, price, _id}) => {
  const imageSrc = image ? `${apiURL}/${image}` : NoPic;
  const navigate = useNavigate();

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: '80%',
          margin: '20px auto',
          backgroundColor: 'rgba(245,245,245,0.87)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '10px',
          boxShadow: 2,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: '150px',
            height: '150px',
            objectFit: 'cover',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
          }}
          image={imageSrc}
          alt={title}
          loading="lazy"
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '8px' }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '16px', color: 'text.secondary' }}>
            ${price} USD
          </Typography>
          <Button variant="text" onClick={() => navigate(`/items/${_id}`)} sx={{color: 'green', fontSize: '16px', display: 'flex', justifyContent: 'start', wordWrap: 'break-word', '&:hover': {color: 'rgb(49,172,239)'}, marginTop: '10px'}}>Read more...</Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ItemsItem;