import { baseApi } from "../../redux/api";
interface Course {
	id: number;
	name: string;
	description: string;
}
const extendedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createCourse: build.mutation<Course, Course>({
			query: (course) => ({
				url: "addCourse",
				method: "POST",
				body: course,
			}),
		}),

		getAllCourses: build.query<[], void>({
			query: () => ({
				url: "getAllCourses",
				method: "GET",
				responseHandler: (response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error("Error fetching courses");
					}
				},
			}),
		}),

		updateCourse: build.mutation<Course, Course>({
			query: (course) => ({
				url: "updateCourse",
				method: "PUT",
				body: course,
				responseHandler: (response) => {
					if (response.ok) {
						return response.json();
					} else {
						throw new Error("Error updating course");
					}
				},
			}),
		}),

		deleteCourse: build.mutation<Course, number>({
			query: (id) => ({
				url: "deleteCourse",
				method: "DELETE",
				body: id,
			}),
		}),
	}),
});

export const {
	useCreateCourseMutation,
	useGetAllCoursesQuery,
	useUpdateCourseMutation,
	useDeleteCourseMutation,
} = extendedApi;

export default extendedApi;
