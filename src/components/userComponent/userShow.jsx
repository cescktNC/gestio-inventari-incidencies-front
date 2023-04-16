import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import "../../css/styleUser.css"
import { ComprobacioPassword,ComprobacioNewPassword,  ComprobacioConfNewPassword } from '../../js/comprobacioCampsFormulariUser';
// const bcrypt = require('bcrypt');


function UserShow() {

	const { id } = useParams();

	const localStorageID = window.localStorage.getItem('id');

	const [user, setUser] = useState({
        id: '',
        nom: '',
        cognoms: '',
        dni: '',
        carrec: '',
        email: '',
        profilePicture: '',
    });

	const [pass, setPass] = useState({
		password: '',
		password1: '',
		password2: ''
	});

	const [comprobacio, setComprobacio] = useState({

		comprobacioPass: false,
		comprobacioNewPass: false,
		comprobacioConfirmNewPass: false
	});
	
	const [errors, setErrors] = useState({
		errorPass:'',
		errorNewPass: '',
		errorConfNewPass:''
	});

	const [errorsBack, setErrorsBack] = useState([]);
	const [errorBack, setErrorBack] = useState('');

	useEffect(() => {
		fetch(
			"http://localhost:5000/usuaris/user/" + id,
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
	}, [id]);

	let imgProfile = 'http://localhost:5000/'+ user.profilePicture;

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	const salt = bcrypt.genSaltSync(12);
	// 	console.log('a')
	// 	console.log(pass)
	// 	if (!Object.values(comprobacio).includes(false)) {
	// 	console.log('b')
	// 		let hashPass = {
	// 			password: bcrypt.hashSync(pass.password, salt),
	// 			password1: bcrypt.hashSync(pass.password1, salt),
	// 			password2: bcrypt.hashSync(pass.password2, salt)
	// 		};

	// 		fetch("http://localhost:5000/usuaris/user/password/" + id, {
	// 			method: "PUT",
	// 			body: JSON.stringify({ hashPass: hashPass }),
	// 			headers: {
	// 			"Content-Type": "application/json",
	// 			},
	// 		})
	// 		.then((response) => response.json())
	// 		.then((json) => {
	// 			console.log(json)

	// 			if(json.error !== undefined) setErrorBack(json.error);
		
	// 			if(json.errors !== undefined) setErrorsBack(json.errors);

	// 			if (json.ok) {
	// 				console.log(json)
	// 			}
	// 		});
	// 	}
	// }

	const handleChange = input => {
		setPass({ ...pass, [input.name]: input.value });
	};

	const handleComprobacio = (camp, valor) => {
		setComprobacio({
		...comprobacio,
		[camp]: valor
		});
	};

	const handleErrors = (camp, valor) => {
		setErrors({
		...errors,
		[camp]: valor
		});
	};

	return (
		<div className="container" >
			<div className="row justify-content-center mt-5">
				<div className="col-lg-6">
					<div className="card">
						<div className="card-body text-center">
							<div className="mb-3">
								<img className="img-fluid rounded-circle" src={imgProfile} alt="Imatge de perfil" />
							</div>
							<div className="profile-details mb-3">
								<h3 className="card-title mb-1">{user.nom + ' ' + user.cognoms}</h3>
								<div className="profile-dni">
									<p className="card-text mb-1">DNI: {user.dni}</p> 
								</div>
								<h5 className="card-subtitle mb-1 text-muted">{user.carrec}</h5>
								<p className="card-text mb-1">{user.email}</p>
							</div>
							{id === localStorageID && (
								<DivEnllaços 
									id={id} 
									pass={pass} 
									handleChange={handleChange}
									handleComprobacio={handleComprobacio}
									errors={errors}
									handleErrors={handleErrors}
									// handleSubmit={handleSubmit}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function DivEnllaços({id, pass, handleChange, handleComprobacio, errors, handleErrors, handleSubmit}){
	return(
		<div className="profile-buttons">
			<Link
				to={`/home/user/update/${id}`}
				className="btn btn-primary mx-2 mb-3"
				role="button"
			>
				<div className="divEnllaç">
					<span className="spanSub">Edita</span>
				</div>
				
			</Link>
			<p>
				<a
					className="btn btn-secondary mb-3"
					data-bs-toggle="collapse"
					href="#password"
					role="button"
					aria-expanded="false"
					aria-controls="collapseExample"
				>
				Cambiar contrassenya
				</a>
			</p>
			<div className="collapse" id="password">
				<div className="form-group card card-body">
					<form onSubmit={handleSubmit}>
						<InputPassword 
						userPass={pass.password} 
						handleChange={handleChange} 
						handleComprobacio={handleComprobacio} 
						handleErrors={handleErrors} 
						/>
						{errors.errorPass && (<p className="error-message" >{errors.errorPass}</p>)}
						<InputNewPassword 
							userPass={pass.password1} 
							handleChange={handleChange} 
							handleComprobacio={handleComprobacio} 
							handleErrors={handleErrors} 
						/>
						{errors.errorNewPass && (<p className="error-message" >{errors.errorNewPass}</p>)}

						<InputConfirmNewPassword 
							userPass={pass.password1} 
							userConfirmPass={pass.password2} 
							handleChange={handleChange}
							handleComprobacio={handleComprobacio} 
							handleErrors={handleErrors}
						/>
						{errors.errorConfNewPass && (<p className="error-message" >{errors.errorConfNewPass}</p>)}
						<button type="submit" className="btn btn-primary">Actualitzar contrassenya</button>
					</form>
				</div>
			</div>
		</div>
	)
}

function InputPassword({userPass, handleChange, handleComprobacio, handleErrors}){
	return(
		<>
			<label form="password">Contrassenya Antiga</label>
			<input
				type="password"
				name="password"
				className="form-control"
				value={userPass}
				onChange={(e) => handleChange(e.target)}
				onBlur={(e) => ComprobacioPassword(e.target.value, {handleComprobacio, handleErrors})}
			/>
		</>
	)
}

function InputNewPassword({userPass, handleChange, handleComprobacio, handleErrors}){
	return(
		<>
			<label form="password">Contrassenya Nova</label>
			<input
				type="password"
				name="password1"
				className="form-control"
				value={userPass}
				onChange={(e) => handleChange(e.target)}
				onBlur={(e) => ComprobacioNewPassword(e.target.value, {handleComprobacio, handleErrors})}
			/>
		</>
	)
}

function InputConfirmNewPassword({userPass, userConfirmPass, handleChange, handleComprobacio, handleErrors}){
	return(
		<>
			<label form="password">Repeteix Contrassenya Nova</label>
			<input
				type="password"
				name="password2"
				className="form-control"
				value={userConfirmPass}
				onChange={(e) => handleChange(e.target)}
				onBlur={(e) => ComprobacioConfNewPassword(e.target.value, {userPass, handleComprobacio, handleErrors})}
			/>
		</>
	)
}

export default UserShow;