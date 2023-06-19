const express = require('express');
const PORT = 5001;
const app = express();
var cors = require('cors')

app.use(express.json())
app.use(express.static('public'))
app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1> WELCOME</h1>')
})

// import Routes
const { authRouter, postRouter, userRouter, likeRouter, commentRouter } = require('./routers')
app.use('/auth', authRouter)
app.use('/posts', postRouter)
app.use('/users', userRouter)
app.use('/likes', likeRouter)
app.use('/comments', commentRouter)


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
