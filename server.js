const express = require('express');
const cors = require('cors');
const Redis = require('redis')
const app = express()
app.use(cors())
const redisClient = Redis.createClient({
    url:'redis://127.0.0.1:6379',
})

redisClient.connect()
app.get('/set',async(req, res) => {
    try {
        const data = req.query.p;
        await redisClient.set('test',data);
        res.status(200).json({
            message:'data cached',
            data:data,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:'something went wrong'
        })
    }
})
app.get('/get',async(req,res)=>{
    try {
        const data=await redisClient.get('test').then((data)=>{
            return data;
        })
        res.status(200).json({
            message:'cached data recived',
            data,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'smething went wrong'
        })
    }
})
app.listen(1800, () => {
    console.log('server running at port 1800')
})