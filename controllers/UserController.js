const { User, Thought } = require("../models");

module.exportss = {
	getUser: async (req, res) => {
		try {
			const users = await User.find({});
			res.json(users);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	getSingleUser: async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.params.userId })
				.populate("thoughts")
				.populate("friends")
				.select("-__v");

			if (!user) {
				return res.status(404).json({ message: "No User found with that ID!" });
			}

			res.json(user);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	createUser: async (req, res) => {
		try {
			const user = await User.create(req.body);
			res.json(user);
		} catch (err) {
			console.log(err);
			res.status(500).json(err);
		}
	},
	updateUser: async (req, res) => {
		try {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			);

			if (!updatedUser) {
				return res.status(404).json({ message: "No User found with this ID!" });
			}

			res.json(updatedUser);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	deleteUser: async (req, res) => {
		try {
			const deletedUser = await User.findOneAndDelete({
				_id: req.params.userId,
			});

			if (!deletedUser) {
				return res.status(404).json({ message: "No User found with this ID!" });
			}

			await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

			res.json({ message: "User and User's Thoughts deleted!" });
		} catch (err) {
			res.status(500).json(err);
		}
	},
	addFriend: async (req, res) => {
		try {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $addToSet: { friends: req.params.friendId } },
				{ runValidators: true, new: true }
			);

			if (!updatedUser) {
				return res.status(404).json({ message: "No User found with this ID!" });
			}

			res.json(updatedUser);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	deleteFriend: async (req, res) => {
		try {
			const updatedUser = await User.findOneAndUpdate(
				{ _id: req.params.userId },
				{ $pull: { friends: req.params.friendId } },
				{ new: true }
			);

			if (!updatedUser) {
				return res.status(404).json({ message: "No User found with this ID!" });
			}

			res.json(updatedUser);
		} catch (err) {
			res.status(500).json(err);
		}
	},
};
