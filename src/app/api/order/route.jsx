// app/api/order/route.js

import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  const { amount, currency } = await request.json();

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: currency,
    receipt: 'receipt_order_74394',
  };

  try {
    const order = await razorpay.orders.create(options);
    return new Response(JSON.stringify({ orderId: order.id }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
