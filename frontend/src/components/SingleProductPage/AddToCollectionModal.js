import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddToCollectionForm from './AddToCollectionForm';

function AddToCollectionModal() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowAddModal(true)}>Add To Collection +</button>
      {/* {console.log(`hit line 10`)} */}
      {showAddModal && (
        <Modal onClose={() => setShowAddModal(false)}>
            <AddToCollectionModal setShowAddModal={setShowAddModal}/>
        </Modal>
      )}
    </>
  );
}

export default AddToCollectionModal;