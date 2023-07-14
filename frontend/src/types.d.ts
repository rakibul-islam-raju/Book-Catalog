interface IResponse<T> {
	success: boolean;
	statusCode: number;
	message: string;
	data: T;
}

interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
}

interface IBook {
	id: string;
	title: string;
	author: IUser;
	genre: string;
	createdAt: Date;
	updatedAt: Date;
}
