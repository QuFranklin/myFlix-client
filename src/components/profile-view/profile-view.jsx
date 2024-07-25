import React from 'react';

export const ProfileView = () => {
  const user = JSON.parse(localStorage.getItem('user'));


  return (
    <div>
      <h2>Account Information</h2>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.Username}</p>
          <p><strong>Email:</strong> {user.Email}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};


