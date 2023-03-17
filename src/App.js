import Pages from "./pages/pages";
import MenuContainer from './pages/menu.jsx';
import Login  from 'components/login'; 
import Register from 'components/register';
import '../css/styleLogin';

function App() {

  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    < >
    <div className="App">
      <Pages />
    </div>
      <div className="App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
      }
    </div>
    </>
  );

    
 

 
  
}


export default App;
