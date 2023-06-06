const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const UsersMiddleware = require("../middleware/UsersMiddleware");

// Initialization
const router = Router();

// router.post("/", UsersController.Auth);
router.post(
  "/register",
  UsersMiddleware.authMiddleware,
  UsersController.addUser
);
// router.delete("/delete/:nik", UsersController.deleteUser);
//router.get("/", UsersController.getAlluser);
// router.get("/products/:id", getProductById);
// router.post("/products", saveProduct);
// router.patch("/products/:id", updateProduct);
// router.delete("/products/:id", deleteProduct);

module.exports = router;
