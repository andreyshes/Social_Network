const { User, Thought } = require("../models");

module.exports = {
	getThought: async (req, res) => {
		try {
			const thought = await Thought.find({});
			res.json(thought);
		} catch (err) {
			res.status(500).json(err);
		}
	},

	getSingleThought: async (req, res) => {
		try {
			const singleThought = await Thought.findOne({
				_id: req.params.thoughtId,
			}).select("-__v");
			if (!singleThought) {
				return res
					.status(404)
					.json({ message: "No Thought found with this ID!" });
			}
			res.json(singleThought);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	createThought(req, res) {
		Thought.create(req.body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: req.body.userId },
					{ $push: { thoughts: _id } },
					{ new: true }
				);
			})
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No User found with this ID!" })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},

	updateThought: async (req, res) => {
		try {
			const updatedThought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $set: req.body },
				{ runValidators: true, new: true }
			);

			if (!updatedThought) {
				return res
					.status(404)
					.json({ message: "No thought found with this ID!" });
			}

			res.json(updatedThought);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	deleteThought: async (req, res) => {
		try {
			const deletedThought = await Thought.findOneAndDelete({
				_id: req.params.thoughtId,
			});

			if (!deletedThought) {
				return res
					.status(404)
					.json({ message: "No thought found with this ID!" });
			}

			const updatedUser = await User.findOneAndUpdate(
				{ thoughts: req.params.thoughtId },
				{ $pull: { thoughts: req.params.thoughtId } },
				{ new: true }
			);

			if (!updatedUser) {
				return res
					.status(404)
					.json({ message: "Thought deleted, but no user found" });
			}

			res.json({ message: "Thought successfully deleted" });
		} catch (err) {
			res.status(500).json(err);
		}
	},
	createReaction: async (req, res) => {
		try {
			const updatedThought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $addToSet: { reactions: req.body } },
				{ runValidators: true, new: true }
			);

			if (!updatedThought) {
				return res
					.status(404)
					.json({ message: "No thought found with this ID!" });
			}

			res.json(updatedThought);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	deleteReaction: async (req, res) => {
		try {
			const updatedThought = await Thought.findOneAndUpdate(
				{ _id: req.params.thoughtId },
				{ $pull: { reactions: { reactionId: req.params.reactionId } } },
				{ runValidators: true, new: true }
			);

			if (!updatedThought) {
				return res
					.status(404)
					.json({ message: "No thought found with this ID!" });
			}

			res.json(updatedThought);
		} catch (err) {
			res.status(500).json(err);
		}
	},
};
