import User from '../model/User.js'

export const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find();

		if (!users) {
			return res.status(404).json({ message: 'No users found in database.' });
		}

		return res.status(200).json(users)
	} catch (err) {
		console.error(err);
		next(err);
	}
};

export const getUserById = async (req, res, next) => {
	const id = req.params.id;
	let user;
	try {
		user = await User.findById(id);
	} catch (err) {
		console.error(err);
		next(err);
	}

	if (!user) {
		res.status(404).json({ message: 'User not found.' });
	}

	res.status(200).json(user);
};

export const updateUser = async (req, res, next) => {
	const id = req.params.id;
	let user;
	try {
		user = await User.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true } // third param makes it return new object instead of original
		);
	} catch (err) {
		next(err);
	}

	if (!user) {
		return res.status(404).json({ message: 'User not found.' });
	}

	
	return res.status(200).json(user);
};

export const deleteUser = async (req, res, next) => {
	const id = req.params.id;
	try {
		const user = await User.findByIdAndDelete(id);
		return res.status(200).json({ message: "User has been deleted." });
	} catch (err) {
		console.error(err);
		next(err);
	}
};

