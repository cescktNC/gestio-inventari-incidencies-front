import { Link } from "react-router-dom";

function UserShow({ user }) {
	let imgProfile= 'http://localhost:5000/'+ user.profilePicture;
	return (
		<div>
			<div>
				<img src={imgProfile} alt="" />
			</div>
			<div>
				<p>{user.nom}</p>
			</div>
			<div>
				<p>{user.cognoms}</p>
			</div>
			<div>
				<p>{user.dni}</p>
			</div>
			<div>
				<p>{user.carrec}</p>
			</div>
			<div>
				<p>{user.email}</p>
			</div>
			<div className="divSubMenu">
				<Link
				to="/home/user/update"
				className="btn btn-primary"
				role="button"
				>
					<div className="divEnllaç">
						<span className="spanSub">Edita</span>
					</div>
					
				</Link>
			</div>
		</div>
	);
}

export default UserShow;
