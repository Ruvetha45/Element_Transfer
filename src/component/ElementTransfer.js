import React, { useState } from 'react';
import './ElementTransfer.css';

const BucketTransfer = () => {
  const [bucket1, setBucket1] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 5']);
  const [bucket2, setBucket2] = useState(['Item 4', 'Item 6', 'Item 7', 'Item 8']);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleMove = () => {
    const moveToBucket2 = bucket1.some((item) => selectedItems.includes(item));
    if (moveToBucket2) {
      setBucket2([...bucket2, ...selectedItems]);
      setBucket1(bucket1.filter((item) => !selectedItems.includes(item)));
    } else {
      setBucket1([...bucket1, ...selectedItems]);
      setBucket2(bucket2.filter((item) => !selectedItems.includes(item)));
    }
    setSelectedItems([]);
  };

  const handleRemove = () => {
    setBucket1(bucket1.filter((item) => !selectedItems.includes(item)));
    setBucket2(bucket2.filter((item) => !selectedItems.includes(item)));
    setSelectedItems([]);
  };

  const handleMoveAll = () => {
    if (bucket1.length > 0) {
      setBucket2([...bucket2, ...bucket1]);
      setBucket1([]);
    } else {
      setBucket1([...bucket1, ...bucket2]);
      setBucket2([]);
    }
  };

  const handleRemoveAll = () => {
    setBucket1([]);
    setBucket2([]);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', alignItems: 'center' }}>
      <div>
        <h3>Bucket 1</h3>
        <ul>
          {bucket1.map((item) => (
            <li key={item} onClick={() => handleSelect(item)} style={{ cursor: 'pointer' }}>
              <input type="checkbox" checked={selectedItems.includes(item)} readOnly />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button onClick={handleMove}>Add</button>
        <button onClick={handleRemove}>Remove</button>
        <button onClick={handleMoveAll}>Add All</button>
        <button onClick={handleRemoveAll}>Remove All</button>
      </div>
      <div>
        <h3>Bucket 2</h3>
        <ul>
          {bucket2.map((item) => (
            <li key={item} onClick={() => handleSelect(item)} style={{ cursor: 'pointer' }}>
              <input type="checkbox" checked={selectedItems.includes(item)} readOnly />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BucketTransfer;
