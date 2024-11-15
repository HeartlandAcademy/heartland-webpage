import asyncHandler from "express-async-handler";
import Events from "../models/eventsModel.js";
import WEvents from "../models/womenEventModel.js";

// @desc    Get Events upto date
// @route   GET /api/events/upcomingevents
// @access  Public
const getUpcomingEvents = asyncHandler(async (req, res) => {
  await Events.updateMany(
    { date: { $lt: Date.now() } },
    { $set: { isOutdated: true } }
  );

  const events = await Events.find({ isOutdated: 0 }).sort({ date: 1 });
  res.json(events);
});

// @desc    Fetch All Events
// @route   GET /api/events
// @access  Private
const getEvents = asyncHandler(async (req, res) => {
  await Events.updateMany(
    { date: { $lt: Date.now() } },
    { $set: { isOutdated: true } }
  );

  const events = await Events.find({}).sort({ isOutdated: 0, date: 1 });
  res.json(events);
});

// @desc    Fetch All Women Events
// @route   GET /api/wevents
// @access  Private
const getWEvents = asyncHandler(async (req, res) => {
  const events = await WEvents.find({}).sort({ date: 1 });
  res.json(events);
});

// @desc    Delete Events
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvents = asyncHandler(async (req, res) => {
  const singleEvents = await Events.findById(req.params.id);
  if (singleEvents) {
    await singleEvents.remove();
    res.json({ message: "Events Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Events not found");
  }
});

// @desc    Delete Women Events
// @route   DELETE /api/wevents/:id
// @access  Private
const deleteWEvents = asyncHandler(async (req, res) => {
  const singleEvents = await WEvents.findById(req.params.id);
  if (singleEvents) {
    await singleEvents.remove();
    res.json({ message: "Events Deleted Successfully" });
  } else {
    res.status(404);
    throw new Error("Events not found");
  }
});

// @desc    Create events
// @route   POST /api/events
// @access  Private
const createEvents = asyncHandler(async (req, res) => {
  const { title, description, date, image, user } = req.body;

  const events = await Events.create({
    title,
    user,
    description,
    date,
    image,
  });

  if (events) {
    res.status(201).json({
      _id: events._id,
      user: user._id,
      title: events.title,
      description: events.description,
      date: events.date,
      image: events.image,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Events Data");
  }
});

// @desc    Create Women events
// @route   POST /api/events
// @access  Private
const createWEvents = asyncHandler(async (req, res) => {
  const { title, description, startDate, endDate } = req.body;

  const events = await WEvents.create({
    title,
    description,
    startDate,
    endDate,
  });

  if (events) {
    res.status(201).json({
      _id: events._id,
      title: events.title,
      description: events.description,
      startDate: events.startDate,
      endDate: events.endDate,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Events Data");
  }
});

// @desc    Fetch upcoming 2 events
// @route   GET /api/events/upcoming
// @access  Public
const getLatestEvents = asyncHandler(async (req, res) => {
  await Events.updateMany(
    { date: { $lt: Date.now() } },
    { $set: { isOutdated: true } }
  );

  const events = await Events.find({ isOutdated: 0 })
    .sort({ date: 1 })
    .limit(2);
  res.json(events);
});

export {
  getUpcomingEvents,
  getEvents,
  deleteEvents,
  createEvents,
  getLatestEvents,
  getWEvents,
  deleteWEvents,
  createWEvents,
};
