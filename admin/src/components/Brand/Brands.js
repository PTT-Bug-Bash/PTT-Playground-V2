// import node modules
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, Button, Container } from "@mui/material";
import { useEffect, useState } from 'react';

// import routes
import getBusinesses from "../../routes/business/getBusinesses";

// import components
import BrandDetails from "./BrandDetails";
import AddBrandForm from './forms/AddBrandForm';

function AddBrandDialog(props) {
    const { open, onClose, onSubmit } = props

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Add Brand</DialogTitle>
            <AddBrandForm onSubmit={onSubmit} />
        </Dialog>
    )
}

function BrandDetailsDialog(props) {
    const { selectedBrand, open, onClose, onSubmit, onDelete } = props;

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Brand Details</DialogTitle>
            <BrandDetails brand={selectedBrand} onSubmit={onSubmit} onDelete={onDelete} />
        </Dialog>
    )
}

export default function Brands() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [displayDetails, setDisplayDetails] = useState(false);
    const [displayAdd, setDisplayAdd] = useState(false);
    const [brand, setBrand] = useState(undefined);

    const  handleOpenEditBrand = (brand) => {
        console.log("Open Edit Brand");
        setBrand(brand);
        setDisplayDetails(true);
    };

    const handleOpenAddBrand = () => {
        console.log("Open Add Brand");
        setDisplayAdd(true);
    };

    const handleCloseEditBrand = () => {
        console.log("Close Edit Brand");
        setDisplayDetails(false);
    };

    const handleCloseAddBrand = () => {
        console.log("Close Add Brand");
        setDisplayAdd(false);
    };

    const handleDeleteEditBrand = () => {
        console.log("Handle Delete");
        setLoading(true);
        fetchData();
        handleCloseEditBrand();
    };

    const handleSubmitEditBrand = () => {
        console.log("Handle Edit Submit");
        setLoading(true);
        fetchData();
        handleCloseEditBrand();
    };

    const handleSubmitAddBrand = () => {
        console.log("Handle Add Submit");
        setLoading(true);
        fetchData();
        handleCloseAddBrand();
    };

    async function fetchData() {
        console.log("Fetching list of brands");

        try {
            const brands = await getBusinesses();
            setData(brands);
        } catch (error) {
            setError(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Container maxWidth="xl" sx={{ mt: 4 }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
                >
                    <Button variant="contained" onClick={ () => handleOpenAddBrand() }>
                        Add New Brand
                    </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="Brands table">
                        <TableHead>
                            <TableRow sx={{ 'th': { border: 1, borderColor: 'black', backgroundColor: 'gray', color: 'white', fontWeight: 'bold' } }}>
                                <TableCell>Id</TableCell>
                                <TableCell>Brand Name</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((brand) => (
                                    <TableRow key={brand.id} sx={{ 'td': { border: 1, borderColor: 'black', py: 0.5 } }} onClick={() => handleOpenEditBrand(brand)}>
                                        <TableCell>{brand.id}</TableCell>
                                        <TableCell>{brand.business_name}</TableCell>
                                        <TableCell>{brand.first_name}</TableCell>
                                        <TableCell>{brand.last_name}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <BrandDetailsDialog
                selectedBrand={brand}
                open={displayDetails}
                onClose={handleCloseEditBrand}
                onSubmit={handleSubmitEditBrand}
                onDelete={handleDeleteEditBrand}
            />
            <AddBrandDialog
                open={displayAdd}
                onClose={handleCloseAddBrand}
                onSubmit={handleSubmitAddBrand}
            />
        </div>
    );
};