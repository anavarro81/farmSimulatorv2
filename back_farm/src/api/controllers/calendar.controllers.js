const Calendar = require("../models/calendar.models");

const getCalendar = async (req, res) => {
  try {
    const allCalendar = await Calendar.find();
    return res.status(200).json(allCalendar);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// const postCalendar = async (req, res) => {
//   try {
//     const newCalendar = new Calendar(req.body);
//     const createdCalendar = await newCalendar.save();

//     return res.status(201).json(createdCalendar);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// };

const putCalendar = async (req, res) => {
  try {
    const { id } = req.params;
    const putCalendar = new Calendar(req.body);
    putCalendar._id = id;
    const updatedCalendar = await Calendar.findByIdAndUpdate(id, putCalendar, {
      new: true,
    });
    if (!updatedCalendar) {
      return res.status(404).json({ message: "no existe este id de actor" });
    }
    return res.status(200).json(updatedCalendar);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const deleteCalendar = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedCalendar = await Calendar.findByIdAndDelete(id)
    if (!deletedCalendar) {
        return res.status(404).json({message:"este id no existe"})
    }
    return res.status(200).json(deletedCalendar);
  } catch (error) {
    return res.status(500).json(error)
  }
};

const addCalendar = async (req, res) => {

  console.log('Estoy en addCalendar')


  try {
    const newCalendar = new Calendar(req.body);

    console.log('Me llegan datos: ', req.body)

    const createdCalendar = await newCalendar.save();
    return res.status(201).json(createdCalendar);

  } catch (error) {
    console.log('Doy error: ', error)
    return res.status(500).json(error);
  }
};

module.exports = { getCalendar, addCalendar, deleteCalendar, putCalendar };
