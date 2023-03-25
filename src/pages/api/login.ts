import CreateSupabase from "@/utils";
import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const supabase = CreateSupabase();
async function users() {
	const user = await supabase.from("users").select("*");
	return user;
}

users();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	if (req.method === "POST") {
		const { username, password } = req.body;

		const user = users();
		// username ve password bilgileri ile kullanıcıyı bulun
		// kullanıcıyı bulamazsanız, kullanıcı adı veya şifre yanlış de
		user.then((data) => {
			console.log(data);
			if (data != null && data.data != null) {
				if (data.data[0].username != username) {
					res.status(401).json({ message: "Username Not Define" });
					return;
				}
				if (data.data[0].password != password) {
					res.status(401).json({ message: "Password is incorrect" });
					return;
				}
				res.status(200).json({ message: "Login successful" });
			}
		});
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
