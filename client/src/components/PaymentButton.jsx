import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoIcon from '../assets/Logo-icon.png';

const API_URI = `${import.meta.env.VITE_API_URI}`;

const PaymentButton = ({ amount }) => {
    const [loading, setLoading] = useState(false);

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        if (!amount || isNaN(amount) || amount <= 0) {
            toast.error('Please enter a valid amount.');
            return;
        }

        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            toast.error('Razorpay SDK failed to load. Are you online?');
            return;
        }

        setLoading(true);
        try {
            const result = await axios.post(`${API_URI}/payment`, { amount: amount * 100 });

            if (!result) {
                toast.error('Server error. Are you online?');
                setLoading(false);
                return;
            }

            const { amount: orderAmount, id: order_id, currency } = result.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: orderAmount.toString(),
                currency: currency,
                name: 'Orbit IQ Learning Platform',
                description: 'Premium Subscription',
                image: LogoIcon,
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        orderCreationId: order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    const result = await axios.post(`${API_URI}/payment/success`, data);

                    toast.success(result.data.msg);
                },
                prefill: {
                    name: 'Swasti Mohanty',
                    email: 'orbitiq.team@gmail.com',
                    contact: '8295057353',
                },
                notes: {
                    address: 'Orbit IQ Learning Platform, Chitkara University, Baddi',
                },
                theme: {
                    color: '#0a3d62',
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            toast.error('Error occurred during payment');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Button onClick={displayRazorpay} disabled={loading} variant="contained" color="primary">
                {loading ? <CircularProgress size={24} /> : 'Donate Now'}
            </Button>
            <ToastContainer />
        </>
    );
};

export default PaymentButton;
