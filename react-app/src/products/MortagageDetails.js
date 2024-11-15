import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './Details.css';

function MortagegeDetails() {
  const location = useLocation();
  const history = useHistory();

  const { principal, annualRate, years, monthlyPayment } = location.state;
  const monthlyRate = annualRate / 12 / 100;
  const numPayments = years * 12;
  let balance = principal;

  // Generate the amortization schedule
  const schedule = [];
  for (let month = 1; month <= numPayments; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
    if (balance < 0) balance = 0;

    schedule.push({
      month,
      payment: monthlyPayment.toFixed(2),
      interest: interestPayment.toFixed(2),
      principal: principalPayment.toFixed(2),
      balance: balance.toFixed(2),
    });

    if (balance <= 0) break;
  }

  return (
    <div className="container">
      <h2>Amortization Schedule</h2>
      <button onClick={() => history.push('/loanCaluclator')}>Back to Overview</button>
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
