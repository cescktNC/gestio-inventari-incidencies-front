import {React, useState} from "react";
import { Link, useNavigate } from "react-router-dom";

import "../css/styleLlistatMenu.css";
import "../css/styleImage.css";

function LlistatMenu({user})  {

	const carrec = window.localStorage.getItem('carrec');

	return (
		<div className="containerMenu">
			<Profile user={user}/>
			<ul className="menu">
				<CreacioContingutUsuari carrec={carrec} />
				<CreacioContingutInventari carrec={carrec} />
				<CreacioContingutGeneral carrec={carrec} />
				<CreacioContingutReserves carrec={carrec} />
			</ul>
			<LogoFinal />
		</div>
	);
}

function Profile({user}) {
	const name = user.nom + " " + user.cognoms;
	const email = user.email;
	const imageUrl = 'http://localhost:5000/'+user.profilePicture;

	return (
		<div className="justify-center items-center flex-col flex">
			<div className="flex items-center justify-center">
				<div className="user-profile profile-left profile-blue MuiAvatar-root MuiAvatar-circular avatar text-32 font-bold w-96 h-96 muiltr-j6vokp">
					<img src={imageUrl} alt="Profile" className="profile-image" />
				</div>
			</div>
			<h2 className="profile-name">{name}</h2>
			<p className="profile-email">{email}</p>
		</div>
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

function CreacioContingutUsuari({carrec}){
	const [componentActual, setComponentActual] = useState(true);

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
					to="user/show"
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

				<CreacioSubMenuUsuari carrec={carrec} componentActual={componentActual} /> 
				
			</ul>
			
		</>
	);
}

function CreacioContingutInventari({carrec}) {

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
			{(carrec !== 'Alumne' && carrec !== 'Professor') && (
				<>
					<li className="d-flex">
						<Link
							to="user/show"
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
							to="user/show"
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
						to="user/show"
						className="a"
						role="button"
						onClick={()=>handleSubMenuClick('prestec')}
					>
						<div className="divEnllaç">
							<span className="spanSub">Prestec</span>
						</div>
					</Link>
					<ButtonSubMenu componentActual={subMenuState.prestec} handleClick={()=>handleSubMenuClick('prestec')} />
				</li>
				<li className="d-flex">
					<Link
						to="user/show"
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

function CreacioContingutGeneral({carrec}) {

	return (
		<>
			<li className="d-flex">
				<div>
					<span className="span">General</span>
					<p className="p">Gestió general</p>
				</div>
			</li>
			<ul className="ulSecundari">
				<li className="d-flex">
					<Link
						to="user/show"
						className="a"
						role="button"
					>
						<div className="divEnllaç">
							<span className="spanSub">Categories</span>
						</div>
					</Link>
				</li>
				<li className="d-flex">
					<Link
						to="user/show"
						className="a"
						role="button"
					>
						<div className="divEnllaç">
							<span className="spanSub">Subcategories</span>
						</div>
					</Link>
				</li>
				<li className="d-flex">
					<Link
						to="user/show"
						className="a"
						role="button"
					>
						<div className="divEnllaç">
							<span className="spanSub">Centre</span>
						</div>
					</Link>
				</li>
				<li className="d-flex">
					<Link
						to="user/show"
						className="a"
						role="button"
					>
						<div className="divEnllaç">
							<span className="spanSub">Planta</span>
						</div>
					</Link>
				</li>
				<li className="d-flex">
					<Link
						to="user/show"
						className="a"
						role="button"
					>
						<div className="divEnllaç">
							<span className="spanSub">Localització</span>
						</div>
					</Link>
				</li>
			</ul>
		</>
	);
}

function CreacioContingutReserves({carrec}) {

	const [subMenuState, setSubMenuState] = useState({
		reserva: true,
		sessio: true
	});

	function handleSubMenuClick(menuItem) {
		setSubMenuState(prevState => ({
			...prevState,
			[menuItem]: !prevState[menuItem]
		}));
	}

	return (
		<>
			<li className="d-flex">
				<div>
					<span className="span">Reserves</span>
					<p className="p">Gestió reserves</p>
				</div>
			</li>
			<ul className="ulSecundari">
				<li className="d-flex">
					<Link
						to="user/show"
						className="a"
						role="button"
						onClick={()=>handleSubMenuClick('reserva')}
					>
						<div className="divEnllaç">
							<span className="spanSub">Reserva</span>
						</div>
				</Link>
					<ButtonSubMenu componentActual={subMenuState.reserva} handleClick={ () => handleSubMenuClick('reserva')} />
			</li>
				<li className="d-flex">
					<Link
						to="user/show"
						className="a"
						role="button"
						onClick={()=>handleSubMenuClick('sessio')}
					>
						<div className="divEnllaç">
							<span className="spanSub">Sessio</span>
						</div>
					</Link>
					<ButtonSubMenu componentActual={subMenuState.sessio} handleClick={ () => handleSubMenuClick('sessio')}/>
				</li>
				<li className="d-flex">
					<Link
						to="user/show"
						className="a"
						role="button"
					>
						<div className="divEnllaç">
							<span className="spanSub">Cadira</span>
						</div>
					</Link>
				</li>
			</ul>
		</>
	);
}

function LogoFinal() {
	return (
		<div className="divLogo">
			<img
				src="/images/logo_vidal_i_barraquer.jpg"
				alt="footer logo"
				className="imgLogoFooter"
			/>
		</div>
	);
}

/**********************************************************
 ************************ SubMenu *************************
 **********************************************************/

function CreacioSubMenuUsuari({componentActual, carrec}){

	const navigate = useNavigate();

	function handleClick(e){
		e.preventDefault();
		window.localStorage.removeItem("id");
		window.localStorage.removeItem("carrec");
		window.localStorage.removeItem("token");
		navigate("/")

	}

	if(!componentActual){
		return(
			<div className="divContainerSubMenu">
				<div className="divFlexSubMenu">
					<div className="divSubMenu">
						<Link
						to="user/show"
						className="a"
						role="button"
						>
							<div className="divEnllaç">
								<span className="spanSub">Perfil</span>
							</div>
							
						</Link>
					</div>
					{carrec !== 'Alumne' && (
						<div className="divSubMenu">
							<Link
							to="user/list"
							className="a"
							role="button"
							>
								<div className="divEnllaç">
									<span className="spanSub">Llistat</span>
								</div>
							</Link>
						</div>
					)}
					<div className="divSubMenu">
							<Link
							className="a"
							role="button"
							onClick={(event)=>handleClick(event)}
							>
								<div className="divEnllaç">
									<span className="spanSub">LogOut</span>
								</div>
							</Link>
						</div>
				</div>
			</div>
		)
	}
}

export default LlistatMenu;