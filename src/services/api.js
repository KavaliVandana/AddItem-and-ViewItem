// services/api.js
import { v4 as uuidv4 } from 'uuid';

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

export async function addItem(item) {
  const items = JSON.parse(localStorage.getItem('items')) || [];
  const newItem = {
    id: uuidv4(),
    name: item.name,
    type: item.type,
    desc: item.desc,
    cover: await toBase64(item.cover),
    images: await Promise.all(item.images.map(toBase64))
  };
  localStorage.setItem('items', JSON.stringify([...items, newItem]));
}

export async function getItems() {
  return JSON.parse(localStorage.getItem('items')) || [];
}
