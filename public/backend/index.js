import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import multer from "multer";
//var multer = require('multer');
import nodemailer from 'nodemailer';
import fs from "fs";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { parse } from "json2csv";
import parser from "mongo-parse";
import ObjectId from "mongodb";
import mongotocsv from 'mongo-to-csv';


const dateTime = new Date().toISOString().slice(-24).replace(/\D/g,
    '').slice(0, 14);
let csv;

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/museumDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    password: String
})
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    password: String
})
const staffSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    password: String
})
const museumSchema = new mongoose.Schema({
    image: String,
    name: String,
    address: String,
    description: String,
    price: String,
    keywords: String
})
const TicketSchema = new mongoose.Schema({
    museum: String,
    name: String,
    address: String,
    desciption: String,
    price: String,
    no_of_persons: String,
    booking_date: String,
    user_mobile: String,
    visited:String,
    discount:String,
    total:String
})

const Admin = new mongoose.model("admins", adminSchema)
const UserReg = new mongoose.model("users", userSchema)
const Museums = new mongoose.model("museums", museumSchema)
const Tickets = new mongoose.model("tickets", TicketSchema)
const Staff = new mongoose.model("staffs", staffSchema)
//Routes
app.post("/admin_login", (req, res) => {
    const { email, password } = req.body
    Admin.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password == user.password) {
                res.send({ message: "0", user: user })
                //0 = Login Successfull
            } else {
                res.send({ message: "1" })
                //1=Password didn't match
            }
        } else {
            res.send({ message: "2" })
            //2=User not registered
        }
    })
});
app.get("/adminprofile", (req, res) => {
    Admin.find({}, function (err, users) {
        res.send(users);
    });
});

app.get("/allusers", (req, res) => {
    UserReg.find({}, function (err, users) {
        res.send(users);
    });
});
app.get("/allmuseums", (req, res) => {
    Museums.find({}, function (err, users) {
        res.send(users);
    });
});
app.post("/FindMuseums", (req, res) => {
    const {name} = req.body;
    console.log(req.body)
    Museums.find({name:name}, function (err, users) {
        res.send(users);
    });
});

app.get("/allstaff", (req, res) => {
    Staff.find({}, function (err, users) {
        res.send(users);
    });
});
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/assets/museums')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage }).single('file');
app.post('/upload', function (req, res) {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })

});
app.post("/addmuseum", (req, res) => {
    const { image, name, description, address, price, keywords } = req.body

    const user = new Museums({
        image,
        name,
        description,
        address,
        price,
        keywords
    })
    user.save(err => {
        if (err) {
            res.send(err)
        } else {
            res.send({ message: "Successfully Added." })
        }
    })


});
app.post("/userlogin", (req, res) => {
    const { email, password } = req.body
    UserReg.findOne({ "$and": [{ email: email}, { password:password}] }, (err, user) => {
        if (user) {
           
                res.send({ message: "0", user: user.mobile })
                //0 = Login Successfull
            
        } else {
            res.send({ message: "2" })
            //2=User not registered
        }
    })
});
app.post("/stafflogin", (req, res) => {
    const { email, password } = req.body
    Staff.findOne({ "$and": [{ email: email}, { password:password}] }, (err, user) => {
        if (user) {
           console.log(user.mobile);
                res.send({ message: "0", user: user.mobile })
                //0 = Login Successfull

            
        } else {
            res.send({ message: "2" })
            //2=User not registered
        }
    })
});
app.post("/userregister", (req, res) => {
    const { name, email, mobile, password } = req.body
    UserReg.findOne({ "$or": [{ email: email}, { mobile:mobile}]}, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new UserReg({
                name,
                email,
                mobile,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered, Please login now." })
                }
            })
        }
    })

});

app.post("/markvisited", (req, res)=> {
    const { id} = req.body
    Tickets.updateOne({'_id':id},{$set:{'visited':'1'}}, function(err, result) {
        if (err)
        {
            res.send({message: "0"})
        }
        else
        {
            res.send({message: "1"});
        }
    });
    })


app.post("/addstaff", (req, res) => {
    const { name, email, mobile, password } = req.body
    Staff.findOne({ "$or": [{ email: email}, { mobile:mobile}]}, (err, user) => {
        if (user) {
            res.send({ message: "Staff already registerd" })
        } else {
            const user = new Staff({
                name,
                email,
                mobile,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Added." })
                }
            })
        }
    })

});


app.post("/book_ticket", (req, res) => {
    const { museum, name, address, desciption, price, no_of_persons, booking_date, user_mobile,visited,discount,total } = req.body
    console.log(req.body)

    const user = new Tickets({
        museum,
        name,
        address,
        desciption,
        price,
        no_of_persons,
        booking_date,
        user_mobile,
        visited,discount,total
    })
    user.save(err => {
        if (err) {
            res.send(err)
        } else {
            res.send({ message: "Successfully booked." })
        }
    })


});
app.post("/getmuseum", (req, res) => {
    const { museum_id } = req.body
    //  console.log(teammembermobile);
    Museums.findOne({ '_id': museum_id }, function (err, users) {
        res.send(users);
    });
});
app.post("/userprofile", (req, res) => {
    const {usermobile} = req.body
   
    UserReg.findOne({mobile:usermobile}, function (err, users) {
        res.send(users);
    });
});
app.post("/staffprofile", (req, res) => {
    const {usermobile} = req.body
    Staff.findOne({mobile:usermobile}, function (err, users) {
        res.send(users);
    });
});


app.post("/booking_history", (req, res) => {
    const mobile = req.body

    Tickets.find({ user_mobile: mobile.user_mobile }, function (err, users) {
        res.send(users);

    });
});
app.post("/visitedhistory", (req, res) => {
  Tickets.find({visited:"1"}, function (err, users) {
        res.send(users);
        console.log(users.visited)

    });
});
app.post("/allbookings", (req, res) => {
    Tickets.find({visited: { $ne: '1' } }, function (err, users) {
        res.send(users);

    });
});

app.post("/forgetPassword", (req, res)=> {
    const { email} = req.body
    UserReg.findOne({ email: email}, (err, user) => {
        if(user){
            
                res.send({message: "0", user: user})
           
        } else {
            res.send({message: "2"})
            //2=User not registered
        }
     
    })
})

app.post("/staff_login", (req, res) => {
    const { email, password } = req.body
    StaffReg.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "0", user: user })
                //0 = Login Successfull
            } else {
                res.send({ message: "1" })
                //1=Password didn't match
            }
        } else {
            res.send({ message: "2" })
            //2=User not registered
        }
    })
});
app.post("/staff_signup", (req, res) => {
    const { name, email, password } = req.body
    StaffReg.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new StaffReg({
                name,
                email,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered, Please login now." })
                }
            })
        }
    })

});
app.get("/allStudents", (req, res) => {
    StudentReg.find({}, function (err, users) {
        res.send(users);
    });
});
app.post("/get_prediction", (req, res) => {
    const { usermobile} = req.body
    console.log(usermobile);
    let year=[];
    let avg =0;
    Tickets.find({ 'mobile': usermobile }, function (err, users) {
        users.forEach(element => {
            year.push(element.booking_date.split( "-" )[0]);
            
          });
        avg  = (((year.length) * 100)/ 365)*4;
        console.log(JSON.stringify(avg));
       res.send(JSON.stringify(avg));
    })
    
    
});
app.post("/get_season_prediction", (req, res) => {
    var currentTime = new Date()
    var year = currentTime.getFullYear()
    let months=[];
    let avg =0;
    Tickets.find({}, function (err, users) {
        users.forEach(element => {
            if((element.booking_date.split( "-" )[0]) == (year -1))
            {
            months.push(element.booking_date.split( "-" )[1]);            
            }
        });
        avg  = (months);
        const counts = {};

        for (const num of months) {
          counts[num] = counts[num] ? counts[num] + 1 : 1;
        }
        var Winter = (parseInt(counts['01'])||0) + (parseInt(counts['02'])||0);
        var Spring = (parseInt(counts['03'])||0) + (parseInt(counts['04'])||0);
        var Summer = (parseInt(counts['05'])||0) + (parseInt(counts['06'])||0);
        var Monsoon = (parseInt(counts['07'])||0) + (parseInt(counts['08'])||0);
        var Autumn =(parseInt(counts['09'])||0) + (parseInt(counts['10'])||0);
        var PreWinter = (parseInt(counts['11'])||0) + (parseInt(counts['12'])||0);
        res.send({ Winter: Winter, Spring: Spring, Summer:Summer, Monsoon:Monsoon, Autumn:Autumn, PreWinter:PreWinter})
   
    })
    
    
});
app.post("/get_ticket_print", (req, res) => {
    const { usermobile, user } = req.body

    UserReg.findOne({ 'mobile': usermobile }, function (err, users) {

        var values = {
            "museum name": user.name,
            "museum address": user.address,
            "booking date": user.booking_date,
            "no of persons": user.no_of_persons,
            "price": user.price,
            "user name": users.name,
            "user mobile no": users.mobile
        }
        let stringdata = JSON.stringify(values);
        // Print the QR code to terminal
        QRCode.toDataURL(stringdata, function (err, QRcode) {


            if (err) return console.log("error occurred")
            // Printing the generated code
            //console.log(QRcode)
            const doc = new PDFDocument();
            doc.pipe(fs.createWriteStream('output'+dateTime+'.pdf'));
            doc
                .fontSize(25)
                .text('Museum Ticket', 210, 100);
            doc.image(`${QRcode}.png`, {
                fit: [100, 150],
                align: 'center',
                valign: 'center'
            });
            doc
                .fontSize(12)
                .text("Scan QR Code", 100, 200)
                .text("Person Name : " + users.name, 100, 300)
                .text("Mobile No. : " + users.mobile, 100, 320)
                .text("Museum Name : " + user.name, 100, 340)
                .text("Museum Address : " + user.address, 100, 360)
                .text("Visit Date : " + user.booking_date, 100, 380)
                .text("No Of Persons : " + user.no_of_persons, 100, 400)
                .text("Fees Per Person : " + user.price, 100, 420)
                .text("Total Amount : ", 100, 440);
            doc.end();
        })

    });
    res.json({ path: '/output'+dateTime+'.pdf' });
    // let options = {
    //     database: 'museumDB', // required
    //     collection: 'tickets', // required
    //     fields: ['name','address','price','no_of_persons','booking_date','user_mobile'], // required
    //     output: 'pets.csv', // required
    //    // allValidOptions: '-q \'{ "name": "cat" }\'' // optional
    // };
    // mongotocsv.export(options, function (err, success) {
    //     console.log(err);
    //     console.log(success);
    // });
 

});
app.listen(9002, () => {
    console.log("BE started at port 9002")
})