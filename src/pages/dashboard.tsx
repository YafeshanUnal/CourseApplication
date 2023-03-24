import { useState, useEffect } from "react";

// Verileri tutmak için bir array oluşturuyoruz
interface Course {
	id: number;
	name: string;
	description: string;
}

export const Dashboard = () => {
	// State Hook'larını kullanarak component'in state'ini oluşturuyoruz
	const [courses, setCourses] = useState<Array<Course>>([]);

	// Component yüklendiğinde bir kere çalışacak olan useEffect Hook'u kullanarak verileri alıyoruz
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:3000/api/getAllCourses");
			const data = await response.json();
			console.log("asdfas", data);
			setCourses(data.data);
		};
		fetchData();
	}, [courses]);

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
									onClick={() => console.log("Düzenle butonuna tıklandı")}>
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
	);
};

export default Dashboard;
