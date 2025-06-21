import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ItemModal.css';

const ItemModal = ({ item, onClose }) => {
  const allImages = [item.coverImage, ...(item.additionalImages || [])];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{item.name}</h2>
        <p className="item-type">{item.type}</p>
        <p className="item-description">{item.description}</p>
        
        <div className="carousel-container">
          <Carousel showArrows={true} showThumbs={false}>
            {allImages.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`${item.name} ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
        
        <button className="enquire-button">Enquire</button>
      </div>
    </div>
  );
};

export default ItemModal;