function LogoFinal() {
	return (
		<div className="divLogo">
			<img
				src={process.env.PUBLIC_URL + "/images/logo_vidal_i_barraquer.png"}
				alt="footer logo"
				className="imgLogoFooter"
			/>
		</div>
	);
}

export default LogoFinal;