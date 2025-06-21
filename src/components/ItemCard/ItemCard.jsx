import './ItemCard.css';

const ItemCard = ({ item, onClick }) => {
  return (
    <div className="item-card" onClick={onClick}>
      <div className="item-card__image-container">
        <img src={item.coverImage} alt={item.name} className="item-card__image" />
      </div>
      <div className="item-card__content">
        <h3 className="item-card__title">{item.name}</h3>
        <span className="item-card__type">{item.type}</span>
      </div>
    </div>
  );
};

export default ItemCard;