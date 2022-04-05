import * as React from 'react';
import Button from './Button';
import Typography from './Typography';
import ProductHeroLayout from './ProductHeroLayout';
import Image from 'next/image';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const backgroundImage =
  '/images/hero-image.jpg';

const ProductHero = () => {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: 'none' }}
        src={backgroundImage}
        alt='increase priority'
      />
      <Typography color='inherit' align='center' variant='h2' marked='center'>
        Would you like a convenient &#38; affordable home toilet within Lilongwe
        City?
      </Typography>
      <Typography
        color='inherit'
        align='center'
        variant='h5'
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        Enjoy subsidized offers up to -50% off all standard toilets.
      </Typography>
      <Button
        color='secondary'
        variant='contained'
        size='large'
        component='a'
        href='/products'
        sx={{ minWidth: 200 }}
      >
        <ShoppingCartIcon />
        Order now
      </Button>
      <Typography variant='body2' color='inherit' sx={{ mt: 2 }}>
        Keep Lilongwe clean and safe.
      </Typography>
    </ProductHeroLayout>
  );
}

export default ProductHero;
