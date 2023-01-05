import Room from '../model/Room.js';
import Hotel from '../model/Hotel.js';

export const getAllRooms = async (req, res, next) => {
	try {
		const rooms = await Room.find();

		if (!rooms) {
			return res.status(404).json({ message: 'No rooms found in database.' });
		}

		return res.status(200).json(rooms)
	} catch (err) {
		console.error(err);
		next(err);
	}
};

export const getRoomById = async (req, res, next) => {
	const id = req.params.id;
	let room;
	try {
		room = await Room.findById(id);
	} catch (err) {
		console.error(err);
		next(err);
	}

	if (!room) {
		res.status(404).json({ message: 'Room not found.' });
	}

	res.status(200).json(room);
};

export const createRoom = async (req, res, next) => {
	const hotelId = req.params.hotelId;
	const room = new Room(req.body);

	try {
		const result = await room.save();
		try {
			await Hotel.findByIdAndUpdate(hotelId, {$push: { rooms: result._id}});
		} catch (error) {
			next(error);
		}

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
}

export const updateRoom = async (req, res, next) => {
	const id = req.params.id;
	let room;
	try {
		room = await Room.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true } // third param makes it return new object instead of original
		);
	} catch (err) {
		next(err);
	}

	if (!room) {
		return res.status(404).json({ message: 'Room not found.' });
	}

	
	return res.status(200).json(room);
};

export const deleteRoom = async (req, res, next) => {
	// TODO: change logic to delete room from hotels array
	const hotelId = req.params.hotelId;
	const id = req.params.id;
	try {
		const room = await Room.findById(id);
		try {
			await Room.findByIdAndDelete(id);
			// TODO: change depending on hotel by relationship
			await Hotel.findByIdAndUpdate(hotelId, {$pull: { rooms: result._id}});
		} catch (error) {
			next(error);
		}

		return res.status(200).json({ message: "Room has been deleted." });
	} catch (err) {
		console.error(err);
		next(err);
	}
};

