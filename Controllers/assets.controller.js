const AssetsModel = require('../Models/assets.model');

async function basicDetails(req,res){
    console.log(req.body);
    
    try {
    const id = await AssetsModel.createBasicProfile(req.body);
    res.status(201).json({ message: 'Assets Profile registered successfully', userId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating Profile' });
  }
}

module.exports = {
  basicDetails
};