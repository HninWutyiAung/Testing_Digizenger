// import React, { useState } from 'react';
// import EditAboutInfo from './EditAboutInfo';
// import AddCareerHistory from './AddCareerHistory';
// import EditCareerHistory from './EditCareerHistory';

// const ProfileModalsManager = () => {
//   const [activeModal, setActiveModal] = useState('editAboutInfo'); // Controls which modal is open
//   const [selectedCareerId, setSelectedCareerId] = useState(null); // Store career ID for edit

//   const handleOpenEditAboutInfo = () => {
//     setActiveModal('editAboutInfo');
//   };

//   const handleOpenAddCareer = () => {
//     setActiveModal('addCareer');
//   };

//   const handleOpenEditCareer = (careerId) => {
//     setSelectedCareerId(careerId);
//     setActiveModal('editCareer');
//   };

//   const handleCloseModal = () => {
//     setActiveModal(null);
//   };

//   return (
//     <div>
//       {activeModal === 'editAboutInfo' && (
//         <EditAboutInfo
//           isOpen={true}
//           onAddCareer={handleOpenAddCareer}
//           onEditCareer={handleOpenEditCareer}
//           onClose={handleCloseModal}
//         />
//       )}

//       {activeModal === 'addCareer' && (
//         <AddCareerHistory
//           isOpen={true}
//           onClose={handleOpenEditAboutInfo} // Go back to EditAboutInfo modal on close
//         />
//       )}

//       {activeModal === 'editCareer' && (
//         <EditCareerHistory
//           isOpen={true}
//           careerId={selectedCareerId} // Pass selected career ID for editing
//           onClose={handleOpenEditAboutInfo}
//         />
//       )}
//     </div>
//   );
// };

// export default ProfileModalsManager;
