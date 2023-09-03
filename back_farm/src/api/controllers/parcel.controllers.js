const Parcel = require("../models/parcel.models");
const User = require("../models/user.models");

const getParcel = async (req, res) => {
  try {
    const allParcel = await Parcel.find().populate("calendar");
    return res.status(200).json(allParcel);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Devuelve información de la parcela por id. 
const getParcelInfo = async (req, res) => {
  try {
    const {id} = req.params;
    const userParcelInfo = await Parcel.findById(id);
    console.log("id", id)
    console.log(userParcelInfo)
    return res.status(200).json(userParcelInfo);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const postParcel = async (req, res) => {
  try {
    const newParcel = new Parcel(req.body);
    if (req.file) {
      // newParcel.img = req.file.path;
    }
    const createdParcel = await newParcel.save();
    const updatedUser = await User.findByIdAndUpdate(req.body.user,
      { $addToSet: { parcel: createdParcel._id } },
      { new: true }
    );

    return res.status(201).json(createdParcel);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

const putParcel = async (req, res) => {
  try {
    const { id } = req.params;
    const putParcel = new Parcel(req.body);
    putParcel._id = id;
    // putParcel.img = req.file.path;
    const updatedParcel = await Parcel.findByIdAndUpdate(id, putParcel, {
      new: true,
    });
    if (!updatedParcel) {
      return res.status(404).json({ message: "no existe este id de pelicula" });
    }
    return res.status(200).json(updatedParcel);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const deleteParcel = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedParcel = await Parcel.findByIdAndDelete(id)
    if (!deletedParcel) {
        return res.status(404).json({message:"este id no existe"})
    }
    return res.status(200).json(deletedParcel);
  } catch (error) {
    return res.status(500).json(error)
  }
};

module.exports = { getParcel, getParcelInfo, postParcel, putParcel, deleteParcel };
