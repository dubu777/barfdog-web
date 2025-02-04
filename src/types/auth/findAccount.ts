export type {
	FindUserEmail,
	TemporaryUserEmail,
	TemporaryPassword,
	ConnectSnsPassword,
	ConnectSns,
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

interface ConnectSnsPassword {
	password: string;
}

interface ConnectSns {
	password: string;
	phoneNumber: string;
	provider: string;
	providerId: string;
	tokenValidDays: null | number;
}
