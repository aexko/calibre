const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to PLAYGROUND."))