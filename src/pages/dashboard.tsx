import Header from "@/components/Header";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Verileri tutmak için bir array oluşturuyoruz
interface Course {
	id: number;
	name: string;
	description: string;
}

export const Dashboard = () => {
	// State Hook'larını kullanarak component'in state'ini oluşturuyoruz
	const [courses, setCourses] = useState<Array<Course>>([]);
	const [showPopup, setShowPopup] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState<Array<Course>>([]);

	const { isLoggedin } = useSelector((state: any) => state.auth);

	// Component yüklendiğinde bir kere çalışacak olan useEffect Hook'u kullanarak verileri alıyoruz
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:3000/api/getAllCourses");
			const data = await response.json();
			console.log("asdfas", data);
			setCourses(data.data);
		};
		fetchData();
	}, []);
	const handleEdit = (course: Course) => {
		setShowPopup(true);
		setSelectedCourse(course);
		setIsEditing(true);
	};

	const updateCourse = (course: Course) => {
		fetch(`http://localhost:3000/api/updateCourse/`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: course.id,
				name: course.name,
				description: course.description,
			}),
		}).then((response) => {
			if (response.ok) {
				alert("Course updated successfully!");
			} else {
				alert("Something went wrong!");
			}
		});
	};

	// Sil butonuna tıklandığında çalışacak fonksiyon
	const handleDelete = (id: number) => {
		// Silinecek kursu filtreleyerek array'den çıkarıyoruz
		fetch(`http://localhost:3000/api/deleteCourse/`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id,
			}),
		}).then((response) => {
			if (response.ok) {
				alert("Course deleted successfully!");
			} else {
				alert("Something went wrong!");
			}
		});
	};

	return (
		<div className="">
			{isLoggedin ? (
				<div className="">
					<Header />
					<div className="container mx-auto mt-10">
						<h1 className="text-2xl font-bold mb-5">Kurslar</h1>

						{/* Tablo oluşturuyoruz */}
						<table className="table-auto border-collapse w-full">
							{/* Tablo başlığı */}
							<thead>
								<tr>
									<th className="border p-3">#</th>
									<th className="border p-3">Kurs Adı</th>
									<th className="border p-3">Açıklama</th>
									<th className="border p-3"></th>
								</tr>
							</thead>

							{/* Tablo verileri */}
							<tbody>
								{/* Verileri array'den çekerek tabloya ekleme */}
								{courses.map((course) => (
									<tr key={course.id}>
										<td className="border p-3">{course.id}</td>
										<td className="border p-3">{course.name}</td>
										<td className="border p-3">{course.description}</td>
										<td className="border p-3">
											<button
												className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
												onClick={() => handleEdit(course)}>
												Düzenle
											</button>
											<button
												className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
												onClick={() => handleDelete(course.id)}>
												Sil
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			) : (
				<div className="container mx-auto mt-10">
					<h1 className="text-2xl font-bold mb-5">Kurslar</h1>
					<p>Yönetici girişi yapmadan kurslar listelenemez.</p>
					<p>Lütfen giriş yapınız.</p>
					<Link
						href="/login"
						className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded">
						Giriş Yap
					</Link>
				</div>
			)}
			{/* Popup */}
			{showPopup && (
				<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 flex justify-center items-center">
					<div className="bg-white w-1/2 h-1/2 flex flex-col items-center justify-between rounded-md p-20">
						<div className="flex flex-col relative">
							<button
								className="bg-red-500 absolute top-0 right-0 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
								onClick={() => setShowPopup(false)}>
								X
							</button>
							<div className="w-full h-full">
								<h1 className="text-2xl font-bold mb-5">Kursu Güncelle</h1>
								<form className="w-full max-w-sm">
									<div className="mb-4">
										<label
											className="block text-gray-700 text-sm font-bold mb-2"
											htmlFor="name">
											Kurs Adı
										</label>
										<input
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id="name"
											type="text"
											placeholder="Kurs Adı"
											defaultValue={selectedCourse?.name}
										/>
									</div>
									<div className="mb-6">
										<label
											className="block text-gray-700 text-sm font-bold mb-2"
											htmlFor="description">
											Açıklama
										</label>
										<textarea
											className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											id="description"
											placeholder="Açıklama"
											defaultValue={selectedCourse.description}
										/>
										<p className="text-gray-600 text-xs italic">
											Kısa bir açıklama giriniz.
										</p>
									</div>
									<div className="flex items-center justify-between">
										<button
											className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
											type="button"
											onClick={() => updateCourse(selectedCourse)}>
											Kursu Güncelle
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
