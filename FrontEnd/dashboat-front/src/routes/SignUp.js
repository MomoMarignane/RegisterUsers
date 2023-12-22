import React, { useState } from 'react';
import './SignUp.css';
import bgImg from '../DashBoatWallpaper.jpg';
import axios from 'axios';

const isValidEmail = (email) => {
  if (email.trim() === '')
    return true;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|fr|net|org|edu|gov|mil|io|co|uk|eu)$/i;
  return emailPattern.test(email);
};

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (event) => {
      event.preventDefault();

      // Réinitialiser les erreurs
      setPasswordError('');

    if (password !== confirmPassword) {
      setPasswordError("!");
      return;
    }

    if (password.length < 6 && password.length > 0) {
      setPasswordError("!");
      return;
    }

    if (!isEmailValid) {
      setEmailError("!");
      return;
    }

    const fields = [
      { value: username, name: "Username" },
      { value: email, name: "Email" },
      { value: age, name: "Age" },
      { value: password, name: "Password" },
      { value: confirmPassword, name: "Confirm Password" },
    ];

    const emptyFieldNames = fields
      .filter((field) => !field.value)
      .map((field) => field.name);

      if (emptyFieldNames.length > 0) {
        setEmptyFields(emptyFieldNames);
        return;
      } else {
        // console.log('Username:', username);
        // console.log('Email:', email);
        // console.log('Age: ', age);
        // console.log('Password:', password);
        // console.log('Confirm Password:', confirmPassword);
        try {
          const response = await axios.post('http://localhost:8080/signup', {
            name: username,
            age: age,
            mail: email,
            password: password,
          });

          if (response.status === 200) {
            // L'inscription a réussi, vous pouvez afficher un message de succès ici.
            console.log('insccription fine');
          }
        } catch (error) {
          // En cas d'erreur, vous pouvez afficher un message d'erreur ici.
          console.error('Erreur lors de l\'inscription :', error.message);
        }
      }
    // Réinitialiser les champs du formulaire
    setUsername('');
    setEmail('');
    setAge('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleEmailBlur = () => {
    if (!isValidEmail(email)) {
    setEmailError('!');
    setIsEmailValid(false);
  } else {
    setEmailError('');
    setIsEmailValid(true);
  }
  };

  return (
    <body className="signup-body" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="independent-overlay"></div>

      <div className="signup-container">
        <h2 className='title-signup-page'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" className='form-label'>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='form-input'
          />

          <label htmlFor="email" className='form-label'>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur} // Appel de la vérification lors de la perte de focus
            className='form-input'
          />
          {(!isEmailValid || emailError) && <p className="error-message">{emailError}</p>}
          <label htmlFor="age" className='form-label'>Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className='form-input'
            min="1"
            max="100"
          />
          <label htmlFor="password" className='form-label'>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='form-input'
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className='password-toggle-button'>
            {showPassword ? "Hidden" : "Reveal"}
          </button>

          <label htmlFor="confirmPassword" className='form-label'>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='form-input'
          />

          {passwordError && <p className="error-message-password">{passwordError}</p>}

          <button className='signup-button' type="submit">Sign Up</button>
        </form>
        {emptyFields.length > 0 && (
          <div>
            <ul>
              {emptyFields.map((fieldName, index) => (
                <div key={index} className={`error-${fieldName.replace(/\s+/g, '-').toLowerCase()}-field`}>
                  {/* {fieldName} */}
                  !
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </body>
  );
}

export default SignUp;
