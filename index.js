const express = require('express')
const app = express()
const port = 2000

// const heroesRouter = require ('./src/routes/heroesRoute')
// app.use(express.json())
// app.use(heroesRouter)

const productRouter = require ('./src/routes/productRoute')
app.use(express.json())
app.use(productRouter)

const storeRouter = require ('./src/routes/storeRoute')
app.use(express.json())
app.use(storeRouter)

const uiRouter = require ('./src/routes/storeRoute')
app.use(express.json())
app.use(uiRouter)

app.get('/',(req,res)=>{
    res.send({message: "accessed succesfully"})
})

app.listen(port, ()=> console.log('api is running'))