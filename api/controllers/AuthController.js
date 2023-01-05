import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const user = new User({
			...req.body,
			password: hash
		});

		await user.save();
		res.status(201).json(user).send('User has been created.');
	} catch (error) {
		next(error);
	}
};

export const login = async (req, res, next) => {
	try {
		const user = await User.findOne({
			email: req.body.username
		});

		if (!user) {
			next(createError(400), 'Wrong username and/or password!');
		}

		const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
		if (!isPasswordCorrect) {
			next(createError(400, 'Wrong username and/or password!'));
		}

		const token = jwt.sign({
			id: user._id,
			isAdmin: user.isAdmin
		}, process.env.JWT);

		const { password, isAdmin, ...otherDetails } = user._doc; /// separate password and isAdmin from rest of data
		res
			.cookie('access_token', token, { httpOnly: true }) // create the cookie with JWT token, secure only http
			.status(200)
			.json({details: otherDetails, isAdmin}); // only send the rest of data
	} catch (error) {
		next(error);
	}
};