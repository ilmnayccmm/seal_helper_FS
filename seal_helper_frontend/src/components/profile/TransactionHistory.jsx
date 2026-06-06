import React from 'react';
import {
    Box, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, Chip,
    Accordion, AccordionSummary, AccordionDetails, Button
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HistoryIcon from '@mui/icons-material/History';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

const TransactionHistory = ({transactions, name}) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'success';
            case 'pending': return 'warning';
            case 'failed': return 'error';
            default: return 'default';
        }
    };

    const handleDownloadCSV = () => {
        if (!transactions || transactions.length === 0) {
            alert("No transactions to download.");
            return;
        }

        const headers = ["Date", "Support Target", "Status", "Amount"];
        const rows = transactions.map(tx => [
            tx.date,
            tx.seal_name ? tx.seal_name : "General Donation",
            tx.status,
            parseFloat(tx.amount).toFixed(2)
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${name}_transactions_history.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Accordion sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="transaction-content"
                    id="transaction-header"
                    sx={{ backgroundColor: '#ffffff' }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                        <HistoryIcon color="primary" />
                        <Typography variant="h6" fontWeight="bold">
                            {`${name} History`}
                        </Typography>
                        <Chip
                            label={`${transactions?.length || 0} Records`}
                            size="small"
                            variant="outlined"
                            sx={{ ml: 2 }}
                        />
                        <Box sx={{ flexGrow: 1 }} />
                        <Button
                            variant="outlined"
                            startIcon={<CloudDownloadIcon />}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDownloadCSV();
                            }}
                            size="small"
                        >
                            Download CSV
                        </Button>
                    </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 0, bgcolor: '#fff'}}>
                    <TableContainer component={Paper} elevation={0} >
                        <Table sx={{ minWidth: 650 }} aria-label="transaction history table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#ffffff' }}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Support Target</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody sx={{backgroundColor: '#ffffff'}}>
                                {transactions && transactions.length > 0 ? (
                                    transactions.map((tx) => (
                                        <TableRow
                                            key={tx.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                                        >
                                            <TableCell component="th" scope="row">
                                                {tx.date}
                                            </TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    {tx.seal_name ? "🦭 " + tx.seal_name : "General Donation"}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={tx.status}
                                                    size="small"
                                                    color={getStatusColor(tx.status)}
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell align="right" sx={{ fontWeight: 'bold', color: 'green' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                                                    <MonetizationOnIcon fontSize="small" />
                                                    {parseFloat(tx.amount).toFixed(2)}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            <Typography variant="body2" sx={{ py: 3, color: 'text.secondary', fontStyle: 'italic' }}>
                                                No transactions found yet.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default TransactionHistory;