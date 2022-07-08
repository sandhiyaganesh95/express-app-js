const UserModel = require('../model/user');

//Create and save a new user
exports.create = async (req, res) => {
  const user = new UserModel(req.body);
  await user.save().then((data) => {
    res.send({
      message: 'User created successfully',
      user: user
    });
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the User.'
    })
  });
}

//Retrieve and return all users from the database
exports.findAll = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch(err) {
    res.status(404).json({message: err.message || 'User not found'});
  }
};

//Retrieve a user by id
exports.findUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).send(user);
  } catch(err) {
    res.status(404).json({message: err.message || 'User not found'});
  }
};

//Update a user by id
exports.update = async (req, res) => {
  if(!req.body) {
    res.status(400).send({
      message: 'Payload cannot be empty'
    });
  }
  const id = req.params.id;
  await UserModel.findByIdAndUpdate(id, req.body)
  .then((data) => {
    if(!data){
      res.status(404).send({
        message: 'User not found'
      })
    } else {
      res.send({
        message: 'User updated successfully'
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Some error occurred while updating the User.'
    });
  })
}

//Delete a user by id
exports.delete = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if(!user) {
      res.status(404).send({
        message: 'User not found'
      });
    } else {
      await user.remove();
      res.status(200).send({message: 'User deleted successfully'});
    }
  } catch(err){
    res.status(500).send({
      message: err.message || 'Some error occurred while deleting the User.'
    })
  }
}