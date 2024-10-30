import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { getAllProducts, getProductById, updateProduct, deleteProduct } from '../../actions/product.actions';
import { getAllCarts, getCarttwo } from '../../actions/carttwo.actions';
import { fetchAllUsers } from '../../actions/users.actions';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import RoleSelector from './RoleSelector';
import Tooltip from '@mui/material/Tooltip';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import CarouselTables from './CarouselTables';
import CatalogueTables from './CatalogueTables';
import AboutTables from './AboutTables';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#f0f8ff',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '20px'
};

const titleStyle = {
    fontWeight: 'bold',
    color: '#000',
};

const labelStyle = {
    color: '#000',
    fontWeight: 'bold',
};

const valueStyle = {
    color: '#808080',
};



const productTypeMapping = {
    'Fer': ['Beton','Marchant'],
    'Ciment': ['Colle','Normal'],
    'Brique':[]};
const productFamilies = Object.keys(productTypeMapping);

const productCategories = [
    'Normal',
    'Premium',
   
];

const Tables = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const productDetail = useSelector(state => state.product.product);
    const carts = useSelector(state => state.carttwo.carts);
    const cartDetail = useSelector(state => state.carttwo.carttwo);
    const users = useSelector(state => state.user.users);


    const [productModalOpen, setProductModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [editProductModalOpen, setEditProductModalOpen] = useState(false);
    const [cartModalOpen, setCartModalOpen] = useState(false);
    const [selectedCartId, setSelectedCartId] = useState(null);
    const [open, setOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [productConfirmOpen, setProductConfirmOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [addProductModalOpen, setAddProductModalOpen] = useState(false);
    const [editProductData, setEditProductData] = useState({ name: '', description: '' });
    const [productName, setProductName] = useState('');
    const [productRef, setProductRef] = useState('');
    const [productDescription, setProductDescription] = useState('');
   
    const [productFamille, setProductFamille] = useState('');
    const [productCategorie, setProductCategorie] = useState('');
    const [productType, setProductType] = useState('');
    const [productFiles, setProductFiles] = useState([]);

    const handleAddProduct = async () => {
        const formData = new FormData();
        formData.append('REF',productRef);
        formData.append('name', productName);
        formData.append('description', productDescription);
        formData.append('type', productType);
        formData.append('categorie', productCategorie);
        formData.append('famille', productFamille);
   

        try {
            const response = await fetch(`https://us-central1-cogeb-2469c.cloudfunctions.net/api_construction/product/create`, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            console.log('Product added successfully', result);
            setAddProductModalOpen(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllCarts());
        dispatch(fetchAllUsers());
    }, [dispatch]);

    useEffect(() => {
        if (selectedProductId) {
            dispatch(getProductById(selectedProductId));
        }
    }, [dispatch, selectedProductId]);

    useEffect(() => {
        if (selectedCartId) {
            console.log('Selected cart ID:', selectedCartId); 
            dispatch(getCarttwo(selectedCartId));
        }
    }, [dispatch, selectedCartId]);

    useEffect(() => {
        if (productDetail) {
            setEditProductData({
             
                name: productDetail.name,
                description: productDetail.description,
                type: productDetail.type,
                categorie:productDetail.categorie,
                famille: productDetail.famille,
              
            });
        }
    }, [productDetail]);

    const handleOpen = (id) => {
        setOpen(true);
        setSelectedId(id);
    };

    const handleClose = () => {
        setOpen(false);
        setConfirmOpen(false);
        setEditOpen(false);
        setProductModalOpen(false);
        setEditProductModalOpen(false);
        setCartModalOpen(false);
        setSelectedId(null);
        setSelectedProductId(null);
        setSelectedCartId(null);
    };

    const handleDeleteClick = (id) => {
        setConfirmOpen(true);
        setSelectedId(id);
    };

    const handleProductDeleteConfirm = (productId) => {
        setProductConfirmOpen(true);
        setSelectedProductId(productId);
    };

    const handleProductDelete = () => {
        if (selectedProductId) {
            dispatch(deleteProduct(selectedProductId));
            setProductConfirmOpen(false);
            setSelectedProductId(null);
        }
    };

    const handleEditClick = (id) => {
        setEditOpen(true);
        setSelectedId(id);
    };

    const handleProductEditClick = (productId) => {
        const product = products.find(p => p._id === productId);
        setSelectedProductId(productId);
        setEditProductData({
            name: product.name,
            description: product.description,
            price: product.price,
            type: product.type,
            categorie:product.categorie,
            famille: product.famille,
         
        });
        setEditProductModalOpen(true);
    };

    const handleEditProductChange = (e) => {
        const { name, value } = e.target;
        setEditProductData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFileChange = (e) => {
        setEditProductData(prevState => ({ ...prevState, files: [...e.target.files] }));
    };

    const handleSaveEditProduct = () => {
        const formData = new FormData();
        if (editProductData.name ) {
            formData.append('name', editProductData.name);
            formData.append('description', editProductData.description);
            formData.append('type', editProductData.type);
            formData.append('famille', editProductData.famille);
            formData.append('categorie',editProductData.categorie);
      

            dispatch(updateProduct(selectedProductId, editProductData));
            setEditProductModalOpen(false);
        } else {
            console.error("One or more fields are undefined");
        }
    };

    const handleProductViewOpen = (productId) => {
        setSelectedProductId(productId);
        dispatch(getProductById(productId));
        setProductModalOpen(true);
    };

    const handleProductViewClose = () => {
        setProductModalOpen(false);
    };

    const handleCartViewOpen = (cartId) => {
        setSelectedCartId(cartId);
        dispatch(getCarttwo(cartId));
        setCartModalOpen(true);
    };

    const handleCartViewClose = () => {
        setCartModalOpen(false);
    };
    

    
    const [filteredProductTypes, setFilteredProductTypes] = useState([]);

    const handleProductFamilyChange = (e) => {
        const selectedFamily = e.target.value;
        setProductFamille(selectedFamily);
        setFilteredProductTypes(productTypeMapping[selectedFamily] || []);
        setProductType('');
    };
    const userRows = users.map((item) => ({
        id: item._id,
        username: item.username,
        email: item.email,
        // role: item.roles[0].name
    }));

    const userColumns = [
        { field: 'id', headerName: 'ID', width: 250 },
        { field: 'username', headerName: 'Username', width: 200 },
        { field: 'role', headerName: 'Role', width: 200 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 180,
            renderCell: (params) => (
                <RoleSelector userId={params.id} role={params.row.role} />
            )
        },
    ];

    const productColumns = [
     
        { field: 'REF', headerName: 'REF', width: 100 },
        
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 150 },
       
        { field: 'type', headerName: 'Type', width: 150 },
        {field:'categorie',headerName:'Cetgorie',width:100},
        { field: 'famille', headerName: 'Famille', width: 200 },
       
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <strong>
                    <IconButton color="primary" aria-label="view" onClick={() => handleProductViewOpen(params.row.realProductId)}>
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton color="info" aria-label="edit" onClick={() => handleProductEditClick(params.row.realProductId)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleProductDeleteConfirm(params.row.realProductId)}>
                        <DeleteIcon />
                    </IconButton>
                </strong>
            ),
        },
    ];

    const productRows = products.map((product, index) => ({
        id: index,
        realProductId: product._id,
        REF:product.REF,
        name: product.name,
        description: product.description,
        categorie:product.categorie,
        type: product.type,
        famille: product.famille,
    
    }));

    const cartColumns = [
        { field: 'cartId', headerName: 'Cart ID', width: 200 },
        { field: 'userName', headerName: 'User Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'phoneNumber', headerName: 'Number', width: 150 },
        { field: 'message', headerName: 'Message', width: 150 },
     
        {
            field: 'productDetails',
            headerName: 'Products',
            width: 400,
            renderCell: (params) => (
                <Tooltip
                    title={
                        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, lineHeight: '1.5' }}>
                            {params.value.split('\n').map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    }
                    enterDelay={300}
                    leaveDelay={200}
                    placement="top"
                >
                    <div>
                        <ul style={{ listStyleType: 'none', margin: 0, padding: 0, lineHeight: '1.5' }}>
                            {params.value.split('\n').map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </Tooltip>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 180,
            renderCell: (params) => (
                <strong>
                    <IconButton color="primary" aria-label="view" onClick={() => handleCartViewOpen(params.row.cartId)}>
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton color="info" aria-label="edit" onClick={() => handleEditClick(params.id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteClick(params.id)}>
                        <DeleteIcon />
                    </IconButton>
                </strong>
            ),
        },
    ];

    const cartRows = carts.map(cart => {
        // No need for conditional checks, handle missing data gracefully in the modal
        const productDetails = cart.items.reduce((details, item) => {
            const detail = `${item.product?.name || 'Unknown'} (Qty: ${item.quantity})`;
            return details ? `${details}\n${detail}` : detail;
        }, "");

        return {
            id: cart._id,
            cartId: cart.cartId,
            userName: cart.userInfo?.name || 'Unknown',
            email: cart.userInfo?.email || 'Unknown',
            phoneNumber: cart.userInfo?.phoneNumber || 'Unknown',
            message: cart.userInfo?.message || 'Unknown',
       
            productDetails: productDetails
        };
    });

    // Data for the pie chart
    const pieData = {
        labels: ['Products', 'Devis'],
        datasets: [{
            data: [products.length, carts.length],
            backgroundColor: ['#073352', '#36A2EB'],
            hoverBackgroundColor: ['#073352', '#36A2EB']
        }]
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <div style={{ width: '400px' }}>
                    <Pie data={pieData} />
                </div>
            </div>


            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' , marginTop:'2rem', padding:'5rem' ,gap:'1rem' }}>
            <CarouselTables/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' , marginTop:'2rem' , padding:'5rem',gap:'1rem' }}>
            <CatalogueTables/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' , marginTop:'2rem' , padding:'5rem',gap:'1rem' }}>
            <AboutTables/>
            </div>
           
           
            <h1 style={{ marginBottom: "5rem", marginTop: "5rem" }}>Devis Table</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={cartRows}
                    columns={cartColumns}
                    pageSize={5}
                    checkboxSelection
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#ff6347',
                            color: 'black',
                            borderRadius: '10px'
                        },
                        '& .MuiDataGrid-cell': {
                            borderRadius: '10px'
                        },
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }}
                />
            </div>

            <div style={{ height: 400, width: '100%' }}>
                <h1 style={{ marginBottom: "5rem", marginTop: "5rem" }}>User Table</h1>
                <DataGrid
                    rows={userRows}
                    columns={userColumns}
                    pageSize={5}
                    checkboxSelection
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#ff6347',
                            color: 'black',
                            borderRadius: '10px'
                        },
                        '& .MuiDataGrid-cell': {
                            borderRadius: '10px'
                        },
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }}
                />
            </div>

            <h1 style={{ marginBottom: "5rem", marginTop: "10rem" }}>Product Table</h1>
            <div style={{ height: 800, width: '100%', marginTop: '20px', marginBottom: '20rem' }}>
                <Button variant="contained" color="secondary" onClick={() => setAddProductModalOpen(true)}>Ajouter Produit</Button>
                <DataGrid
                    rows={productRows}
                    columns={productColumns}
                    pageSize={5}
                    checkboxSelection
                    rowHeight={120}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#ff6347',
                            color: 'black',
                            borderRadius: '10px'
                        },
                        '& .MuiDataGrid-cell': {
                            borderRadius: '10px'
                        },
                        '& .MuiDataGrid-cell:hover': {
                            color: 'primary.main',
                        },
                    }}
                />
            </div>

            <Modal
                open={addProductModalOpen}
                onClose={() => setAddProductModalOpen(false)}
                aria-labelledby="add-product-modal-title"
                aria-describedby="add-product-modal-description"
            >
                <Box sx={style}>
                    <Typography id="add-product-modal-title" variant="h6" component="h2" sx={titleStyle}>
                        Ajouter un produit
                    </Typography>
                    <Box component="form" noValidate autoComplete="off" sx={{ '& .MuiTextField-root': { mb: 2 } }}>
                        <TextField
                            label="Nom du produit"
                            fullWidth
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                           <TextField
                            label="REF du produit"
                            fullWidth
                            value={productRef}
                            onChange={(e) => setProductRef(e.target.value)}
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        />
                     
                     <TextField
                            label="Famille"
                            fullWidth
                            select
                            value={productFamille}
                            onChange={handleProductFamilyChange}
                        >
                            {productFamilies.map((family, index) => (
                                <MenuItem key={index} value={family}>
                                    {family}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Type"
                            fullWidth
                            select
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                            disabled={!productFamille}
                        >
                            {filteredProductTypes.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Categorie"
                            fullWidth
                            select
                            value={productCategorie}
                            onChange={(e) => setProductCategorie(e.target.value)}
                        >
                            {productCategories.map((category, index) => (
                                <MenuItem key={index} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </TextField>
                     
                      
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" onClick={handleAddProduct} color="primary">
                                Sauvegarder
                            </Button>
                            <Button variant="outlined" onClick={() => setAddProductModalOpen(false)} sx={{ ml: 2 }}>
                                Annuler
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={productConfirmOpen}
                onClose={() => setProductConfirmOpen(false)}
                aria-labelledby="product-delete-confirm-title"
                aria-describedby="product-delete-confirm-description"
            >
                <Box sx={style}>
                    <Typography id="product-delete-confirm-title" variant="h6" component="h2" sx={titleStyle}>
                        Confirmer la suppression du produit
                    </Typography>
                    <Typography id="product-delete-confirm-description" sx={{ mt: 2, ...labelStyle }}>
                        Êtes-vous sûr de vouloir supprimer ce produit ?
                    </Typography>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={handleProductDelete} color="error">
                            Confirmer
                        </Button>
                        <Button variant="outlined" onClick={() => setProductConfirmOpen(false)} sx={{ ml: 2 }}>
                            Annuler
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={productModalOpen}
                onClose={handleProductViewClose}
                aria-labelledby="product-view-modal-title"
                aria-describedby="product-view-modal-description"
            >
                <Box sx={style}>
                    <Typography id="product-view-modal-title" variant="h6" component="h2" sx={titleStyle}>
                        Détails du Produit
                    </Typography>
                    {productDetail ? (
                        <Typography id="product-view-modal-description" sx={{ mt: 2, ...valueStyle }}>
                            <span style={labelStyle}>REF:</span> {productDetail.REF}<br />
                            <span style={labelStyle}>Nom:</span> {productDetail.name}<br />
                            <span style={labelStyle}>Description:</span> {productDetail.description}<br />
                            <span style={labelStyle}>Type:</span> {productDetail.type}<br />
                            <span style={labelStyle}>Famille:</span> {productDetail.famille}<br />
                            <span style={labelStyle}>Categorie:</span> {productDetail.categorie}<br />
                         
                        </Typography>
                    ) : (
                        <Typography id="product-view-modal-description" sx={{ mt: 2, ...valueStyle }}>
                            Chargement des détails...
                        </Typography>
                    )}
                </Box>
            </Modal>

            <Modal
                open={editProductModalOpen}
                onClose={handleClose}
                aria-labelledby="edit-product-modal-title"
                aria-describedby="edit-product-modal-description"
            >
                <Box sx={style}>
                    <Typography id="edit-product-modal-title" variant="h6" component="h2" sx={titleStyle}>
                        Modifier le produit
                    </Typography>
                    <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
                        <TextField
                            label="Name"
                            fullWidth
                            required
                            value={editProductData.name}
                            onChange={(e) => setEditProductData(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            required
                            value={editProductData.description}
                            onChange={(e) => setEditProductData(prev => ({ ...prev, description: e.target.value }))}
                        />
                
                        <TextField
                            label="Type"
                            fullWidth
                            required
                            value={editProductData.type}
                            onChange={(e) => setEditProductData(prev => ({ ...prev, type: e.target.value }))}
                        />
                        <TextField
                            label="Famille"
                            fullWidth
                            required
                            value={editProductData.famille}
                            onChange={(e) => setEditProductData(prev => ({ ...prev, famille: e.target.value }))}
                        />
                         <TextField
                            label="Categorie"
                            fullWidth
                            required
                            value={editProductData.categorie}
                            onChange={(e) => setEditProductData(prev => ({ ...prev, categorie: e.target.value }))}
                        />
                      
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" onClick={handleSaveEditProduct} color="primary">
                                Sauvegarder
                            </Button>
                            <Button variant="outlined" onClick={handleClose} sx={{ ml: 2 }}>
                                Annuler
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={cartModalOpen}
                onClose={handleCartViewClose}
                aria-labelledby="cart-view-modal-title"
                aria-describedby="cart-view-modal-description"
            >
                <Box sx={style}>
                    <Typography id="cart-view-modal-title" variant="h6" component="h2" sx={titleStyle}>
                        Détails du Cart
                    </Typography>
                    {cartDetail ? (
                        <Typography id="cart-view-modal-description" sx={{ mt: 2, ...valueStyle }}>
                            <span style={labelStyle}>Cart ID:</span> {cartDetail.cartId}<br />
                            <span style={labelStyle}>User Name:</span> {cartDetail.userInfo?.name || 'Unknown'}<br />
                            <span style={labelStyle}>Email:</span> {cartDetail.userInfo?.email || 'Unknown'}<br />
                            <span style={labelStyle}>Phone Number:</span> {cartDetail.userInfo?.phoneNumber || 'Unknown'}<br />
                            <span style={labelStyle}>Message:</span> {cartDetail.userInfo?.message || 'Unknown'}<br />
                          
                            <span style={labelStyle}>Products:</span> {cartDetail.items.map((item, index) => (
                                <>
                                <div key={index}>
                                 REF : {item.product?.REF || 'Unknown'}  {item.product?.name || 'Unknown'} (Qty: {item.quantity})
                                </div>
                               
                                </>
                                
                            ))}
                        </Typography>
                    ) : (
                        <Typography id="cart-view-modal-description" sx={{ mt: 2, ...valueStyle }}>
                            Chargement des détails...
                        </Typography>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default Tables;
