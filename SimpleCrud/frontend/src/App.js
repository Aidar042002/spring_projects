import './App.css';
import Header from "./components/pages_components/Header";
import Content from "./components/pages_components/Content";
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <div>
        <Router>
            <Header/>
            <Content/>
        </Router>
    </div>
  );
}

export default App;
