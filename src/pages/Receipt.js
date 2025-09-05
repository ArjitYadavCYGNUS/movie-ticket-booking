

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Receipt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    movie,
    selectedDate,
    selectedTime,
    selectedSeats,
    total = 0,
    paymentId,
  } = location.state || {};

  if (!movie) {
    return <div style={{ padding: 20 }}>No booking found.</div>;
  }

  const downloadReceipt = () => {
    const input = document.getElementById('receipt-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`receipt-${movie.title.replace(/\s+/g, '_')}.pdf`);
    });
  };

  return (
    <div style={{ padding: 20, maxWidth: '100%', margin: '0 auto' }}>
      <div
        id="receipt-content"
        style={{
          background: '#124a8a',
          padding: '20px',
          borderRadius: '10px',
          border: '1px solid #ddd',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          margin: '0 auto',
          color: '#fff',
          wordWrap: 'break-word',
        }}
      >
        <h2 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>🎉 Booking Confirmed!</h2>
        <h3 style={{ color: '#00d0ff', marginBottom: '15px', fontSize: '1.2rem' }}>{movie.title}</h3>

        <p><strong>Date:</strong> {selectedDate}</p>
        <p><strong>Time:</strong> {selectedTime}</p>
        <p><strong>Seats:</strong> {selectedSeats.join(', ')}</p>
        <p><strong>Total Paid:</strong> ₹{total}</p>

        {paymentId && (
          <>
            <p style={{ marginTop: '10px' }}>
              <strong>Payment ID:</strong> {paymentId}
            </p>
            <div
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                display: 'inline-block',
                padding: '5px 12px',
                borderRadius: '20px',
                fontWeight: 'bold',
                marginTop: '10px',
              }}
            >
              ✅ Paid via Razorpay
            </div>
          </>
        )}
      </div>

      {/* Buttons */}
      <div
        style={{
          marginTop: 20,
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#124a8a',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            minWidth: '150px',
          }}
        >
          🔙 Back to Home
        </button>

        <button
          onClick={downloadReceipt}
          style={{
            padding: '10px 20px',
            backgroundColor: '#124a8a',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            minWidth: '150px',
          }}
        >
          📥 Download Receipt
        </button>
      </div>
    </div>
  );
};

export default Receipt;





