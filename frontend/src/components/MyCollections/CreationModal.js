import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreationForm from './CreationForm';

function CollectionModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Create New Collection +</button>
      {console.log(`hit line 10`)}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <CreationForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default CollectionModal;