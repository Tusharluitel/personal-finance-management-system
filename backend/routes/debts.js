const express = require("express");
const router = express.Router();
const {
  createDebt,
  getDebt,
  getDebts,
  deleteDebt,
  updateDebt,
} = require("../controller/debtController");

router.get("/", getDebts);
router.get("/:id", getDebt);
router.post("/", createDebt);
router.patch("/:id", updateDebt);
router.delete("/:id", deleteDebt);

module.exports = router;
