import React, { useEffect, useState } from "react";
import api_instance from "../services/api.js"; // Using your api instance
import { Container, Grid, Typography, Box, Divider } from "@mui/material";
import SealCardComponent from "../components/seals/SealCardComponent.jsx";
import LoadingSpinner from "../components/loading/LoadingSpinner.jsx";

function AllSealsPage() {
    const [seals, setSeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api_instance.get('seals/')
            .then(res => {
                // Adjust res.data depending on if your API returns .results or just the array
                const data = res.data.results || res.data;
                setSeals(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <h1>Adopt a Seal</h1>
            <Container maxWidth="xl" sx={{ py: 2 , display: "flex", justifyContent: "center" }}>

                <Grid
                    container
                    spacing={12} // This creates the "4 unit" (32px) gap between cards
                    sx={{ justifyContent: { xs: 'center', md: 'space-even' } }}
                >
                    {seals.length > 0 ? (
                        seals.map(seal => (
                            <Grid
                                item
                                key={seal.id}
                                // xs=12 (1 col on mobile)
                                // sm=6 (2 cols on tablet)
                                // md=4 (3 cols on small laptops)
                                // lg=3 (4 cols on desktop)
                                xs={12} sm={6} md={4} lg={3}
                                display="flex"
                                justifyContent="center"
                            >
                                <SealCardComponent seal={seal} />
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography>No seals found.</Typography>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>
    );
}

export default AllSealsPage;