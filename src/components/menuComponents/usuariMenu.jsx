import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { nomesTreballadors } from "../../js/comprobacioCarrecs"


function UserMenu({setIsLoggedIn}){

	const [componentActual, setComponentActual] = useState(true);
    const id = window.localStorage.getItem('id');


	function handleClick(){

		setComponentActual(prevState => !prevState);

	}

    return (
		<>
			<li className="d-flex">
				<div>
					<span className="span">Usuari</span>
					<p className="p">Gestió d'usuari</p>
				</div>
			</li>
			<ul className="ulSecundari">
				<li className="d-flex">
					<Link
					to={`user/show/${id}`}
					className="a"
					role="button"
					onClick={handleClick}
					>
						<div className="divEnllaç">
							<span className="spanSub">Usuari</span>
						</div>
					</Link>

					<ButtonSubMenu componentActual={componentActual} handleClick={handleClick} />

				</li>

				<CreacioSubMenuUsuari componentActual={componentActual} id={id} setIsLoggedIn={setIsLoggedIn} /> 
				
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

function CreacioSubMenuUsuari({componentActual, id, setIsLoggedIn}){
	const navigate = useNavigate()

	function handleClick(e){
		e.preventDefault();
		window.localStorage.removeItem("id");
		window.localStorage.removeItem("carrec");
		window.localStorage.removeItem("token");
		setIsLoggedIn('')
		navigate("/auth/login");
	}

	if(!componentActual){
		return(
			<div className="divContainerSubMenu">
				<div className="divFlexSubMenu">
					<div className="divSubMenu">
						<Link
						to={`user/show/${id}`}
						className="a"
						role="button"
						>
							<div className="divEnllaç">
								<span className="spanSubMenu">Perfil</span>
							</div>
							
						</Link>
					</div>
					{nomesTreballadors() && (
						<div className="divSubMenu">
							<Link
							to="user/list"
							className="a"
							role="button"
							>
								<div className="divEnllaç">
									<span className="spanSubMenu">Llistat</span>
								</div>
							</Link>
						</div>
					)}
					<div className="divSubMenu">
							<Link
								className="a"
								role="button"
								to="/auth/login"
								onClick={(event)=>handleClick(event)}
							>
								<div className="divEnllaç">
									<span className="spanSubMenu">LogOut</span>
								</div>
							</Link>
						</div>
				</div>
			</div>
		)
	}
}

export default UserMenu;