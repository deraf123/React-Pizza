import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { pizzaId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63622bc666f75177ea284f2e.mockapi.io/items/${pizzaId}`,
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получении');
        console.log(error, 'FullPizza');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);
  if (!pizza) {
    return <>'Загрузка ...'</>;
  } else {
    return (
      <div className='container'>
        FullPizza
        <img src={pizza.imageUrl} alt='' />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price}</h4>
      </div>
    );
  }
};
