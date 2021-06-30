import { Home } from "./pages/Home/Home";
import { BrowserRouter, Route } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'
import { MapComponent } from "./pages/MapPage/MapPage";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/SearchHashtag" component={MapComponent} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
