import {compare, hash} from "bcryptjs";
import {User} from "../../entity/User";
import {msgs} from "../../utils/responseMsgs";
import {IProductCreateRequest} from "../types/products/request";
import {IUserLoginRequest, IUserRegisterRequest} from "../types/users/request";

async function login(data: IUserLoginRequest) {
	const user = await User.findOne({where: {email: data.email}});

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

async function createOne(item: IProductCreateRequest) {}

export default {
	login,
	register,
};
