import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentButton from '../components/PaymentButton';
import LogoIcon from '../assets/Logo-icon.png';
import "../css/Donation.css"

const DonationPage = () => {
    const [amount, setAmount] = useState('');
    const [isValidAmount, setIsValidAmount] = useState(true);

    const handleAmountChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && value > 0) {
            setAmount(value);
            setIsValidAmount(true);
        } else {
            setIsValidAmount(false);
        }
    };

    return (
        <Container maxWidth="sm" className="donation-container">
            <Box display="flex" flexDirection="column" alignItems="center" p={4} borderRadius={2} boxShadow={3}>
                <img src={LogoIcon} alt="Orbit IQ Logo" className="logo-img" />
                <Typography variant="h4" component="h1" gutterBottom>
                    Support Orbit IQ
                </Typography>
                <Typography variant="body1" paragraph>
                    Your donation helps us continue our mission to provide the best learning platform about outer space.
                </Typography>
                <TextField
                    label="Donation Amount"
                    variant="outlined"
                    fullWidth
                    value={amount}
                    onChange={handleAmountChange}
                    error={!isValidAmount}
                    helperText={!isValidAmount && "Please enter a valid amount"}
                    margin="normal"
                    InputLabelProps={{ style: { color: "white" } }}
                    InputProps={{
                        style: {
                            borderBottom: "1px solid white",
                            color: "white",
                            borderRadius: 0,
                        },
                    }}
                />
                <PaymentButton amount={amount} />
            </Box>
            <ToastContainer />
        </Container>
    );
};

export default DonationPage;
