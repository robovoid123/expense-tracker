// const { check } = require("express-validator");

// const addExampleValidator = () => {
//   return [
//     check("title").not().isEmpty().trim().withMessage("Name is required"),
//     check("detail").optional().trim().isString(),
//   ];
// };

// const userExampleAssignUnassignValidator = () => {
//   return [
//     check("user_id")
//       .not()
//       .isEmpty()
//       .trim()
//       .isNumeric()
//       .withMessage("User ID is required"),
//     check("Example_id")
//       .not()
//       .isEmpty()
//       .trim()
//       .isNumeric()
//       .withMessage("Example ID is required"),
//   ];
// };

// const updateExampleValidator = () => {
//   return [
//     check("title")
//       .trim()
//       .optional() //can be skipped
//       .notEmpty() //but cannot be empty
//       .withMessage("Title cannot be empty and is required"),
//     check("detail").trim().optional(), //can be skipped
//   ];
// };

// module.exports = {
//   addExampleValidator,
//   updateExampleValidator,
//   userExampleAssignUnassignValidator,
// };
