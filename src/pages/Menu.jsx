import MenuContainer from "../containers/menuContainer";
import UserContainer from "../containers/userContainer";
import MaterialContainer from "../containers/materialContainer";
import CategoriaContainer from "../containers/categoriesContainer";
import SubCategoriaContainer from "../containers/subcategoriesContainer";
import CentreContainer from "../containers/centreContainer";
import PlantaContainer from "../containers/plantaContainer";
import LocalitzacioContainer from "../containers/localitzacioContainer";
import ExemplarContainer from "../containers/exemplarContainer";
import PrestecContainer from "../containers/prestecContainer";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/styleMenu.css";


export function Menu() {
	const [user, setUser] = useState([]);
	useEffect(() => {
		fetch(
			"http://localhost:5000/usuaris/user/" + window.localStorage.getItem("id"),
			{
				method: "GET",
				headers: {
					"Authorization": "Bearer " + window.localStorage.getItem("token"),
					"Content-Type": "application/json",
				},
			}
		)
		.then(response => response.json())
		.then(json => {
			setUser(json.usuari);
		});
	}, []);


	return (

		<div className="containerPrincipal">
			<div className="divMenu BG-black">
				<MenuContainer user={user} />
			</div>
			<div className="container">
				<Routes>
					<Route path="/user/*" element={<UserContainer user={user} />} />
					<Route path="/material/*" element={<MaterialContainer />} />
					<Route path="/exemplar/*" element={<ExemplarContainer />} />
					<Route path="/prestec/*" element={<PrestecContainer />} />
					<Route path="/categories/*" element={<CategoriaContainer />} />
					<Route path="/subcategories/*" element={<SubCategoriaContainer />} />
					<Route path="/centre/*" element={<CentreContainer/>} />
					<Route path="/planta/*" element={<PlantaContainer/>} />
					<Route path="/localitzacio/*" element={<LocalitzacioContainer/>} />

				</Routes>
				
			</div>
		</div>

	);

}


