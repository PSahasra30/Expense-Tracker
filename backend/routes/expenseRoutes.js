// // const express = require('express');
// // const router = express.Router();
// // const Expense = require('../models/Expense');
// // const verifyToken = require("../middleware/authMiddleware");


// // // Add expense
// // router.post('/', async (req, res) => {
// //   try {
// //     console.log("Received expense:", req.body); // ✅ Debug log
// //     const newExpense = new Expense(req.body);
// //     const saved = await newExpense.save();
// //     res.status(201).json(saved);
// //   } catch (err) {
// //     console.error(err); // ✅ Log the actual error
// //     res.status(500).json(err);
// //   }
// // });

// // // Get all expenses
// // router.get('/', async (req, res) => {
// //   try {
// //     const expenses = await Expense.find();
// //     res.status(200).json(expenses);
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // });

// // // ✅ Get single expense by ID (for edit page)
// // router.get('/:id', async (req, res) => {
// //   try {
// //     const expense = await Expense.findById(req.params.id);
// //     if (!expense) return res.status(404).json({ message: "Expense not found" });
// //     res.status(200).json(expense);
// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // });

// // // Delete expense
// // router.delete('/:id', async (req, res) => {
// //   try {
// //     await Expense.findByIdAndDelete(req.params.id);
// //     res.status(200).json({ message: 'Deleted' });
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // });

// // // Update expense
// // router.put('/:id', async (req, res) => {
// //   try {
// //     const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //     res.status(200).json(updated);
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // });

// // module.exports = router;





// const express = require('express');
// const router = express.Router();
// const Expense = require('../models/Expense');
// const verifyToken = require('../middleware/authMiddleware');

// // ✅ Secure all routes with verifyToken
// router.use(verifyToken);

// // ✅ Add expense (with userId)
// router.post('/', async (req, res) => {
//   try {
//     const newExpense = new Expense({
//       ...req.body,
//       userId: req.userId // attach userId from middleware
//     });

//     const saved = await newExpense.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Get all expenses for logged-in user only
// router.get('/', async (req, res) => {
//   try {
//     const expenses = await Expense.find({ userId: req.userId });
//     res.status(200).json(expenses);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Get single expense by ID (only if it belongs to the user)
// router.get('/:id', async (req, res) => {
//   try {
//     const expense = await Expense.findOne({ _id: req.params.id, userId: req.userId });
//     if (!expense) return res.status(404).json({ message: 'Expense not found' });
//     res.status(200).json(expense);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Delete expense (only if it belongs to the user)
// router.delete('/:id', async (req, res) => {
//   try {
//     const deleted = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId });
//     if (!deleted) return res.status(404).json({ message: 'Expense not found or not authorized' });
//     res.status(200).json({ message: 'Deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ Update expense (only if it belongs to the user)
// router.put('/:id', async (req, res) => {
//   try {
//     const updated = await Expense.findOneAndUpdate(
//       { _id: req.params.id, userId: req.userId },
//       req.body,
//       { new: true }
//     );
//     if (!updated) return res.status(404).json({ message: 'Expense not found or not authorized' });
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;











const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const verifyToken = require('../middleware/authMiddleware');

// 🔐 Apply auth middleware to all routes
router.use(verifyToken);

// ➕ Add a new expense for the logged-in user
router.post('/', async (req, res) => {
  try {
    const newExpense = new Expense({
      ...req.body,
      userId: req.userId,
    });
    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// 📥 Get all expenses for the logged-in user
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 Get a single expense (only if it belongs to the user)
router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.userId });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🗑️ Delete an expense (only if it belongs to the user)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Expense not found or not authorized' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update an expense (only if it belongs to the user)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Expense not found or not authorized' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
