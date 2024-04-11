const db = require("../db.js")

//Queries for the menu
const Feedback = db.feedback;
const keysArr = ["fedbackText"];
keysArr.sort();

// Validate that the menu item exist to delete/edit/partial edit
const isTheSameArray = (currentValue) => currentValue === keysArr;
const validateFeedback = (feedback) => {
  if(!feedback){
    return res.status(400).json({
      msg : "Bad request",
      status : 400,
      body : "Impossible to find the given information"
    });  
  }
}

const getFeedback = async (req, res) => {
  try {
    const ID = req.params.id
    const getFeedback = await Feedback.findOne(
      {
        where: {
          id : ID
        }
      });
    return res.status(200).json({
      ok : true,
      status : 200,
      body : getFeedback
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    return res.json(feedback);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/*
// --- Edit --- Edit feedback is working but it is not necessary 
const editFeedback = async (req, res) => {
  try {
    const keysReq = Object.keys(req.body);
    keysReq.sort();
    if(!keysReq.every(isTheSameArray)){
        res.status(400).json({
          msg : "Bad request",
          status : 400,
          body : "Missing parameters"
        });
        return;
      }
    const id = req.params.id
    const updateFeedback = await MenuItem.update(
      req.body,
      {
        where: {
          id : id
        }
      });
    validateBook(updateFeedback);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : updateFeedback
    });
  }


  catch(error){
    return res.status(500).json({ message: error.message });
  }
}
*/

// -- delete -- 
const deleteFeedback = async (req, res) => {
  try{
    const id = req.params.id
    const deleteFeedback = await Feedback.destroy({
      where:{
        id : id
      }
    });
    validateFeedback(deleteFeedback);
    return res.status(200).json({
      ok : true,
      status : 200,
      body : deleteFeedback
    });
  } catch (error){
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getFeedbacks,
  createFeedback,
  //editFeedback,
  deleteFeedback,
  getFeedback
};