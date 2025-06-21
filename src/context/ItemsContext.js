import { createContext, useState, useEffect } from 'react';

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  const addItem = (newItem) => {
    const updatedItems = [...items, { ...newItem, id: Date.now() }];
    setItems(updatedItems);
    localStorage.setItem('items', JSON.stringify(updatedItems));
    return newItem;
  };

  return (
    <ItemsContext.Provider value={{ items, addItem }}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;