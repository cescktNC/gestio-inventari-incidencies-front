import { useState, useEffect } from 'react';

function ProfileMenu(){
    const id = window.localStorage.getItem('id');
	const [user, setUser] = useState([]);

    useEffect(() => {
		fetch(
			"http://localhost:5000/usuaris/user/" + id,
			{
				method: "GET",
				headers: { 
					"Authorization": "Bearer " + window.localStorage.getItem("token"),
					"Content-Type": "application/json",
					"Accept-Type": "application/json"
				},
			}
		)
		.then(response => response.json())
		.then(json => {
			setUser(json.usuari);
		});
	}, []);

    return (
		<div className="justify-center items-center flex-col flex">
			<div className="flex items-center justify-center">
				<div className="user-profile profile-left profile-blue MuiAvatar-root MuiAvatar-circular avatar text-32 font-bold w-96 h-96 muiltr-j6vokp">
					<img src={'http://localhost:5000/' + user.profilePicture} alt="Profile" className="profile-image" />
				</div>
			</div>
			<h2 className="profile-name">{user.nom + " " + user.cognoms}</h2>
			<p className="profile-email">{user.email}</p>
		</div>
	);

}

export default ProfileMenu;