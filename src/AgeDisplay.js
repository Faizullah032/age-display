// import React, { useState } from 'react';

// function AgeDisplay() {
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleAgeChange = (e) => {
//     setAge(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (age >= 1) {
//       setErrorMessage('');
//     } else {
//       setErrorMessage('Age must be at least 1 year old.');
//       return;
//     }
//   };

//   return (
//     <div>
//       <h1>Enter Your Name and Age</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" value={name} onChange={handleNameChange} />
//         </div>
//         <div>
//           <label>Age:</label>
//           <input type="number" value={age} onChange={handleAgeChange} />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       <div>
//         {errorMessage && <p className="error">{errorMessage}</p>}
//         {age >= 1 && (
//           <div>
//             <h2>Your Information:</h2>
//             <p>Name: {name}</p>
//             <p>Age: {age} years old</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AgeDisplay;















import React, { useState } from 'react';
import './AgeDisplay.css'; 

function AgeDisplay() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNameChange = (e) => {
    const value = e.target.value;
    // Allow only letters and spaces
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setName(value);
    }
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setAge(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim()) {
      setErrorMessage('Please enter a valid name');
      return;
    }
    
    if (!age || parseInt(age) < 1 || parseInt(age) > 150) {
      setErrorMessage('Age must be between 1 and 150 years');
      return;
    }

    setErrorMessage('');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setAge('');
    setErrorMessage('');
    setIsSubmitted(false);
  };

  return (
    <div className="age-display-container">
      <h1 className="title">Personal Information Card</h1>
      <form onSubmit={handleSubmit} className="age-form">
        <div className="input-group">
          <label htmlFor="name">Full Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="input-field"
            maxLength={50}
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="age">Age:</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={handleAgeChange}
            placeholder="Enter your age"
            className="input-field"
            min="1"
            max="150"
          />
        </div>

        <div className="button-group">
          <button type="submit" className="submit-btn">
            Show My Card
          </button>
          <button type="button" onClick={handleReset} className="reset-btn">
            Reset
          </button>
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {isSubmitted && !errorMessage && (
        <div className="result-card">
          <h2 className="result-title">Your Personal Card</h2>
          <div className="card-content">
            <p><span className="label">Name:</span> {name}</p>
            <p><span className="label">Age:</span> {age} years old</p>
            <p><span className="label">Generation:</span> {getGeneration(parseInt(age))}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to determine generation
const getGeneration = (age) => {
  const currentYear = new Date().getFullYear();
  const birthYear = currentYear - age;

  if (birthYear >= 2013) return 'Generation Alpha';
  if (birthYear >= 1997) return 'Generation Z';
  if (birthYear >= 1981) return 'Millennial';
  if (birthYear >= 1965) return 'Generation X';
  if (birthYear >= 1946) return 'Baby Boomer';
  return 'Silent Generation';
};

export default AgeDisplay;