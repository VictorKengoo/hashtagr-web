import { Home } from "./pages/Home/Home";
import { BrowserRouter, Route } from 'react-router-dom'
import { SearchHashtag } from './pages/SearchHashtag/SearchHashtag'

import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/SearchHashtag" component={SearchHashtag} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
