const router = require("express").Router();
const {
	getThought,
	getSingleThought,
	createThought,
	updateThought,
	deleteThought,
	createReaction,
	deleteReaction,
} = require("../../controllers/thoughtController");

router.get("/", getThought);
router.post("/", createThought);

router.get("/:thoughtId", getSingleThought);
router.put("/:thoughtId", updateThought);
router.delete("/:thoughtId", deleteThought);

router.post("/:thoughtId/reactions", createReaction);

router.delete("/:thoughtId/reactions/:reactionId", deleteReaction);

module.exports = router;
