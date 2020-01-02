import {compare, hash} from "bcryptjs";
import {User, UserRole} from "../../entity/User";
import {msgs} from "../../utils/responseMsgs";
import {IProductCreateRequest} from "../types/products/request";
import {IUserLoginRequest, IUserRegisterRequest} from "../types/users/request";
import {getManager, getRepository} from "typeorm";

async function getAll() {
	try {
		return await getRepository(User)
			.createQueryBuilder("user")
			.addSelect("user.role")
			.getMany();
	} catch (error) {
		return [];
	}
}

async function login(data: IUserLoginRequest) {
	const user = await getRepository(User)
		.createQueryBuilder("user")
		.where("user.email = :email", {email: data.email})
		.addSelect("user.password")
		.addSelect("user.role")
		.getOne();

	if (!user) {
		return {success: false, status: 404, msg: msgs.userNotFound};
	}

	const valid = await compare(data.password, user.password);

	if (!valid) {
		return {success: false, status: 403, msg: msgs.passwordIncorrect};
	}

	return {
		success: true,
		data: user,
	};
}

async function register(item: IUserRegisterRequest) {
	try {
		const userAlreadyExists = await User.findOne({
			where: {email: item.email},
			select: ["id"],
		});

		if (userAlreadyExists) return {success: false, status: 400, msg: msgs.duplicateEmail};

		const hashedPassword = await hash(item.password, 12);

		const user = User.create({
			email: item.email,
			password: hashedPassword,
			name: item.name,
			role: item.role,
		});

		await user.save();

		return {success: true};
	} catch (error) {
		return {success: false, error: error};
	}
}

async function getAllManagers() {
	try {
		const usersRepository = getManager().getRepository(User);
		return await usersRepository.find({
			where: {role: UserRole.Manager},
		});
	} catch (error) {
		return [];
	}
}

async function getOne(id: string) {
	try {
		const usersRepository = getManager().getRepository(User);
		const user = await usersRepository.findOne(id);

		return user;
	} catch (error) {
		return null;
	}
}

export default {
	login,
	register,
	getAll,
	getOne,
	getAllManagers,
};
