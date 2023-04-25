
import { Link } from 'react-router-dom';
function GeneralMenu(){
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
						to="categories/list"
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
						to="subcategories/list"
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
						to="centre/list"
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
						to="planta/list"
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
						to="localitzacio/list"
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

export default GeneralMenu;