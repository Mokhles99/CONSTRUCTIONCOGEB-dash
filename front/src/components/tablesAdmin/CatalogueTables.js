import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import {
  getAllCatalogues,
  createCatalogue,
  updateCatalogue,
  deleteCatalogue,
  getCatalogueById,
} from '../../actions/catalogue.actions';
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

const CatalogueTables = () => {
  const dispatch = useDispatch();
  const catalogues = useSelector((state) => state.catalogue.catalogues);
  const catalogueDetail = useSelector((state) => state.catalogue.catalogue);

  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCatalogueId, setSelectedCatalogueId] = useState(null);
  const [catalogueFiles, setCatalogueFiles] = useState([]);
  const [addCatalogueModalOpen, setAddCatalogueModalOpen] = useState(false);
  const [editCatalogueData, setEditCatalogueData] = useState({ files: [] });

  useEffect(() => {
    dispatch(getAllCatalogues());
  }, [dispatch]);

  const handleOpen = (catalogue = {}) => {
    setSelectedCatalogueId(catalogue._id || null);
    setEditMode(!!catalogue._id);
    setCatalogueFiles([]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddCatalogueModalOpen(false);
    setEditMode(false);
    setCatalogueFiles([]);
  };

  const handleFileChange = (e) => {
    setCatalogueFiles(Array.from(e.target.files));
  };

  const handleAddCatalogue = async () => {
    const formData = new FormData();
    catalogueFiles.forEach((file) => formData.append('files', file));

    try {
      const response = await fetch('https://us-central1-cogeb-2469c.cloudfunctions.net/api_construction/catalogue/create', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      console.log('Catalogue added successfully', result);
      setAddCatalogueModalOpen(false);
      dispatch(getAllCatalogues());
    } catch (error) {
      console.error('Error adding catalogue:', error);
    }
  };

  const handleEditCatalogue = async () => {
    const formData = new FormData();
    catalogueFiles.forEach((file) => formData.append('files', file));

    try {
      const response = await fetch(`https://us-central1-cogeb-2469c.cloudfunctions.net/api_construction/catalogue/update/${selectedCatalogueId}`, {
        method: 'PUT',
        body: formData
      });
      const result = await response.json();
      console.log('Catalogue updated successfully', result);
      setOpen(false);
      dispatch(getAllCatalogues());
    } catch (error) {
      console.error('Error updating catalogue:', error);
    }
  };

  const handleDeleteCatalogue = (catalogueId) => {
    dispatch(deleteCatalogue(catalogueId));
  };

  const handleCatalogueViewOpen = (catalogueId) => {
    setSelectedCatalogueId(catalogueId);
    dispatch(getCatalogueById(catalogueId));
    setOpen(true);
  };

  const catalogueColumns = [
    { field: 'id', headerName: 'ID', width: 150 },
    {
      field: 'files',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => (
        params.value[0] ? (
          <img src={params.value[0].url} alt={`Catalogue ${params.row.id}`} style={{ width: 'auto', height: 100, borderRadius: '10px' }} />
        ) : 'No image'
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <strong>
      
       
          <IconButton color="error" onClick={() => handleDeleteCatalogue(params.row.realCatalogueId)}>
            <DeleteIcon />
          </IconButton>
        </strong>
      ),
    },
  ];

  const catalogueRows = catalogues.map((catalogue, index) => ({
    id: index,
    realCatalogueId: catalogue._id,
    files: catalogue.files,
  }));

  return (
    <>
      <h1>Catalogue Management</h1>
      <div style={{ height: 400, width: '100%' }}>
        <Button variant="contained" color="secondary" onClick={() => setAddCatalogueModalOpen(true)}>Add Catalogue</Button>
        <DataGrid
          rows={catalogueRows}
          columns={catalogueColumns}
          pageSize={5}
          checkboxSelection
          rowHeight={120}
        />
      </div>

      <Modal
        open={addCatalogueModalOpen}
        onClose={handleClose}
        aria-labelledby="add-catalogue-modal-title"
        aria-describedby="add-catalogue-modal-description"
      >
        <Box sx={style}>
          <Typography id="add-catalogue-modal-title" variant="h6" component="h2">
            Add Catalogue
          </Typography>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ marginTop: '16px' }}
          />
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleAddCatalogue} color="primary">
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
        aria-labelledby="edit-catalogue-modal-title"
        aria-describedby="edit-catalogue-modal-description"
      >
        <Box sx={style}>
          <Typography id="edit-catalogue-modal-title" variant="h6" component="h2">
            {editMode ? 'Edit Catalogue' : 'Catalogue Details'}
          </Typography>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ marginTop: '16px' }}
          />
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleEditCatalogue} color="primary">
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

export default CatalogueTables;
