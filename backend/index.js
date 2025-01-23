let express = require('express');
let app = express();
app.use(express.json());
let cors= require('cors');

app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello world');
});

// Middleware to parse JSON
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Default route for the root
app.get('/', (req, res) => {
    res.send('Hello, World! Server is running.');
});




app.use('/authentication', require('./controllers/authentication'));
app.use('/employees', require('./controllers/employees'));
app.use('/radios', require('./controllers/radios'));
app.use('/clients', require('./controllers/clients'));
app.use('/gsts', require('./controllers/gsts'));
app.use('/newspapers', require('./controllers/newspapers'));
app.use('/holidays', require('./controllers/holidays'));


// Handle unknown routes (404)
app.use((req, res, next) => {
    res.status(404).json({ status: "failed", message: "Route not found" });
});

// Global error handler for debugging
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: "failed", message: "Internal server error" });
});



app.listen(8081,()=>{
    console.log('Server is running on http://localhost:8081');
    
})