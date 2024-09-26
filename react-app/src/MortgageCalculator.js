import React, { useState } from 'react';

const MortgageCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [years, setYears] = useState('');
  const [extraPayment, setExtraPayment] = useState('');
  const [results, setResults] = useState({});

  const calculateMortgage = () => {
    const principalAmount = parseFloat(principal);
    const annualInterestRate = parseFloat(interestRate) / 100;
    const totalYears = parseFloat(years);
    const extraMonthlyPayment = parseFloat(extraPayment) || 0.00;

    const monthlyInterestRate = annualInterestRate / 12;
    const totalPayments = totalYears * 12;

    const monthlyPayment =
      (principalAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

    const totalMonthlyPayment = monthlyPayment + extraMonthlyPayment;

    const totalInterestPaid = monthlyPayment * totalPayments - principalAmount;
    const totalInterestPaidForYear = totalInterestPaid / totalYears;
    const totalInterestPaidForMonth = totalInterestPaidForYear / 12;

    let remainingBalance = principalAmount;
    let month = 0;

    while (remainingBalance > 0) {
      remainingBalance = remainingBalance * (1 + monthlyInterestRate) - totalMonthlyPayment;
      if (remainingBalance > 0) {
        month++;
      }
    }

    const remainingYears = (month / 12).toFixed(1);
    const totalInterestSavedWithExtraMoney = totalInterestPaidForYear * (totalYears - remainingYears);
    const totalInterestPaidWithExtraMoney = totalInterestPaid - totalInterestSavedWithExtraMoney;
    const totalInterestPaidForYearWithExtraMoney = totalInterestPaidWithExtraMoney / totalYears;
    const totalInterestPaidForMonthWithExtraMoney = totalInterestPaidForYearWithExtraMoney / 12;

    setResults({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalMonthlyPayment: totalMonthlyPayment.toFixed(2),
      remainingYears,
      totalInterestPaid: totalInterestPaid.toFixed(2),
      totalInterestPaidForYear: totalInterestPaidForYear.toFixed(2),
      totalInterestPaidForMonth: totalInterestPaidForMonth.toFixed(2),
      totalInterestPaidWithExtraPayment: totalInterestPaidWithExtraMoney.toFixed(2),
      totalInterestPaidForYearWithExtraPayment: totalInterestPaidForYearWithExtraMoney.toFixed(2),
      totalInterestPaidForMonthWithExtraPayment: totalInterestPaidForMonthWithExtraMoney.toFixed(2),
    });
  };

  return (
    <div className="container">
      <h2>Mortgage Calculator</h2>
      <label htmlFor="principal">Principal Amount ($):</label>
      <input
        type="number"
        id="principal"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
        placeholder="Enter principal amount"
      />

      <label htmlFor="interestRate">Interest Rate (% per year):</label>
      <input
        type="number"
        id="interestRate"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        placeholder="Enter annual interest rate"
      />

      <label htmlFor="years">Number of Years:</label>
      <input
        type="number"
        id="years"
        value={years}
        onChange={(e) => setYears(e.target.value)}
        placeholder="Enter number of years"
      />

      <label htmlFor="extraPayment">Extra Monthly Payment ($):</label>
      <input
        type="number"
        id="extraPayment"
        value={extraPayment}
        onChange={(e) => setExtraPayment(e.target.value)}
        placeholder="Enter extra payment (if any)"
      />

      <button onClick={calculateMortgage}>Calculate Mortgage</button>

      <div className="result">
        <p>Monthly Payment: ${results.monthlyPayment}</p>
        <p>Total Monthly Payment (including extra): ${results.totalMonthlyPayment}</p>
        <p>Remaining Years to Pay Off: {results.remainingYears} years</p>
        <p>Total Interest Paid: ${results.totalInterestPaid}</p>
        <p>Total Interest Paid For Year: ${results.totalInterestPaidForYear}</p>
        <p>Total Interest Paid For Month: ${results.totalInterestPaidForMonth}</p>
        <p>Total Interest Paid With Extra Payment: ${results.totalInterestPaidWithExtraPayment}</p>
        <p>Total Interest Paid For Year With Extra Payment: ${results.totalInterestPaidForYearWithExtraPayment}</p>
        <p>Total Interest Paid For Month With Extra Payment: ${results.totalInterestPaidForMonthWithExtraPayment}</p>
      </div>
    </div>
  );
};

export default MortgageCalculator;