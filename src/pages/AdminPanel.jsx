import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/artisans')
      .then(response => setArtisans(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleApprove = (id) => {
    axios.post(`http://localhost:5000/api/admin/approve/${id}`)
      .then(response => alert('Artisan approved'))
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <div className="row">
        {artisans.map(artisan => (
          <div className="col-md-4" key={artisan._id}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{artisan.name}</h5>
                <button className="btn btn-success" onClick={() => handleApprove(artisan._id)}>Approve</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
