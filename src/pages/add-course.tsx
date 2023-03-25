import Header from "@/components/Header";
import { useCallback, useState } from "react";
import { useCreateCourseMutation } from "./api/courseService";

export const AddCourse = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [create, { isLoading: isCreateLoading }] = useCreateCourseMutation();

	const handleCourseNameChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setName(event.target.value);
	};

	const handleCourseDescriptionChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setDescription(event.target.value);
	};

	const createCourse = useCallback(
		async (event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			const result = await create({ id: 0, name, description });
			if (!result) {
				alert("Something went wrong!");
			} else {
				alert("Course created successfully!");
			}
		},
		[name, description, create]
	);

	return (
		<div className="">
			<Header />
			<div className="flex flex-col justify-center items-center h-screen bg-gray-300">
				<form
					className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
					onSubmit={(event) => createCourse(event)}>
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
							value={name}
							onChange={(event) => {
								setName(event.target.value);
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
							value={description}
							onChange={(event) => {
								setDescription(event.target.value);
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
		</div>
	);
};

export default AddCourse;
