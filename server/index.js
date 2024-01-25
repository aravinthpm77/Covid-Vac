import express, { response }  from "express";
import mysql from "mysql2";
import cors from "cors";
import  jwt  from "jsonwebtoken";
import cookieParser from "cookie-parser";



const app=express();
app.use(express.json({limit :"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use(cookieParser());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    port: 3306,
    database:"health"

})

app.listen(5000,()=>{
    console.log("Server Listening to port 5000");
})

app.post('/user', (req, res) => {
    const {
        name,
        email,
        password
   
    } = req.body;

    const values = [
        name,
        email,
        password
    ];

    const sanitizedValues = values.map(val => (val !== undefined ? val : null));

    db.execute(
        'INSERT INTO user (name,email,password) VALUES (?, ?, ?)',
        sanitizedValues,
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }
            res.json({Status:"Success"});
            return res.status(201).send('User Details Added');
            
        }
    );
});


app.post('/user-login',(req,res)=>{
    const sql='SELECT * FROM user where email= ?';
    console.log(req.body.email,"+");
    db.query(sql,[req.body.email],(err,data)=>{
        console.log(data,1);
        if(err) {
            console.log(err)
            return res.json({Error:"Internal Login Error"});
        }
        if(data.length>0){
            try{
                
                const checkpass=req.body.password;
                const password=data[0].password;
                const compare=checkpass.localeCompare(password);
                console.log(compare)
                if(compare==0){
                    const token = jwt.sign({ email: req.body.email, id: data[0].id }, 'test', { expiresIn: '1h' });
                    return res.json({Status:"Success",token});
                }else{
                    return res.json({ Error: "Password not matched" });
                }

                
                

            }
            catch(error){
                return res.json({Error:`Internal Logging Error ${error}`});
            }
            
        }
        else{
            return res.json({Error:"Email Not Existed"});
        }
        // if(data.length>0){
            
        //     const a = bcrypt.compare(req.body.password,data[0].password ,(err,response)=>{
                
        //         if (err) {
        //             console.error(err);
        //             return res.json({Error:'Internal Logging Error'});
        //         }
        //         if (response) {
        //             return res.json({Status:"Success"});
                    
                    
        //         } else {
        //             return res.json({ Error: "Password not matched" });
        //         }
                
        //     })
        //     if(a==true){
        //         console.log("True");
        //     }
        //     else{
        //         console.log("False")
        //     }
        // }
        // else{
        //     return res.json({Error:"Email not Found"});
        // }
    })
})
app.get('/user',(req,res)=>{
    const sql="SELECT * FROM user";
    db.query(sql,(err,data)=>{
        if(err) return res.send(err);
        return res.send(data);
    })
})



app.post('/vac', (req, res) => {
    const {
        Name,
        
        Slots,
        
        
    } = req.body;

    const values = [
        Name,
        Slots,
    ];

    const sanitizedValues = values.map(val => (val !== undefined ? val : null));

    db.execute(
        'INSERT INTO vacdata (Name,Slots) VALUES (?, ?)',
        sanitizedValues,
        (error, results) => {
            if (error) {
                console.error(error);
                return res.status(500).send('Internal Server Error');
            }
            res.status(201).send('Employee Details Added');
        }
    );
});

app.get('/vac',(req,res)=>{
    const sql="SELECT * FROM vacdata";
    db.query(sql,(err,data)=>{
        if(err) return res.send(err);
        return res.send(data);
    })
})

app.post('/book-slot',(req,res)=>{
    const {name,slots}=req.body;
    console.log(name,slots);
    const sql='UPDATE vacdata SET Slots =? - 1 where Name= ? and Slots >0 ';
    db.query(sql,[slots,name],(err,result)=>{
        if(err){
            console.error('Error updating database:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    } else {
      if (result.affectedRows > 0) {
        res.json({Status:"Success",message:"Slot Booked"});
        
      } else {
        res.json({ success: false, message: 'No available slots for booking' });
      }
    }
  });
});