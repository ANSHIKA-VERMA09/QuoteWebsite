const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Quote = require("./models/quote");

const app = express();
const port = 8000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/quotehub")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB", err));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json()); // For parsing JSON bodies

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Routes

// Home route
app.get("/", (req, res) => {
    console.log("Request received");
    res.render("Home");  
});

// About route
app.get("/quote/about", (req, res) => {
    res.render("about");
});

// Recommendation route
app.get("/quote/books", (req, res) => {
    res.render("Recommedation", { dirname: __dirname });
});

// Random quote route
app.get("/quote", async (req, res) => {
    try {
        const count = await Quote.countDocuments();  // Get total number of documents
        const randomIndex = Math.floor(Math.random() * count);  // Get a random index
        const randomQuote = await Quote.findOne().skip(randomIndex);  // Fetch a random quote

        if (randomQuote) {
            // If a quote is found, send it as JSON
            res.render("quote.ejs",{randomQuote});
        } else {
            // If no quote is found, return an empty response
            res.status(404).json({ error: "No quotes available" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch quote" });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
