import { useRouter } from "next/router";
import { useEffect } from "react";

export const Custom404 = () => {
	const router = useRouter();

	useEffect(() => {
		// 404 sayfasına 3 saniye bekleyip otomatik olarak login sayfasına yönlendiriyoruz
		const redirect = setTimeout(() => {
			router.push("/login");
		}, 3000);

		// useEffect fonksiyonu component çözümlendiğinde çalışır. Burada zamanlayıcıyı temizliyoruz.
		return () => {
			clearTimeout(redirect);
		};
	}, [router]);

	return (
		<div className="min-h-screen flex items-center justify-center">
			<h1 className="text-4xl font-bold text-gray-900">
				404 - Sayfa bulunamadı
			</h1>
		</div>
	);
};
