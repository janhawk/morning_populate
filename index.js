// const express = require('express');
// const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoose_populate', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (err !== null) {
        console.log('error in this')
        console.log(err);
    } else {
        console.log('Connected to the database');
    }
});


const studentSchema = mongoose.Schema({
    address:{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Address' 
    },
    firstName: String,
    surname: String,
    created: {
        type: Date,
        default: Date.now,
    }
});//mongoose model!

const addressSchema = mongoose.Schema({
    streetName: String,
    streetNumber: String,
    postCode: String,
    city: String,
    created: {
        type: Date,
        default: Date.now,
    }
});

const Student = mongoose.model('Student', studentSchema);
const Address = mongoose.model('Address', addressSchema);

// const port = 3000;
// const app = express();

// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));
// // parse application/json
// app.use(express.json())

// app.get('/', (req, res) => {
//     res.render('home'); 
        
// });

// app.post('/model', (req,res) => {
//     console.log('POST /model');
//     console.log('POST /model req.body', req.body);

const address = new Address({
    streetName: 'avenue',
    streetNumber: 183150,
    postCode: 75,
    city: 'paris',
    // address:req.body.address,
})
// const student = new Student({
//     firstName: 'kev',
//     surname: 'law',
//     adress: adressID
//     // postCode: req.body.postCode,
//     // city: req.body.city,
//     // address:req.body.address,
// })



address.save((err,addressDb) => {
    const addressID = addressDb._id;
    console.log('err', err)
    console.log('addressDb', addressDb);

    // if (err !== null) {
    //     res.send('ERROR! File not save err:', err);

    //     return;
    // }
   

    const student = new Student({
        firstName: 'kev',
        surname: 'lafsdw',
        address: addressID
        // postCode: req.body.postCode,
        // city: req.body.city,
        // address:req.body.address,
    });

    student.save((err,studentDb) => {
        
        console.log('err', err)
        console.log('studentDb', studentDb);
    
        if (err !== null) {
            res.send('ERROR! File not save err:', err);
    
            return;
        }

    });

    // mongoose.connection.close();
 });
    
// });
// app.listen(port, () => {
//     console.log(`Server satrted on port: ${port}`) // to confirme that server is started on that port
// });