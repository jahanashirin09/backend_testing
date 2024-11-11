const create = async (req, res) => {
  const { PersonID, FirstName, LastName, Address, City, Username, Password } =
    req.body;
  if (
    !PersonID ||
    !FirstName ||
    !LastName ||
    !Address ||
    !City ||
    !Username ||
    !Password
  ) {
    return res.status(400).send({
      success: false,
      message: "Please provide all required fields",
    });
  }
  
  res.status(201).send({
    success: true,
    message: "Details created successfully",
  });
};
module.exports = { create };
