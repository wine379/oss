import React from 'react';
import * as Icon from 'react-feather';

const CustomCard = () => {
  return (
    <div className='stats-card purple-card mb-4'>
      <h3>
        MK 0.00
        <Icon.ArrowUpCircle className='icon' />
      </h3>
      <p>Household add today</p>
      <i className='lni-cart-full' />
    </div>
  );
};

export default CustomCard;
