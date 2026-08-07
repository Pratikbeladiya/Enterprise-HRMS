import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div style={appStyles.container}>
      {isLogin ? (
        <Login onSwitchForm={toggleForm} />
      ) : (
        <Signup onSwitchForm={toggleForm} />
      )}
    </div>
  );
}

const appStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    fontFamily: 'system-ui, sans-serif'
  }
};
