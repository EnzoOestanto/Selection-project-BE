const express = require('express');
const PORT = 5001;
const app = express();
var cors = require('cors')

app.use(express.json())
app.use(express.static('Public'))
app.use(cors()) 

app.get('/', (req, res) => {
    res.send('<h1> WELCOME</h1>')
})

// import Routes
const { authRouter } = require('./routers')
app.use('/auth',authRouter)


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
