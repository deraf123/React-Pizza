import React from 'react';

type CategoriesProps = {
  value: number;
  onclickCategory: any;
};

export const Categories: React.FC<CategoriesProps> = ({ value, onclickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onclickCategory(index)}
            className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
