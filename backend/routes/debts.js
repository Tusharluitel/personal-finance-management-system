const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  createDebt,
  getDebt,
  getDebts,
  deleteDebt,
  updateDebt,
} = require("../controller/debtController");

const router = express.Router();

router.use(requireAuth);

router.get("/", getDebts);
router.get("/:id", getDebt);
router.post("/", createDebt);
router.patch("/:id", updateDebt);
router.delete("/:id", deleteDebt);

module.exports = router;
