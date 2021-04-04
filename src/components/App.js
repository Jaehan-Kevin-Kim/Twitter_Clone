import React, { useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fBase';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  // console.log(authService.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Kevin Kim {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
