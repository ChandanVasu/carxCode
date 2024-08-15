import React, { useState } from 'react';

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
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-start mb-6">Cars EMI Calculat</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="principal" className="block text-sm font-medium text-gray-700">Principal Amount</label>
          <input
            id="principal"
            type="number"
            placeholder="Enter principal amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">Annual Interest Rate (%)</label>
          <input
            id="interestRate"
            type="number"
            placeholder="Enter interest rate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="tenure" className="block text-sm font-medium text-gray-700">Tenure (in years)</label>
          <input
            id="tenure"
            type="number"
            placeholder="Enter tenure in years"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          onClick={calculateEMI}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Calculate EMI
        </button>
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
