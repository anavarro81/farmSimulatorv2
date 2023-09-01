const Invoice = require("../models/invoice.models");

const getInvoice = async (req, res) => {
  try {
    const allInvoice = await Invoice.find();
    return res.status(200).json(allInvoice);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const postInvoice = async (req, res) => {
  
  console.log('Estoy en postInvoce');
  
  try {
    const newInvoice = new Invoice(req.body);
    const createdInvoice = await newInvoice.save();

    return res.status(201).json(createdInvoice);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const putInvoice = async (req, res) => {

  
  try {
    const { id } = req.params;
    const putInvoice = new Invoice(req.body);
    putInvoice._id = id;
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, putInvoice, {
      new: true,
    });

    console.log('He podido hacer el INSERT');

    if (!updatedInvoice) {
      return res.status(404).json({ message: "no existe este id de director" });
    }
    return res.status(200).json(updatedInvoice);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const deleteInvoice = async (req, res) => {
  try {
    const {id} = req.params;
    const deletedInvoice = await Invoice.findByIdAndDelete(id)
    if (!deletedInvoice) {
        return res.status(404).json({message:"este id no existe"})
    }
    return res.status(200).json(deletedInvoice);
  } catch (error) {
    return res.status(500).json(error)
  }
};

module.exports = { getInvoice, postInvoice, putInvoice, deleteInvoice };
