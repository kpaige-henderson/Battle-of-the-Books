const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kpaigehenderson:iampaige1@cluster0.9it9dfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

module.exports = mongoose.connection;
