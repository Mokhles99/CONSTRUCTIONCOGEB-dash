import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import {
  getAllCarousels,
  createCarousel,
  updateCarousel,
  deleteCarousel,
  getCarouselById,
} from '../../actions/carousel.actions';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const BASE_URL = process.env.REACT_APP_BASE_URL;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CarouselTables = () => {
  const dispatch = useDispatch();
  const carousels = useSelector((state) => state.carousel.carousels);
  const carouselDetail = useSelector((state) => state.carousel.carousel);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCarouselId, setSelectedCarouselId] = useState(null);
  const [carouselFiles, setCarouselFiles] = useState([]);
  const [addCarouselModalOpen, setAddCarouselModalOpen] = useState(false);
  const [editCarouselData, setEditCarouselData] = useState({ files: [] });

  useEffect(() => {
    dispatch(getAllCarousels());
  }, [dispatch]);

  const handleOpen = (carousel = {}) => {
    setSelectedCarouselId(carousel._id || null);
    setEditMode(!!carousel._id);
    setCarouselFiles([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddCarouselModalOpen(false);
    setEditMode(false);
    setCarouselFiles([]);
  };

  const handleFileChange = (e) => {
    setCarouselFiles(Array.from(e.target.files));
  };

  const handleAddCarousel = async () => {
    const formData = new FormData();
    carouselFiles.forEach((file) => formData.append('files', file));

    try {
      const response = await fetch('https://us-central1-cogeb-2469c.cloudfunctions.net/api_construction/carousel/create', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      console.log('Carousel added successfully', result);
      setAddCarouselModalOpen(false);
      dispatch(getAllCarousels());
    } catch (error) {
      console.error('Error adding carousel:', error);
    }
  };

  const handleEditCarousel = async () => {
    const formData = new FormData();
    carouselFiles.forEach((file) => formData.append('files', file));

    try {
      const response = await fetch(`https://us-central1-cogeb-2469c.cloudfunctions.net/api_construction/carousel/update/${selectedCarouselId}`, {
        method: 'PUT',
        body: formData
      });
      const result = await response.json();
      console.log('Carousel updated successfully', result);
      setOpen(false);
      dispatch(getAllCarousels());
    } catch (error) {
      console.error('Error updating carousel:', error);
    }
  };

  const handleDeleteCarousel = (carouselId) => {
    dispatch(deleteCarousel(carouselId));
  };

  const handleCarouselViewOpen = (carouselId) => {
    setSelectedCarouselId(carouselId);
    dispatch(getCarouselById(carouselId));
    setOpen(true);
  };

  const carouselColumns = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'files',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => (
        params.value[0] ? (
          <img src={params.value[0].url} alt={`Carousel ${params.row.id}`} style={{ width: 'auto', height: 100, borderRadius: '10px' }} />
        ) : 'No image'
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <strong>
      
       
          <IconButton color="error" onClick={() => handleDeleteCarousel(params.row.realCarouselId)}>
            <DeleteIcon />
          </IconButton>
        </strong>
      ),
    },
  ];

  const carouselRows = carousels.map((carousel, index) => ({
    id: index,
    realCarouselId: carousel._id,
    files: carousel.files,
  }));

  return (
    <>
      <h1>Carousel Management</h1>
      <div style={{ height: 400, width: '100%' }}>
        <Button variant="contained" color="secondary" onClick={() => setAddCarouselModalOpen(true)}>Add Carousel</Button>
        <DataGrid
          rows={carouselRows}
          columns={carouselColumns}
          pageSize={5}
          checkboxSelection
          rowHeight={120}
        />
      </div>

      <Modal
        open={addCarouselModalOpen}
        onClose={handleClose}
        aria-labelledby="add-carousel-modal-title"
        aria-describedby="add-carousel-modal-description"
      >
        <Box sx={style}>
          <Typography id="add-carousel-modal-title" variant="h6" component="h2">
            Add Carousel
          </Typography>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ marginTop: '16px' }}
          />
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleAddCarousel} color="primary">
              Save
            </Button>
            <Button variant="outlined" onClick={handleClose} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="edit-carousel-modal-title"
        aria-describedby="edit-carousel-modal-description"
      >
        <Box sx={style}>
          <Typography id="edit-carousel-modal-title" variant="h6" component="h2">
            {editMode ? 'Edit Carousel' : 'Carousel Details'}
          </Typography>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ marginTop: '16px' }}
          />
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleEditCarousel} color="primary">
              Save
            </Button>
            <Button variant="outlined" onClick={handleClose} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CarouselTables;
