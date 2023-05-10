
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ReservesMenu(){
    const [subMenuState, setSubMenuState] = useState({
		reserva: true,
		sessio: true
	});

	function handleSubMenuClick(menuItem) {
		setSubMenuState(prevState => ({
			...prevState,
			[menuItem]: !prevState[menuItem]
		}));
	}

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
						to="reserva/list"
						className="a"
						role="button"
						onClick={()=>handleSubMenuClick('reserva')}
					>
						<div className="divEnllaç">
							<span className="spanSub">Reserva</span>
						</div>
				</Link>
					<ButtonSubMenu componentActual={subMenuState.reserva} handleClick={ () => handleSubMenuClick('reserva')} />
				</li>
				<li className="d-flex">
					<Link
						to="sessio/list"
						className="a"
						role="button"
						onClick={()=>handleSubMenuClick('sessio')}
					>
						<div className="divEnllaç">
							<span className="spanSub">Sessio</span>
						</div>
					</Link>
					<ButtonSubMenu componentActual={subMenuState.sessio} handleClick={ () => handleSubMenuClick('sessio')}/>
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
			</ul>
		</>
	);
}

function ButtonSubMenu({componentActual, handleClick}){

	return(
		<button 
		className="buttonMenu" 
		tabIndex={0}
		onClick={handleClick}
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

export default ReservesMenu;