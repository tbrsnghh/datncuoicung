import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenus } from '../../redux/menuSlice';
import { fetchDishes } from '../../redux/dishSlice';

export default function Step3SelectMenu({ eventInfo, setEventInfo }) {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu.menu);
  const dishes = useSelector((state) => state.dish.dish);
  const setMenu = (index) => {
    setEventInfo({ ...eventInfo, menuId: index });
  };
  useEffect(() => {
      dispatch(fetchMenus());
      dispatch(fetchDishes());
    }, [dispatch]);
  return (
    <div>Step3SelectMenu
      <div className='w-5/6 mx-auto text-left'>
      {menu && menu.map((item, index) => (
        <div key={index} className='flex flex-col p-2 border-b border-gray-200'>
          <div className='flex justify-between items-center'>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <button onClick={() => setMenu(index)} className='bg-pink-500 text-white px-4 py-1 rounded'>Chọn</button>
          </div>
          <div className='ml-4'></div>
            {dishes && dishes.filter(dish => dish.menuId === item.id).map((dish, dishIndex) => (
              <div key={dishIndex} className='flex justify-between items-center p-1'>
                <div>{dish.name}</div>
                <div>{dish.price}</div>
              </div>
            ))}
          </div>
        
      ))}
      </div>
    </div>
  )
}
