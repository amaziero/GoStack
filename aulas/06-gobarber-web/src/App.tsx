import React from 'react';
import GlobalStyles from './styles/global';
import SignIn from './pages/SignIn/index';
import { AppProvider } from './hooks/index';
// import SignUp from './pages/SignUp/index';

const App: React.FC = () => {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>
      <GlobalStyles />
    </>
  );
};

export default App;
