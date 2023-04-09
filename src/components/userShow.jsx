function UserShow({ user }) {
	let imgProfile= 'http://localhost:5000/'+ user.profilePicture;
	return (
		<>
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
		</>
	);
}

export default UserShow;
