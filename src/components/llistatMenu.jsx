import React from "react";
import "../css/styleLlistatMenu.css";
import "../css/styleImage.css";

export const LlistatMenu = ({user}) => {
	return (
		<div className="containerMenu">
			<Profile user={user}/>
			<ul className="menu">
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
	const imageUrl = user.profilePicture;

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

function CreacioContingutInventari() {
	function handleClick(a) {
		const active = document.getElementsByClassName("active")[0];
		if (active) active.classList.remove("active");
		a.classList.add("active");
	}

	return (
		<>
			<li>
				<div>
					<span className="span">Inventari</span>
					<p className="p">Gestió d'inventari</p>
				</div>
			</li>
			<a
				href="http://localhost:3000/"
				className="a"
				role="button"
				onClick={event => handleClick(event.currentTarget)}
			>
				<div className="divEnllaç">
					<span className="spanSub">Materials</span>
				</div>
			</a>
			<a
				href="http://localhost:3000/"
				className="a"
				role="button"
				onClick={event => handleClick(event.currentTarget)}
			>
				<div className="divEnllaç">
					<span className="spanSub">Exemplars</span>
				</div>
			</a>
			<a
				href="http://localhost:3000/"
				className="a"
				role="button"
				onClick={event => handleClick(event.currentTarget)}
			>
				<div className="divEnllaç">
					<span className="spanSub">Prestec</span>
				</div>
			</a>
			<a
				href="http://localhost:3000/"
				className="a"
				role="button"
				onClick={event => handleClick(event.currentTarget)}
			>
				<div className="divEnllaç">
					<span className="spanSub">Incidencia</span>
				</div>
			</a>
		</>
	);
}

function CreacioContingutGeneral() {
	function handleClick(a) {
		const active = document.getElementsByClassName("active")[0];
		if (active) active.classList.remove("active");
		a.classList.add("active");
	}

	return (
		<>
			<li>
				<div>
					<span className="span">General</span>
					<p className="p">Gestió general</p>
				</div>
			</li>
			<a
				href="http://localhost:3000/"
				className="a"
				role="button"
				onClick={event => handleClick(event.currentTarget)}
			>
				<div className="divEnllaç">
					<span className="spanSub">Categories</span>
				</div>
			</a>
			<a
				href="http://localhost:3000/"
				className="a"
				role="button"
				onClick={event => handleClick(event.currentTarget)}
			>
				<div className="divEnllaç">
					<span className="spanSub">Subcategories</span>
				</div>
			</a>
			<a
				href="http://localhost:3000/"
				className="a"
				role="button"
				onClick={event => handleClick(event.currentTarget)}
			>
				<div className="divEnllaç">
					<span className="spanSub">Centre</span>
				</div>
			</a>
			<a
				href="http://localhost:3000/"
				className="a"
				role="button"
				onClick={event => handleClick(event.currentTarget)}
			>
				<div className="divEnllaç">
					<span className="spanSub">Planta</span>
				</div>
			</a>
			<a
				href="http://localhost:3000/"
				className="a"
				role="button"
				onClick={event => handleClick(event.currentTarget)}
			>
				<div className="divEnllaç">
					<span className="spanSub">Localització</span>
				</div>
			</a>
		</>
	);
}

function CreacioContingutReserves() {
	function handleClick(a) {
		const active = document.getElementsByClassName("active")[0];
		if (active) active.classList.remove("active");
		a.classList.add("active");
	}

	return (
		<>
			<li>
				<div>
					<span className="span">Reserves</span>
					<p className="p">Gestió reserves</p>
				</div>
			</li>
			<a
				href="http://localhost:3000/"
				className="a"
				role="button"
				onClick={event => handleClick(event.currentTarget)}
			>
				<div className="divEnllaç">
					<span className="spanSub">Reserva</span>
				</div>
			</a>
			<a
				href="http://localhost:3000/"
				className="a"
				role="button"
				onClick={event => handleClick(event.currentTarget)}
			>
				<div className="divEnllaç">
					<span className="spanSub">Sessio</span>
				</div>
			</a>
			<a
				href="http://localhost:3000/"
				className="a"
				role="button"
				onClick={event => handleClick(event.currentTarget)}
			>
				<div className="divEnllaç">
					<span className="spanSub">Cadira</span>
				</div>
			</a>
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
