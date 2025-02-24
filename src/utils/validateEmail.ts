
export const validateEmail = (email: string) => {
	return /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email);
};
