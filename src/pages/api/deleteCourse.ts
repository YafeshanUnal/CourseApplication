import CreateSupabase from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = CreateSupabase();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "DELETE") {
		const { id } = req.body;

		const { data, error } = await supabase
			.from("courses")
			.delete()
			.eq("id", id);

		if (error) {
			res.status(401).json({ message: "Error" });
		} else {
			res.status(200).json({ message: "Success" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
