import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';

const EMICalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(principal);
    const R = parseFloat(interestRate) / 12 / 100; // Monthly interest rate
    const N = parseInt(tenure) * 12; // Total number of months

    const EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = EMI * N;
    const totalInterest = totalPayment - P;

    setEmi(EMI.toFixed(2));
    setTotalInterest(totalInterest.toFixed(2));
    setTotalPayment(totalPayment.toFixed(2));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-1">
      <h2 className="text-2xl font-bold text-start mb-6">Cars EMI Calculator</h2>
      <div className="flex flex-col gap-6 justify-start items-start">
        <Input
          label="Principal Amount"
          type="number"
          placeholder="Enter principal amount"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          labelPlacement="outside"
        />
        <Input
          label="Annual Interest Rate (%)"
          type="number"
          placeholder="Enter interest rate"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          labelPlacement="outside"
        />
        <Input
          label="Tenure (in years)"
          type="number"
          placeholder="Enter tenure in years"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          labelPlacement="outside"
        />
        <Button onClick={calculateEMI} className="w-2/3 bg-black text-white">
          Calculate EMI
        </Button>
      </div>
      {emi && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-medium">Results:</h3>
          <p className="text-gray-700 mt-2">Your Monthly EMI: ₹{emi}</p>
          <p className="text-gray-700">Total Interest Payable: ₹{totalInterest}</p>
          <p className="text-gray-700">Total Payment (Principal + Interest): ₹{totalPayment}</p>
        </div>
      )}
    </div>
  );
};

export default EMICalculator;
