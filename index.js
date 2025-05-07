const { ApolloServer, gql } = require('apollo-server');
const sequelize = require('./db'); // Your Sequelize instance
const User = require('./models/User'); // Sequelize model for 'users'
const Post = require('./models/Post'); // Sequelize model for 'posts'
const Comment = require('./models/Comment'); // Sequelize model for 'comments'
const Profile = require('./models/Profile'); // Sequelize model for 'profiles'

// ✅ GraphQL Schema Definition
const typeDefs = gql`
  type User {
    id: Int
    name: String
    email: String
    createdAt: String
    updatedAt: String
  }

  type Post {
    id: Int
    title: String
    content: String
    user_id: Int
    createdAt: String
    updatedAt: String
  }

  type Comment {
    id: Int
    content: String
    user_id: Int
    post_id: Int
    createdAt: String
    updatedAt: String
  }

  type Profile {
    id: Int
    user_id: Int
    bio: String
    avatar_url: String
    location: String
    createdAt: String
    updatedAt: String
  }

  type Query {
    users: [User]
    posts: [Post]
    comments: [Comment]
    profiles: [Profile]
  }

  type Mutation {
    updateUser(id: Int!, name: String, email: String): User
    updatePost(id: Int!, title: String, content: String): Post
    updateComment(id: Int!, content: String): Comment
    updateProfile(id: Int!, bio: String, avatar_url: String, location: String): Profile
  }
`;

// ✅ Resolver Functions
const resolvers = {
  Query: {
    users: async () => {
      try {
        return await User.findAll();
      } catch (error) {
        throw new Error('Error fetching users');
      }
    },
    posts: async () => {
      try {
        return await Post.findAll();
      } catch (error) {
        throw new Error('Error fetching posts');
      }
    },
    comments: async () => {
      try {
        return await Comment.findAll();
      } catch (error) {
        throw new Error('Error fetching comments');
      }
    },
    profiles: async () => {
      try {
        return await Profile.findAll();
      } catch (error) {
        throw new Error('Error fetching profiles');
      }
    }
  },

  Mutation: {
    // Update user information
    updateUser: async (_, { id, name, email }) => {
      try {
        const user = await User.findByPk(id);
        if (!user) {
          throw new Error('User not found');
        }
        if (name) user.name = name;
        if (email) user.email = email;
        await user.save();
        return user;
      } catch (err) {
        throw new Error('Error updating user: ' + err.message);
      }
    },

    // Update post information
    updatePost: async (_, { id, title, content }) => {
      try {
        const post = await Post.findByPk(id);
        if (!post) {
          throw new Error('Post not found');
        }
        if (title) post.title = title;
        if (content) post.content = content;
        await post.save();
        return post;
      } catch (err) {
        throw new Error('Error updating post: ' + err.message);
      }
    },

    // Update comment content
    updateComment: async (_, { id, content }) => {
      try {
        const comment = await Comment.findByPk(id);
        if (!comment) {
          throw new Error('Comment not found');
        }
        if (content) comment.content = content;
        await comment.save();
        return comment;
      } catch (err) {
        throw new Error('Error updating comment: ' + err.message);
      }
    },

    // Update profile information
    updateProfile: async (_, { id, bio, avatar_url, location }) => {
      try {
        const profile = await Profile.findOne({ where: { user_id: id } });
        if (!profile) {
          throw new Error('Profile not found');
        }
        if (bio) profile.bio = bio;
        if (avatar_url) profile.avatar_url = avatar_url;
        if (location) profile.location = location;
        await profile.save();
        return profile;
      } catch (err) {
        throw new Error('Error updating profile: ' + err.message);
      }
    }
  }
};

// ✅ Apollo Server Initialization
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// ✅ Connect to DB and Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection established successfully.');

    // DO NOT sync if you're using an existing table
    // await sequelize.sync(); 

    const { url } = await server.listen({ port: 3000 });
    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

startServer();
