const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb');

/* middleweres */
app.use(express.json())
app.use(cors())

/* username and pass */
//alviasad10
//RhkaCzqZ3wQkwCkO




const uri = "mongodb+srv://alviasad10:RhkaCzqZ3wQkwCkO@cluster0.mifmtux.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
      
        await client.connect();
        /* create database and collection */
        const productCollection = client.db('productDB').collection('product')


        /* post single data  */
        app.post('/products', async (req, res) => {
            const product = req.body
            const result = await productCollection.insertOne(product)
            console.log(result);
            res.send(result);
        })
       
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {


      
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
res.send('server is running')

})


app.listen(port, () => {
 console.log(`app listening on ${port}`);   
})