import Hotel from '../model/Hotel.js'

export const getAllHotels = async (req, res, next) => {
	try {
		const hotels = await Hotel.find();

		if (!hotels) {
			return res.status(404).json({ message: 'No hotels found in database.' });
		}

		return res.status(200).json(hotels)
	} catch (err) {
		console.error(err);
		next(err);
	}
};

export const getHotelById = async (req, res, next) => {
	const id = req.params.id;
	let hotel;
	try {
		hotel = await Hotel.findById(id);
	} catch (err) {
		console.error(err);
		next(err);
	}

	if (!hotel) {
		res.status(404).json({ message: 'Hotel not found.' });
	}

	res.status(200).json(hotel);
};

export const createHotel = async (req, res, next) => {
	const hotel = new Hotel(req.body);

	try {
		await hotel.save();
		res.status(200).json(hotel);
	} catch (err) {
		next(err);
	}
};

export const updateHotel = async (req, res, next) => {
	const id = req.params.id;
	let hotel;
	try {
		hotel = await Hotel.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true } // third param makes it return new object instead of original
		);
	} catch (err) {
		next(err);
	}

	if (!hotel) {
		return res.status(404).json({ message: 'Hotel not found.' });
	}

	
	return res.status(200).json(hotel);
};

export const deleteHotel = async (req, res, next) => {
	const id = req.params.id;
	try {
		const hotel = await Hotel.findByIdAndDelete(id);
		return res.status(200).json({ message: "Hotel has been deleted." });
	} catch (err) {
		console.error(err);
		next(err);
	}
};

