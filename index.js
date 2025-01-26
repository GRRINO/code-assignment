import express, { json } from "express";
const app = express();
const PORT = 3000;

app.use(json())

let memoryDb = []
let id = 1


app.post("/",(req,res)=>{
  const {name,price} = req.body

  const newMenu = {id:id++,name,price}
  memoryDb.push(newMenu)
  res.status(200).send({message:"new menu is added",newMenu})
})

app.get("/",(req,res)=>{
  res.status(200).send(memoryDb)
})

app.get("/:id",(req,res)=>{
  const {id} = req.params
  const menu = memoryDb.find(m=> m.id === parseInt(id))

  if(!menu){
    return res.status(400).send({message:"menu is not found"})
  }


  res.status(200).send(menu)

})

app.put("/:id",(req,res)=>{
  const {id} = req.params
  const updateMenu = memoryDb.find( m => m.id === parseInt(id))

  if(!updateMenu){
    return res.status(400).send({message:"menu not found"})
  }

  const {name,price} = req.body
  updateMenu.name = name
  updateMenu.price = price

  res.status(200).send({message:`menu id ${id} is updated`})

})

app.delete("/:id",(req,res)=>{
  const {id} = req.params
  const deleteMenu = memoryDb.findIndex(m=> m.id === parseInt(id))
  if(deleteMenu === -1){
    return res.status(400).send({message:"menu not found"})
  }
  memoryDb.splice(deleteMenu,1)
  res.status(200).send({message:`menu  is destroyed`})

})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
