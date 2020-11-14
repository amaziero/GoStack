import React from 'react';
import GlobalStyles from './styles/global';
// import SignIn from './pages/SignIng/index';
import SignUp from './pages/SignUp/index';

const App: React.FC = () => (
  <>
    <SignUp />
    {/* <SignIn /> */}
    <GlobalStyles />
  </>
);

export default App;
