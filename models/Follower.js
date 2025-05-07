const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// User Model
const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
}, {
  timestamps: true, // Automatically adds createdAt/updatedAt
});

// Post Model
const Post = sequelize.define('Post', {
  title: DataTypes.STRING,
  content: DataTypes.TEXT,
}, {
  timestamps: true,
});

// Comment Model
const Comment = sequelize.define('Comment', {
  content: DataTypes.TEXT,
}, {
  timestamps: true,
});

// Profile Model
const Profile = sequelize.define('Profile', {
  bio: DataTypes.TEXT,
  avatar_url: DataTypes.STRING,
  location: DataTypes.STRING,
}, {
  timestamps: true,
});

// Follower Model (Junction table for User followers)
const Follower = sequelize.define('Follower', {}, {
  timestamps: true,
});

// Relationships
User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.hasOne(Profile);
Profile.belongsTo(User);

User.belongsToMany(User, { through: Follower, as: 'Followers', foreignKey: 'follower_id' });
User.belongsToMany(User, { through: Follower, as: 'Followed', foreignKey: 'followed_id' });

module.exports = Follower;  // Export User model

// This code defines a Sequelize model for a User entity.
// It imports the DataTypes object from Sequelize and the sequelize instance from the db.js file.
// This model represents a user in the system. It has two fields: name and email.
// The name field is a string that represents the user's name, and the email field is a string that represents the user's email address.
// The model is defined using Sequelize, which is an ORM (Object-Relational Mapping) library for Node.js.
// Sequelize allows you to interact with your database using JavaScript objects instead of writing raw SQL queries.
// The User model is defined using the define method of the Sequelize instance.
// The first argument is the name of the model, and the second argument is an object that defines the fields of the model.
// The DataTypes object is used to define the data types of the fields.
// In this case, both fields are defined as strings using DataTypes.STRING.
// The User model is then exported so that it can be used in other parts of the application.
// The User model can be used to create, read, update, and delete users in the database.
// The model can also be used to define relationships with other models, such as posts or comments.