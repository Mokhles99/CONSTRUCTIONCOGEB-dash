import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import {
  getAllAbouts,
  createAbout,
  updateAbout,
  deleteAbout,
  getAboutById,
} from '../../actions/about.actions';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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

const AboutTables = () => {
  const dispatch = useDispatch();
  const abouts = useSelector((state) => state.about.abouts);
  const aboutDetail = useSelector((state) => state.about.about);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedAboutId, setSelectedAboutId] = useState(null);
  const [aboutFiles, setAboutFiles] = useState([]);
  const [addAboutModalOpen, setAddAboutModalOpen] = useState(false);
  const [editAboutData, setEditAboutData] = useState({ files: [] });

  useEffect(() => {
    dispatch(getAllAbouts());
  }, [dispatch]);

  const handleOpen = (about = {}) => {
    setSelectedAboutId(about._id || null);
    setEditMode(!!about._id);
    setAboutFiles([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddAboutModalOpen(false);
    setEditMode(false);
    setAboutFiles([]);
  };

  const handleFileChange = (e) => {
    setAboutFiles(Array.from(e.target.files));
  };

  const handleAddAbout = async () => {
    const formData = new FormData();
    aboutFiles.forEach((file) => formData.append('files', file));

    try {
      const response = await fetch('http://localhost:3005/about/create', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      console.log('About added successfully', result);
      setAddAboutModalOpen(false);
      dispatch(getAllAbouts());
    } catch (error) {
      console.error('Error adding about:', error);
    }
  };

  const handleEditAbout = async () => {
    const formData = new FormData();
    aboutFiles.forEach((file) => formData.append('files', file));

    try {
      const response = await fetch(`http://localhost:3005/about/update/${selectedAboutId}`, {
        method: 'PUT',
        body: formData
      });
      const result = await response.json();
      console.log('About updated successfully', result);
      setOpen(false);
      dispatch(getAllAbouts());
    } catch (error) {
      console.error('Error updating about:', error);
    }
  };

  const handleDeleteAbout = (aboutId) => {
    dispatch(deleteAbout(aboutId));
  };

  const handleAboutViewOpen = (aboutId) => {
    setSelectedAboutId(aboutId);
    dispatch(getAboutById(aboutId));
    setOpen(true);
  };

  const aboutColumns = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'files',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => (
        params.value[0] ? (
          <img src={params.value[0].url} alt={`About ${params.row.id}`} style={{ width: 'auto', height: 100, borderRadius: '10px' }} />
        ) : 'No image'
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <strong>
      
       
          <IconButton color="error" onClick={() => handleDeleteAbout(params.row.realAboutId)}>
            <DeleteIcon />
          </IconButton>
        </strong>
      ),
    },
  ];

  const aboutRows = abouts.map((about, index) => ({
    id: index,
    realAboutId: about._id,
    files: about.files,
  }));

  return (
    <>
      <h1>About Management</h1>
      <div style={{ height: 400, width: '100%' }}>
        <Button variant="contained" color="secondary" onClick={() => setAddAboutModalOpen(true)}>Add About</Button>
        <DataGrid
          rows={aboutRows}
          columns={aboutColumns}
          pageSize={5}
          checkboxSelection
          rowHeight={120}
        />
      </div>

      <Modal
        open={addAboutModalOpen}
        onClose={handleClose}
        aria-labelledby="add-about-modal-title"
        aria-describedby="add-about-modal-description"
      >
        <Box sx={style}>
          <Typography id="add-about-modal-title" variant="h6" component="h2">
            Add About
          </Typography>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ marginTop: '16px' }}
          />
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleAddAbout} color="primary">
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
        aria-labelledby="edit-about-modal-title"
        aria-describedby="edit-about-modal-description"
      >
        <Box sx={style}>
          <Typography id="edit-about-modal-title" variant="h6" component="h2">
            {editMode ? 'Edit About' : 'About Details'}
          </Typography>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ marginTop: '16px' }}
          />
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleEditAbout} color="primary">
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

export default AboutTables;
