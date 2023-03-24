import Link from "next/link";

export const Header = () => {
	return (
		<header className="bg-gray-800 py-6">
			<nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
				<Link href="/">
					<a className="text-gray-700 hover:text-white">Kurslarım</a>
				</Link>
				<div className="flex">
					<Link href="/add-course">
						<a className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded">
							Kurs Ekle
						</a>
					</Link>
					<Link href="/dashboard">
						<a className="ml-4 text-gray-300 hover:text-white font-semibold">
							Dashboard
						</a>
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Header;
