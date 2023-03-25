import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice";

export const Header = () => {
	const dispatch = useDispatch();

	return (
		<header className="bg-gray-800 py-6">
			<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
				<div className="flex items-center justify-end">
					<Link
						href="/add-course"
						className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded">
						Kurs Ekle
					</Link>
					<Link
						href="/dashboard"
						className="ml-4 text-gray-300 hover:text-white font-semibold">
						Dashboard
					</Link>
				</div>
				<button className="text-gray-300 hover:text-white font-semibold">
					<Link
						href="/login"
						onClick={() => {
							dispatch(logout());
						}}>
						Logout
					</Link>
				</button>
			</nav>
		</header>
	);
};

export default Header;
