import React from 'react';
import GlobalStyles from './styles/global';
import SignIn from './pages/SignIn/index';
import { AuthProvider } from './hooks/AuthContext';
// import SignUp from './pages/SignUp/index';

const App: React.FC = () => {
  return (
    <>
      <AuthProvider>
        {/* <SignUp /> */}
        <SignIn />
      </AuthProvider>
      <GlobalStyles />
    </>
  );
};

export default App;
