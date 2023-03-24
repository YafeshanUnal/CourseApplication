import CreateSupabase from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = CreateSupabase();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { name, description } = req.body;
		const { data, error } = await supabase
			.from("courses")
			.insert([{ name, description }]);
		if (error) {
			res.status(401).json({ message: "Error" });
		} else {
			res.status(200).json({ message: "Success" });
		}
	}
}
