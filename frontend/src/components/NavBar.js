import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../css files/NavBar.css";

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

	return (
		<header className="text-2xl font-serif">
			<nav ref={navRef} className="flex gap-6 items-center justify-center">
				<a href="/#">Home</a>
				<a href="/#">Department</a>
				<a href="/#">Contact Us</a>
				<a href="/#">Login</a>
				<a href="/#">About Us</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}
				>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}
			>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;
