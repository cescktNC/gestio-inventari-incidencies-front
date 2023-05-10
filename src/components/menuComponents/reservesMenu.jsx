
import { Link } from 'react-router-dom';
import { nomesEquipDocent, nomesAdmin } from '../../js/comprobacioCarrecs';

function ReservesMenu(){




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
						to="sessio/list"
						className="a"
						role="button"
					>
						<div className="divEnllaç">
							<span className="spanSub">Sessio</span>
						</div>
					</Link>
				</li>
				{(nomesEquipDocent() || nomesAdmin()) && (
					<>
						<li className="d-flex">
							<Link
								to="reserva/list"
								className="a"
								role="button"
							>
								<div className="divEnllaç">
									<span className="spanSub">Reserva</span>
								</div>
							</Link>
						</li>
						<li className="d-flex">
							<Link
								to="cadira/list"
								className="a"
								role="button"
							>
								<div className="divEnllaç">
									<span className="spanSub">Cadira</span>
								</div>
							</Link>
						</li>
					</>
				)}
			</ul>
		</>
	);
}

export default ReservesMenu;