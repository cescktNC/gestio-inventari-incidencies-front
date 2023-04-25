import { nomesDirector, nomesEncaregatMaterial } from "../../js/comprobacioCarrecs";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function InventariMenu(){
    const [resultat, setResultat] = useState(0);
    const [subMenuState, setSubMenuState] = useState({
		prestec: true,
		incidencia: true
	});

	useEffect(() => {
		if(nomesDirector()){
			fetch(
				"http://localhost:5000/prestec/APIPendent",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then(response => response.json())
			.then(json => {
				setResultat(json.prestecsPendents);
			});
			
		}
	}, []);

	function handleSubMenuClick(menuItem) {
		setSubMenuState(prevState => ({
			...prevState,
			[menuItem]: !prevState[menuItem]
		}));
	}

	return (
		<>
			<li>
				<div>
					<span className="span">Inventari</span>
					<p className="p">Gestió d'inventari</p>
				</div>
			</li>
			<ul className="ulSecundari">
			{nomesEncaregatMaterial() && (
				<>
					<li className="d-flex">
						<Link
							to="material/list"
							className="a"
							role="button"
						>
							<div className="divEnllaç">
								<span className="spanSub">Materials</span>
							</div>
						</Link>
					</li>
					<li className="d-flex">
						<Link
							to="exemplar/list"
							className="a"
							role="button"

						>
							<div className="divEnllaç">
								<span className="spanSub">Exemplars</span>
							</div>
						</Link>
					</li>
				</>
			)}
				<li className="d-flex">
					<Link
						to="prestec/list"
						className="a"
						role="button"
						onClick={()=>handleSubMenuClick('prestec')}
					>
						<div className="divEnllaç">
							<span className="spanSub position-relative">
								Prestec
							</span>
							{resultat !== 0 && (
								<span className="position-absolute top-0 left-40 badge fs-5 text-danger">●</span>
							)}
						</div>
					</Link>
					<ButtonSubMenu componentActual={subMenuState.prestec} handleClick={()=>handleSubMenuClick('prestec')} />
				</li>
				<li className="d-flex">
					<Link
						to="incidencia/list"
						className="a"
						role="button"
						onClick={()=>handleSubMenuClick('incidencia')}
					>
						<div className="divEnllaç">
							<span className="spanSub">Incidencia</span>
						</div>
					</Link>
					<ButtonSubMenu componentActual={subMenuState.incidencia} handleClick={()=>handleSubMenuClick('incidencia')} />
				</li>
			</ul>
		</>
	);
}

function ButtonSubMenu({componentActual, handleClick}){

	return(
		<button 
		className="buttonMenu" 
		tabIndex={0}
		onClick={handleClick}
		>
			<svg className="svgContainer" size="16" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
				{componentActual ? <SVGRight /> : <SVGDown />}
			</svg>
		</button>
	)
}

function SVGRight(){
	return(
		<svg id="chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
			<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
		</svg>
	)
}

function SVGDown(){
	return(
		<svg id="chevron-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
			<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
		</svg>
	)
}

export default InventariMenu; 