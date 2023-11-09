import React, { useState } from 'react';

function QRCodeGenerator() {
  const [userData, setUserData] = useState('');
  const [qrCodeURL, setQRCodeURL] = useState('');
  const [qrCodePath, setQRCodePath] = useState('');

  const handleGenerateQRCode = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://qrc-gen-api.onrender.com/generate', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: userData }),
      });

      if (response.ok) {
        const result = await response.json();
        setQRCodeURL(result.data.url);
        setQRCodePath(result.data.path);
      } else {
        // Handle API errors
        console.error('QR code generation failed.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred while generating the QR code.');
    }
  };

  const handleDeleteQRCode = async () => {
    try {
      const response = await fetch('https://qrc-gen-api.onrender.com/delete', {
        method: 'DELETE',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file_url: qrCodeURL }),
      });

      if (response.ok) {
        // QR code deleted successfully, clear the URL and path
        setQRCodeURL('');
        setQRCodePath('');
      } else {
        // Handle API errors
        console.error('QR code deletion failed.');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('An error occurred while deleting the QR code.');
    }
  };

  return (
    <div>
      <div id='overlay'></div>
      <h1>QR Code Generator</h1>
      <form onSubmit={handleGenerateQRCode}>
        <label>
          Enter the data for your QR code:
          <input
            type="text"
            value={userData}
            onChange={(e) => setUserData(e.target.value)}
          />
        </label>
        <button type="submit">Generate QR Code</button>
      </form>

      {qrCodeURL && (
        <div id='qrdiv'>
          <h3>Qr Code:</h3>
          <img src={qrCodeURL} alt="QR Code" />
          <button onClick={handleDeleteQRCode}>Delete QR Code</button>
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;
