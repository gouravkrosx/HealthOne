// dbPassword = 'mongodb+srv://YOUR_USERNAME_HERE:'+ encodeURIComponent('YOUR_PASSWORD_HERE') + '@CLUSTER_NAME_HERE.mongodb.net/test?retryWrites=true';

dbPassword='mongodb://localhost:27017/HealthCareDB'
module.exports = {
    mongoURI: dbPassword
};
