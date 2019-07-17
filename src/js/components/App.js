import React from 'react'

import Card from './Card'
// let express = require('express')
// let app = express()
// let Mongo = require('mongodb').MongoClient;


// let dbn ={}
// let url = "mongodb://localhost:27017/newdb";
// Mongo.connect(url, function(err, client) {
//     console.log('connected');
//     dbn = client.db('newdb');
    
//     console.log('connected');
    
      
//   });

class App extends React.Component {
  
  render() {

    return (
        <div>
            
            <div className="page_div"><Card /></div>   
        </div>
    )
  }
}

export default App