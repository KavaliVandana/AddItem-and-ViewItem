import { useState, useContext } from 'react';
import ItemCard from '../components/ItemCard/ItemCard';
import ItemModal from '../components/ItemModal/ItemModal';
import ItemsContext from '../context/ItemsContext';
import './ViewItemsPage.css';

const ViewItemsPage = () => {
  const { items } = useContext(ItemsContext);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="view-items-page">
      <h2>View Items ({items.length})</h2>
      
      {items.length === 0 ? (
        <div className="empty-state">
          <p>No items found. Add some items to get started.</p>
        </div>
      ) : (
        <div className="items-grid">
          {items.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      )}

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default ViewItemsPage;