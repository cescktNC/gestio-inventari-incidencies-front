import Pages from "./pages/Pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Menu } from './pages/Menu';


import { LoginContainer } from "./containers/loginContainer";

function App() {
	
	return (
			/* <div className="App">
				<Pages />
			</div> */	
			<Router>
			<Routes>
			  <Route path="/login" element={<LoginContainer currentForm={'login'} />}/>
			  <Route path="/register" element={<LoginContainer currentForm='register'/>}/>
			  <Route path="/llistatMenu" element={<Menu/>}/>
			</Routes>
			</Router>
	)
}

export default App;
