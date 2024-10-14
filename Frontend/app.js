const express= require("express");
const app = express();

app.listen(3000);
app.get('/userTicket',(req,res)=>{
    res.sendFile('D:\\DBMS_project\\web_\\front-end\\User_Ticket_Page\\user.html')
    

});
