import React, { useEffect, useState } from 'react';

const FeeAmount: React.FC = () => {
  const [fee, setFee] = useState('0.01 ETH'); // Mocked fee amount

  useEffect(() => {
    // Mock fetching fee amount from another library
    const fetchFee = async () => {
      // Simulate an API call
      setTimeout(() => {
        setFee('0.01 ETH'); // Mocked fee amount
      }, 1000);
    };

    fetchFee();
  }, []);

  return (
    <div className="fee-amount">
      <strong>Fee:</strong> {fee}
    </div>
  );
};

export default FeeAmount;