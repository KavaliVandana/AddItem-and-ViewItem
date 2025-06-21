import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ItemsContext from '../context/ItemsContext';
import './AddItemPage.css';

const AddItemPage = () => {
  const { addItem } = useContext(ItemsContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    coverImage: null,
    additionalImages: []
  });
  const [preview, setPreview] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'coverImage' && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(files[0]);
    }
    setFormData(prev => ({
      ...prev,
      [name]: name === 'coverImage' ? files[0] : Array.from(files)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const coverImage = await toBase64(formData.coverImage);
    const additionalImages = await Promise.all(
      formData.additionalImages.map(file => toBase64(file))
    );
    
    const newItem = {
      ...formData,
      coverImage,
      additionalImages
    };
    
    addItem(newItem);
    setSuccess(true);
    setTimeout(() => navigate('/'), 1500);
  };

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  return (
    <div className="add-item-page">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Item Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Shirt">Shirt</option>
            <option value="Pant">Pant</option>
            <option value="Shoes">Shoes</option>
            <option value="Sports Gear">Sports Gear</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Cover Image</label>
          <input
            type="file"
            name="coverImage"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}
        </div>

        <div className="form-group">
          <label>Additional Images</label>
          <input
            type="file"
            name="additionalImages"
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
        </div>

        <button type="submit">Add Item</button>
        {success && <div className="success-message">Item added successfully!</div>}
      </form>
    </div>
  );
};

export default AddItemPage;