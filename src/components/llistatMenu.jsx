import {React, useState} from "react";
import { Link } from "react-router-dom";

import "../css/styleLlistatMenu.css";
import "../css/styleImage.css";

function LlistatMenu({user})  {
	return (
		<div className="containerMenu">
			<Profile user={user}/>
			<ul className="menu">
				<CreacioContingutUsuari />
				<CreacioContingutInventari />
				<CreacioContingutGeneral />
				<CreacioContingutReserves />
			</ul>
			<LogoFinal />
		</div>
	);
}

function Profile({user}) {
	const name = user.nom +" "+user.cognoms;
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

function ButtonSubMenu({componentActual, setComponentActual}){
	function handleClick(e){
		if(componentActual) setComponentActual(false);
		else setComponentActual(true);
	}
	return(
		<button 
		className="buttonMenu" 
		tabIndex={0}
		onClick={event => handleClick(event)}
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

function CreacioMenuUsuari({componentActual}){
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
				</div>
			</div>
		)
	}
}

function CreacioContingutUsuari(){
	// function handleClick(a) {
	// 	const active = document.getElementsByClassName("active")[0];
	// 	if (active) active.classList.remove("active");
	// 	else a.classList.add("active");
	// }

	const [componentActual, setComponentActual] = useState(true);


	return (
		<>
			<li>
				<div>
					<span className="span">Usuari</span>
					<p className="p">Gestió d'usuari</p>
				</div>
			</li>
			<ul className="ulSecundari">
				<li>
					<Link
					to="user/show"
					className="a"
					role="button"
					>
						<div className="divEnllaç">
							<span className="spanSub">Usuari</span>
						</div>

						<ButtonSubMenu componentActual={componentActual} setComponentActual={setComponentActual} />
						
					</Link>
				</li>
				<CreacioMenuUsuari componentActual={componentActual} /> 
				

			</ul>
			
		</>
	);
}

function CreacioContingutInventari() {
	// function handleClick(a) {
	// 	const active = document.getElementsByClassName("active")[0];
	// 	if (active) active.classList.remove("active");
	// 	else a.classList.add("active");
	// }

	return (
		<>
			<li>
				<div>
					<span className="span">Inventari</span>
					<p className="p">Gestió d'inventari</p>
				</div>
			</li>
			<Link
				to="user/show"
				className="a"
				role="button"
			>
				<div className="divEnllaç">
					<span className="spanSub">Materials</span>
				</div>
				<ButtonSubMenu />
			</Link>
			<Link
				to="user/show"
				className="a"
				role="button"
			>
				<div className="divEnllaç">
					<span className="spanSub">Exemplars</span>
				</div>
				<ButtonSubMenu />
			</Link>
			<Link
				to="user/show"
				className="a"
				role="button"
			>
				<div className="divEnllaç">
					<span className="spanSub">Prestec</span>
				</div>
				<ButtonSubMenu />
			</Link>
			<Link
				to="user/show"
				className="a"
				role="button"
			>
				<div className="divEnllaç">
					<span className="spanSub">Incidencia</span>
				</div>
				<ButtonSubMenu />
			</Link>
		</>
	);
}

function CreacioContingutGeneral() {
	// function handleClick(a) {
	// 	const active = document.getElementsByClassName("active")[0];
	// 	if (active) active.classList.remove("active");
	// 	a.classList.add("active");
	// }

	return (
		<>
			<li>
				<div>
					<span className="span">General</span>
					<p className="p">Gestió general</p>
				</div>
			</li>
			<Link
				to="user/show"
				className="a"
				role="button"
			>
				<div className="divEnllaç">
					<span className="spanSub">Categories</span>
				</div>
				<ButtonSubMenu />
			</Link>
			<Link
				to="user/show"
				className="a"
				role="button"
			>
				<div className="divEnllaç">
					<span className="spanSub">Subcategories</span>
				</div>
				<ButtonSubMenu />
			</Link>
			<Link
				to="user/show"
				className="a"
				role="button"
			>
				<div className="divEnllaç">
					<span className="spanSub">Centre</span>
				</div>
				<ButtonSubMenu />
			</Link>
			<Link
				to="user/show"
				className="a"
				role="button"
			>
				<div className="divEnllaç">
					<span className="spanSub">Planta</span>
				</div>
				<ButtonSubMenu />
			</Link>
			<Link
				to="user/show"
				className="a"
				role="button"
			>
				<div className="divEnllaç">
					<span className="spanSub">Localització</span>
				</div>
				<ButtonSubMenu />
			</Link>
		</>
	);
}

function CreacioContingutReserves() {
	// function handleClick(a) {
	// 	const active = document.getElementsByClassName("active")[0];
	// 	if (active) active.classList.remove("active");
	// 	a.classList.add("active");
	// }

	return (
		<>
			<li>
				<div>
					<span className="span">Reserves</span>
					<p className="p">Gestió reserves</p>
				</div>
			</li>
			<Link
				to="user/show"
				className="a"
				role="button"
			>
				<div className="divEnllaç">
					<span className="spanSub">Reserva</span>
				</div>
				<ButtonSubMenu />
			</Link>
			<Link
				to="user/show"
				className="a"
				role="button"
			>
				<div className="divEnllaç">
					<span className="spanSub">Sessio</span>
				</div>
				<ButtonSubMenu />
			</Link>
			<Link
				to="user/show"
				className="a"
				role="button"
			>
				<div className="divEnllaç">
					<span className="spanSub">Cadira</span>
				</div>
				<ButtonSubMenu />
			</Link>
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



export default LlistatMenu;