
let express = require('express')
let app = express()
var cors = require('cors')
let Mongo = require('mongodb').MongoClient;
app.use(express.json())

let dbn ={}
let url = "mongodb://localhost:27017/newdb";
Mongo.connect(url, cors(),  function(err, client) {
    console.log('connected');
    dbn = client.db('newdb');
    
    console.log(typeof(dbn))
    
      
  });

  app.get('/api/data',cors(), (req,res)=>{
    
    const collection = dbn.collection('user');

        collection.find({}).toArray(function (err, arr){
            if(err){
                throw err;
            }
            console.log(arr);
           res.send(JSON.stringify(arr));
        });
  });
  app.get( '/api/search/:value',cors(), (req,res)=>{

    let value = req.params.value;
    console.log(value);
    
    const collection = dbn.collection('user');

    let c = dbn.collection('recent_searches').count();

    dbn.collection('recent_searches').insertOne({
      id : c+1,
      search : value
    })


  
    collection.find({ $or : [
      {title :{ $regex: value , $options : 'i'}},
      {description : {$regex: value, $options : 'i'}}
    ]
  }).toArray((err, docs) => {
            console.log(docs)
          res.send(JSON.stringify(docs));

    })
  });

  app.get('/api/sortbycost', cors(), (req, res) => {

    const collection = dbn.collection('user');
    collection.find().toArray(function (err, arr){
      arr.sort((a, b)=>{
          if(parseInt(a.cost) > parseInt(b.cost)){
            return 1
          } else{
            return -1;
          }
      })
      console.log(arr);
      res.send(JSON.stringify(arr));
    })

  })
  app.get('/api/sortbypub', cors(), (req, res) => {

    const collection = dbn.collection('user');
    collection.find().toArray(function (err, arr){
      arr.sort((a, b)=>{
        var aa = a.publishedDate.split('/').reverse().join(),
            bb = b.publishedDate.split('/').reverse().join();
        return new Date(aa) < new Date(bb) ? -1 : (new Date(aa) > new Date(bb) ? 1 : 0);
      })
      console.log(arr);
      res.send(JSON.stringify(arr));
    })

  })
  app.get('/api/show_recent_search', cors(), (req, res) => {

    const collection = dbn.collection('recent_searches');
    collection.find().limit(10).sort({$natural : -1}).toArray(function (err, arr){
      res.send(JSON.stringify(arr));  
  })
  });
  app.listen(3005);
