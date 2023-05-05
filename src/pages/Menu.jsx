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
import ReservaContainer from "../containers/reservaContainer";
import SessioContainer from "../containers/sessioContainer";
import CadiraContainer from "../containers/cadiraContainer";
import IncidenciaContainer from "../containers/incidenciaContainer";
import ComentariContainer from "../containers/comentariContainer";

import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import { nomesDirector } from "../js/comprobacioCarrecs";

import "../css/styleMenu.css";

export function Menu() {

	const [resultat, setResultat] = useState(0);

	useEffect(() => {
		if(nomesDirector()){
			fetch(
				"http://localhost:5000/prestec/APIPendent",
				{
					method: "GET",
					headers: { 
						"Authorization": "Bearer " + window.localStorage.getItem("token"),
						"Content-Type": "application/json",
						"Accept-Type": "application/json"
					},
				}
			)
			.then(response => response.json())
			.then(json => {
				setResultat(json.prestecsPendents);
			});
			
		}
	}, []);
	
	return (

		<div className="containerPrincipal">
			<div className="divMenu BG-black">
				<MenuContainer resultat={resultat} />
			</div>
			<div className="container">
				<Routes>
					<Route path="/user/*" element={<UserContainer />} />
					<Route path="/material/*" element={<MaterialContainer />} />
					<Route path="/exemplar/*" element={<ExemplarContainer />} />
					<Route path="/prestec/*" element={<PrestecContainer resultat={resultat} setResultat={setResultat} />} />
					<Route path="/categories/*" element={<CategoriaContainer />} />
					<Route path="/subcategories/*" element={<SubCategoriaContainer />} />
					<Route path="/centre/*" element={<CentreContainer/>} />
					<Route path="/planta/*" element={<PlantaContainer/>} />
					<Route path="/localitzacio/*" element={<LocalitzacioContainer/>} />
					<Route path="/reserva/*" element={<ReservaContainer/>} />
					<Route path="/sessio/*" element={<SessioContainer/>} />
					<Route path="/cadira/*" element={<CadiraContainer/>} />
					<Route path="/incidencia/*" element={<IncidenciaContainer/>} />
					<Route path="/comentari/*" element={<ComentariContainer/>} />
				</Routes>
				
			</div>
		</div>

	);

}


