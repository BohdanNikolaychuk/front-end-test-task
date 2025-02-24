import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { loginFailure, loginStart, loginSuccess } from "../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { validateEmail } from "../utils/validateEmail";

const SignInPage: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {isAuthenticated, loading , error} = useAppSelector((state) => state.auth);

	const [formData, setFormData] = useState<{ email: string; password: string }>({
		email: "",
		password: "",
	});

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/");
		}
	}, [isAuthenticated, navigate]);


	const handleSubmit = 
		async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
	
			const { email, password } = formData;
	
			if (!email) {
				dispatch(loginFailure("Email is required"));
				return;
			}
			
			if (!password) {
				dispatch(loginFailure("Password is required"));
				return;
			}
	
			if (!validateEmail(email)) {
				dispatch(loginFailure("Email not valid"));
				return;
			}
	
			dispatch(loginStart());
	
			await new Promise((resolve) => setTimeout(resolve, 1000));
	
			if (email === "test@test.test" && password === "password") {
				dispatch(
					loginSuccess({
						email,
						name: email.split("@")[0],
						id: Math.random(),
						role: "user",
					})
				);
			} else {
				dispatch(loginFailure("User not found"));
			}
		}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	
	return (
		<div className="h-screen flex items-center justify-center bg-gray-50">
			<div className="w-full max-w-md">
				<div className="bg-white shadow-md rounded-xl p-8">
					<h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
						Sign In
					</h1>
					{error && (
						<div className="mb-4 text-red-600 text-sm text-center">{error}</div>
					)}
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor="email" className="block text-sm font-medium mb-2">
								Email address
							</label>
							<input
								id="email"
								name="email"
								className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
								value={formData.email}
								onChange={handleChange}
							/>
						</div>
						<div className="mb-6">
							<label
								htmlFor="password"
								className="block text-sm font-medium mb-2"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
								value={formData.password}
								onChange={handleChange}
							/>
						</div>
						<button
							type="submit"
							className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
							disabled={loading}
						>
							{loading ? "Signing in..." : "Sign in"}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignInPage;
