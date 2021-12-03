
const socket = io.connect("http://localhost:8000");
var audio=new Audio('ting.mp3');
const nam=prompt("Enter Name to Join");
const cont=document.querySelector('#container');
console.log(cont);
let btn=document.getElementById("submit");
btn.addEventListener('click',()=>{
    let val=document.getElementById('val').value;
    console.log(val);
    if(val!="")
    {
        let n=document.createElement('div');
        n.classList.add("message");
        n.classList.add("right");
        n.innerText=val;
        socket.emit("message",val);
        console.log(n);
        cont.append(n);
    }
    document.getElementById('val').value="";
})
socket.emit("new-user",nam);
socket.on("user-joined",data=>{
    let n=document.createElement('div');
        n.classList.add("message");
        n.classList.add("left");
        n.innerText=`${data}:Joined the chat`;
        audio.play();
        cont.append(n);
})
socket.on("message",data=>{
    audio.play();
    let n=document.createElement('div');
        n.classList.add("message");
        n.classList.add("left");
        n.innerText=`${data.name}:${data.message}`;
        
        cont.append(n);
})


  socket.on("bye",name=>{
    let n=document.createElement('div');
    n.classList.add("message");
    n.classList.add("left");
    n.innerText=`${name}: left the chat`;
    
    cont.append(n);
  })