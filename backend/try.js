// const bcrypt=require("bcrypt");
// const pass="mady124";
// const hash="$2b$10$CleLtVqaOIjzEVZdl6xJzuohsL2A0wJstqeviR5O6pJlnr3IiF0Pe"
// const genpass=async()=>{
//     const hashpass=await bcrypt.compare(pass,hash);

//     console.log(hashpass);
// }
// genpass();


// const jwt=require("jsonwebtoken");
// const data={
//     id:"64b6de794cb28d5d42678dbc",
//     name:"madhav"
    
// }
// // const token=jwt.sign(data,"MadhavDua");
// // console.log(token);

// const tokenGot="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjZkZTc5NGNiMjhkNWQ0MjY3OGRiYyIsIm5hbWUiOiJtYWRoYXYiLCJpYXQiOjE2ODk3MDYyNDZ9.oIMxpPJedudP42wHzZGLVe6Cw6sKqmboANhHuUqmOH0"
// const dataGot=jwt.verify(tokenGot,"MadhavDua");
// console.log(dataGot);