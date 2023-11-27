const mongoose = require('mongoose');

(async () => {
    try{
        await mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connected to database");
    } catch(err) {
        console.log("could not connect to database");
    }
})();