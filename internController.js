const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const APIFeatures = require("./utils/apiFeatures");
const Intern = require("./internModel");

exports.registerIntern = catchAsync(async (req, res, next) => {
  const newIntern = await Intern.create(req.body);

  res.status(201).json({
    status: "Successful",
    data: {
      intern: newIntern,
    },
  });
});

exports.getAllInterns = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Intern.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const interns = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: interns.length,
    data: {
      interns,
    },
  });
});

exports.getIntern = catchAsync(async (req, res, next) => {
  const intern = await Intern.findById(req.params.id);

  if (!intern) {
    return next(new AppError("No intern found with this id", 404));
  }

  res.status(200).json({
    stauts: "success",
    data: {
      intern,
    },
  });
});

exports.updateIntern = catchAsync(async (req, res, next) => {
  const intern = await Intern.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!intern) {
    return next(new AppError("No intern found with this id", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      intern,
    },
  });
});

exports.deleteIntern = catchAsync(async (req, res, next) => {
  const intern = await Intern.findByIdAndDelete(req.params.id);

  if (!intern) {
    return next(new AppError("No intern found with that ID", 404));
  }
  res.status(204).json({
    status: "Successful",
    data: null,
  });
});
