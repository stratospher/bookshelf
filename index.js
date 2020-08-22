const port=8000;
const path=require('path');
const express=require('express');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

var contactList=[
    {
        name:'Ruhi',
        phone:'1234567'
    },
    {
        name:'Maria',
        phone:'7654321'
    }
];

app.get('/',function(req,res){
    // console.log("in get controller",req.myname);
    return res.render('home',{
        title:"My contact list",
        contact_list:contactList
    });
});

app.post('/create-contact',function(req,res){
    console.log(req.body);
    contactList.push(req.body);
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    return res.redirect('/');   // return res.redirect('back');

})

// /* via String params */
// app.get('/delete-contact/:phone',function(req,res){
//     console.log(req.params);
// });

/* via query params */
app.get('/delete-contact/',function(req,res){
    console.log(req.query);
    let phone=req.query.phone;

    let contactIndex=contactList.findIndex(contact=>contact.phone==phone);

    if(contactIndex!=-1){
      contactList.splice(contactIndex,1);  
    }
    return res.redirect('back');
});


app.listen(port,function(err){
    if(err){
        console.log("Error!!",err);
        return;
    }
    console.log("Express app is running on port!!",port);
});

