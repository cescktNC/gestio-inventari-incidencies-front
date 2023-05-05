import { nomesEncaregatMaterial, nomesAdmin, nomesDirector, nomesEquipDocent } from "../../js/comprobacioCarrecs";
import { useState } from 'react';
import { Link } from 'react-router-dom';

function InventariMenu({resultat}){
    const [subMenuState, setSubMenuState] = useState({
		prestec: true,
		incidencia: true
	});
  
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
			{(nomesEncaregatMaterial() || nomesAdmin() || nomesDirector()) && (
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

			{(nomesEquipDocent() || nomesEncaregatMaterial() || nomesDirector()) && (
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
				</li>
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
				</li>
			</ul>
		</>
	);
}

export default InventariMenu; 