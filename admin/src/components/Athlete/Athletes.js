// import node modules
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";

// import routes
import getAthletes from "../../routes/athlete/getAthletes";

// import components
import AthleteDetails from "./AthleteDetails";
import AddAthleteForm from "./forms/AddAthleteForm";

function AddAthleteDialog(props) {
    const { open, onClose, onSubmit } = props;

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Add Athlete</DialogTitle>
            <AddAthleteForm onSubmit={onSubmit} />
        </Dialog>
    )
}

function AthleteDetailsDialog(props) {
    const { selectedAthlete, open, onClose, onSubmit, onDelete } = props;

    return (
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>Athlete Details</DialogTitle>
            <AthleteDetails athlete={selectedAthlete} onSubmit={onSubmit} onDelete={onDelete} />
        </Dialog>
    )
}


export default function Athletes() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [displayDetails, setDisplayDetails] = useState(false);
    const [displayAdd, setDisplayAdd] = useState(false);
    const [athlete, setAthlete] = useState(undefined);

    const handleOpenEditAthlete = (athlete) => {
        console.log("Open Edit Athlete");
        setAthlete(athlete);
        setDisplayDetails(true);
    };

    const handleOpenAddAthlete = () => {
        console.log("Open Add Athlete");
        setDisplayAdd(true);
    };

    const handleCloseEditAthlete = () => {
        console.log("Close Edit Athlete");
        setDisplayDetails(false);
    };

    const handleCloseAddAthlete = () => {
        console.log("Close Add Athlete");
        setDisplayAdd(false);
    };

    const handleDeleteEditAthlete = () => {
        console.log("Handle Delete");
        setLoading(true);
        fetchData();
        handleCloseEditAthlete();
    };

    const handleSubmitEditAthlete = () => {
        console.log("Handle Edit Submit");
        setLoading(true);
        fetchData();
        handleCloseEditAthlete();
    };

    const handleSubmitAddAthlete = () => {
        console.log("Handle Add Submit");
        setLoading(true);
        fetchData();
        handleCloseAddAthlete();
    };

    async function fetchData() {
        console.log("Fetching list of athletes");

        try {
            const athletes = await getAthletes();
            setData(athletes);
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
                    <Button variant="contained" onClick={ () => handleOpenAddAthlete() }>
                        Add New Athlete
                    </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="Athletes table">
                        <TableHead>
                            <TableRow sx={{ 'th': { border: 1, borderColor: 'black', backgroundColor: 'gray', color: 'white', fontWeight: 'bold' } }}>
                                <TableCell>Id</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Sport</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map((athlete) => (
                                    <TableRow key={athlete.id} sx={{ 'td': { border: 1, borderColor: 'black', py: 0.5 } }} onClick={ () => handleOpenEditAthlete(athlete) }>
                                        <TableCell>{athlete.id}</TableCell>
                                        <TableCell>{athlete.first_name}</TableCell>
                                        <TableCell>{athlete.last_name}</TableCell>
                                        <TableCell>{athlete.sport}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <AthleteDetailsDialog
                selectedAthlete={athlete}
                open={displayDetails}
                onClose={handleCloseEditAthlete}
                onSubmit={handleSubmitEditAthlete}
                onDelete={handleDeleteEditAthlete}
            />
            <AddAthleteDialog
                open={displayAdd}
                onClose={handleCloseAddAthlete}
                onSubmit={handleSubmitAddAthlete}
            />
        </div>
    );
};