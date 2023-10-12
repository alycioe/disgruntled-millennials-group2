const sequelize = require('../config/connection');
const { User } = require('../model');
const { Post } = require('../model/Posts')
const userData = require('./userData.json');
const postData = require('./postData.json');

const seedDatabase = async () => {
        await sequelize.sync({ force: true });

        await User.bulkCreate(userData, {
            individualHooks: true,
            returning: true,
        });

        await Post.bulkCreate(postData,)

        process.exit(0);
};

seedDatabase();