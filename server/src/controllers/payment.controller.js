const Razorpay = require("razorpay");

const generateReceiptOrderID = () => Math.floor(100000 + Math.random() * 900000).toString();

const createOrder = async (req, res) => {
    const { amount } = req.body;

    try {
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount provided' });
        }
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: amount,
            currency: "INR",
            receipt: `receipt_order_${generateReceiptOrderID()}`,
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occurred");

        res.json(order);
    } catch (error) {
        console.error('Error creating payment order:', error);
        res.status(500).json({ error: 'Failed to create payment order' });
    }
};

module.exports = {
    createOrder,
};
