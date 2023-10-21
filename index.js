const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const brands = require('./brands.json')

/* middleweres */
app.use(express.json())
/* app.use(cors()) */
const corsConfig = {
    origin: '*',
    credenttials: true,
    methods : ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}

app.use(cors(corsConfig))

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
      
        
        /* create database and collection */
        const productCollection = client.db('productDB').collection('product')
        const cartCollections = client.db('cartDB').collection('cart');


        /* post single data  */
        app.post('/products', async (req, res) => {
            const product = req.body
            const result = await productCollection.insertOne(product)
           
            res.send(result);
        })

        
        /* single data post for cart ites */
        app.post('/cart', async (req, res) => {
            const cartItems = req.body
            const result = await cartCollections.insertOne(cartItems)
            res.send(result);
        }
        )

        /* read data */
        app.get('/cart', async (req, res) => {
            const result = await cartCollections.find().toArray()

            res.send(result);
        })

        /* for brands */
        app.get('/brands', (req, res) => {
            res.send(brands)
        })
        app.get('/brands/:id', (req, res) => {
            const id = parseInt(req.params.id);
            const brand = brands.find(brand => brand.id === id) || {};
            res.send(brand);
        })



        /* delete a single data  */
        app.delete('/cart/:id', async (req, res) => {
            const id = req.params.id
            console.log(id);
            const query = { _id : id}
            const result = await cartCollections.deleteOne(query)
            console.log(result);
            res.send(result);
        }
        )


        

        /* get single data using id */
        app.get("/products/:id", async (req, res) => {
            const id = req.params.id
            
            const query = {
                _id : new ObjectId(id)
            }
            const result = await productCollection.findOne(query)
            console.log(result);
            res.send(result)
            
        })


        /* update a single data */

        app.put('/products/:id', async (req, res) => {
            const id = req.params.id
            const filter = {
                _id: new ObjectId(id)
            }
            const newProduct = req.body
            const options = {
                upsert: true,
            }
            const updatedProduct = {
                $set: {
                    image_url: newProduct.image_url,
                    name: newProduct.name,
                    brand_name: newProduct.brand_name,
                    type: newProduct.type,
                    details : newProduct.details,
                    price: newProduct.price,
                    short_description: newProduct.short_description,
                    rating: newProduct.rating

                }
            }
            const result = await productCollection.updateOne(filter , updatedProduct , options)
            console.log(result);
            res.send(result);
        })



        /* read data */
        app.get('/products', async (req, res) => {
            const result = await productCollection.find().toArray()
            
            res.send(result);
        })
       
        //  await client.db("admin").command({ ping: 1 });
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