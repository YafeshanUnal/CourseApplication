import CreateSupabase from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = CreateSupabase();

async function getAllCourses() {
	const { data, error } = await supabase.from("courses").select("*");
	return { data, error };
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "GET") {
		try {
			const { data, error } = await getAllCourses();

			if (error) {
				res.status(500).json({
					message: "An error occurred while fetching courses.",
				});
			} else {
				res.status(200).json({ data });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({
				message: "An error occurred while fetching courses.",
			});
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
