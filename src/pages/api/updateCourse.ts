import CreateSupabase from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = CreateSupabase();

async function updateCourse(
	id: string,
	newName: string,
	newDescription: string
) {
	const { data, error } = await supabase
		.from("courses")
		.update({ name: newName, description: newDescription })
		.eq("id", id);

	return { data, error };
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "PUT") {
		res.setHeader("Access-Control-Allow-Origin", "*");
		try {
			const { id, newName, newDescription } = req.body;
			const { data, error } = await updateCourse(id, newName, newDescription);

			if (error) {
				res.status(500).json({
					message: "An error occurred while updating the course.",
				});
			} else {
				res.status(200).json({
					message: "Course updated successfully!",
					data,
				});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: "An error occurred while updating the course.",
			});
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
