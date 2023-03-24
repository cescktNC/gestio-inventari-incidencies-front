import Pages from "./pages/Pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './components/login'
import { Register }from "./components/register";
import { LlistatMenu } from "./components/llistatMenu";
import './css/styleLogin.css';

function App() {
	
	return (
			/* <div className="App">
				<Pages />
			</div> */	
			<Router>
			<Routes>
			  <Route path="/login" element={<Login/>}/>
			  <Route path="/register" element={<Register/>}/>
			  <Route path="/llistatMenu" element={<LlistatMenu/>}/>
			</Routes>
			</Router>
	)
}

export default App;
