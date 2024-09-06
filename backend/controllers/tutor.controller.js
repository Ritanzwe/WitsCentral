
const User = require('../models/user.model');
const Tutor = require('../models/tutor.model');


const register =  async (req, res) => {
    try {
      const { subject, description, isPaid } = req.body;
      const profileImage =  req.file ? `/uploads/${req.file.filename}` : '';
  
      if (!subject || !description) {
        return res.status(400).json({ error: "Subject and description are required" });
      }
  
      const newTutor = new Tutor({
        userId: req.user._id,
        subject,
        description,
        isPaid,
        profileImage,
      });
  
      const savedTutor = await newTutor.save();
  
      await User.findByIdAndUpdate(req.user._id, { tutorId: savedTutor._id });
  
      res.status(201).json({
        user: {
          fullname: req.user.fullname,
          email: req.user.email,
          profilePicture: req.user.profilePicture,
          role: req.user.role,
          contactInfo: req.user.contactInfo,
        },
        tutor: savedTutor,
      });
    } catch (error) {
      console.error("Error in tutor profile creation:", error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getTutors =  async (req, res) => {
    try {
      const tutors = await Tutor.find().populate('userId', 'fullname email profilePicture contactInfo');
      
      res.status(200).json(tutors);
    } catch (error) {
      console.error("Error fetching tutors:", error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateTutor =  async (req, res) => {
    try {
      const { subject, description, isPaid } = req.body;
      const profileImage = req.file ? req.file.path : undefined;
  
      const updatedFields = { subject, description, isPaid };
      if (profileImage) {
        updatedFields.profileImage = profileImage;
      }
  
      const updatedTutor = await Tutor.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
  
      if (!updatedTutor) {
        return res.status(404).json({ error: 'Tutor not found' });
      }
  
      res.status(200).json(updatedTutor);
    } catch (error) {
      console.error("Error updating tutor profile:", error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteTutor =  async (req, res) => {
    try {
      const deletedTutor = await Tutor.findByIdAndDelete(req.params.id);
  
      if (!deletedTutor) {
        return res.status(404).json({ error: 'Tutor not found' });
      }
  
      // Optionally, also remove the tutor reference from the User model
      await User.findOneAndUpdate({ tutorId: req.params.id }, { tutorId: null });
  
      res.status(200).json({ message: 'Tutor profile deleted successfully' });
    } catch (error) {
      console.error("Error deleting tutor profile:", error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    register,
    getTutors,
    updateTutor,
    deleteTutor

}