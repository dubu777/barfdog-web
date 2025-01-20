export type {
	FindUserEmail,
	TemporaryUserEmail,
	TemporaryPassword,
};

interface FindUserEmail {
	name: string;
	phoneNumber: string;
}

interface TemporaryUserEmail {
	email: string;
	provider: string | null;
}

interface TemporaryPassword extends FindUserEmail {
	email: string;
}