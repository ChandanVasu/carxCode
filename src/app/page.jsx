// app/payment/page.js

'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { image } from '@nextui-org/theme';

export default function PaymentPage() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, currency }),
      });

      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Add your Razorpay Key ID here
        amount: amount * 100,
        currency: currency,
        name: 'Rich Indai',
        description: 'Test Transaction',
        image:"/logo.png",
        order_id: data.orderId,
        handler: function (response) {
          alert('Payment Successful!');
          console.log(response);
        },
        prefill: {
          name: name,
          email: email,
        },
        theme: {
          color: 'red',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="payment-container">
        <h1>Make a Payment</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handlePayment}>Pay Now</button>
      </div>
    </>
  );
}
