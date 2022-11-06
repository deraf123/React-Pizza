import React from 'react';

export const Categories = ({ value, onclickCategory }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  return (
    <div class='categories'>
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