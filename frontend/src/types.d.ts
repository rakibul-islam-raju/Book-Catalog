interface IResponseMetaData {
	page: number;
	limit: number;
	total: number;
}
interface IResponse<T> {
	success: boolean;
	statusCode: number;
	message: string;
	data: T;
	meta?: IResponseMetaData;
}

interface IPaginationParams {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: string;
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
	publishYear: string;
	createdAt: Date;
	updatedAt: Date;
}

interface IReview {
	id: string;
	comment: string;
	reviewer: IUser;
	book: IBook;
	createdAt: Date;
	updatedAt: Date;
}
