import { useState } from "react";

export const AddCourse = () => {
	const [courseName, setCourseName] = useState("");
	const [courseDescription, setCourseDescription] = useState("");
	const [coursePrice, setCoursePrice] = useState("");

	const handleCourseNameChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCourseName(event.target.value);
	};

	const handleCourseDescriptionChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setCourseDescription(event.target.value);
	};

	const handleCoursePriceChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCoursePrice(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<form
				className="w-full md:w-1/2 lg:w-1/3"
				onSubmit={(event) => handleSubmit(event)}>
				<div className="mb-4">
					<label
						htmlFor="courseName"
						className="block text-gray-700 font-bold mb-2">
						Course Name
					</label>
					<input
						type="text"
						id="courseName"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={courseName}
						onChange={(event) => {
							setCourseName(event.target.value);
						}}
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="courseDescription"
						className="block text-gray-700 font-bold mb-2">
						Course Description
					</label>
					<textarea
						id="courseDescription"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={courseDescription}
						onChange={(event) => {
							setCourseDescription(event.target.value);
						}}
						required
					/>
				</div>
				<div className="mb-4">
					<label
						htmlFor="coursePrice"
						className="block text-gray-700 font-bold mb-2">
						Course Price
					</label>
					<input
						type="number"
						id="coursePrice"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						value={coursePrice}
						onChange={(event) => {
							setCoursePrice(event.target.value);
						}}
						required
					/>
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit">
						Add Course
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddCourse;
