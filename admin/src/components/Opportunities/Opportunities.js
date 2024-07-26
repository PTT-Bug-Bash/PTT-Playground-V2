import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useEffect, useState } from "react";
import getOpportunities from '../../routes/campaign/getOpportunities';

export default function Opportunities() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const opportunities = await getOpportunities();
                setData(opportunities);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        fetchData();
    }, [data]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="Opportunities table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Sport</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.map((opportunity) => (
                            <TableRow>
                                <TableCell>{opportunity.id}</TableCell>
                                <TableCell>{opportunity.sports}</TableCell>
                                <TableCell>{opportunity.description}</TableCell>
                                <TableCell>{opportunity.event_type}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};