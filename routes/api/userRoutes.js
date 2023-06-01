const router = require("express").Router();
const {
	getUser,
	getSingleUser,
	createUser,
	updateUser,
	deleteUser,
	addFriend,
	deleteFriend,
} = require("../../controllers/userController");

router.get("/", getUser);
router.post("/", createUser);

router.get("/:userId", getSingleUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

router.post("/:userId/friends/:friendId", addFriend);
router.delete("/:userId/friends/:friendId", deleteFriend);

module.exports = router;
