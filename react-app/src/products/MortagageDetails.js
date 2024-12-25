import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Details.css';

function MortagegeDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const { principal, annualRate, years, monthlyPayment,extraMonthlyPayment } = location.state;
  const monthlyRate = annualRate/12;
  const numPayments = years * 12;
  let balance = principal;
  let extraPayment = 0

  if(extraMonthlyPayment === undefined) {
    extraPayment = 0;
  } else {
    extraPayment = extraMonthlyPayment;
  }

  // Generate the amortization schedule
  const schedule = [];
  for (let month = 1; month <= numPayments; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment ;
    balance = balance - principalPayment - extraPayment;
    if (balance < 0) balance = 0;

    schedule.push({
      month,
      payment: monthlyPayment,
      interest: interestPayment.toFixed(2),
      principal: principalPayment.toFixed(2),
      balance: balance.toFixed(2),
    });

    if (balance <= 0) break;
  }

  const gotoOverView = () => {
    localStorage.setItem('principal', principal);
    localStorage.setItem('annualRate', annualRate);
    localStorage.setItem('years', years);
    navigate('/loanCaluclator');
  };

  return (
    <div className="container">
      <h2>Amortization Schedule</h2>
      <button onClick={() => gotoOverView()}>Back to Overview</button>
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Payment ($)</th>
            <th>Interest ($)</th>
            <th>Principal ($)</th>
            <th>Balance ($)</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((row) => (
            <tr key={row.month}>
              <td>{row.month}</td>
              <td>{row.payment}</td>
              <td>{row.interest}</td>
              <td>{row.principal}</td>
              <td>{row.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default MortagegeDetails;
