let express = require('express');
let app = express();
app.use(express.json());
let cors= require('cors');

app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use('/employees', require('./controllers/employees'));
app.use('/radios', require('./controllers/radios'));
app.use('/clients', require('./controllers/clients'));
app.use('/gsts', require('./controllers/gsts'));
app.use('/newspapers', require('./controllers/newspapers'));
app.use('/holidays', require('./controllers/holidays'));
app.use('/users', require('./controllers/users'));



app.listen(8081,()=>{
    console.log('Server is running on http://localhost:8081');
    
})