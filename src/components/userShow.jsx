function UserShow({ user }) {
	return (
		<>
			<div>
				<img src={user.profilePicture} alt="" />
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
