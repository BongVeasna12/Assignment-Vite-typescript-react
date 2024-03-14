import { useState, useEffect } from "react";
import { Button, Modal } from 'flowbite-react';
import CardComponent from "./componentcard/CardComponent";
import CardFormComponent from "./componentcard/CardFormComponent";

type Status = 'idle'| 'loading' |'success'| 'error'
type product = {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string
}

function App() {

  const [products, setProducts] = useState<product[]>([]);
  const [status , setStatus] = useState<Status>('idle')
  const [openModal, setOpenModal] = useState(false)
  const [Dataform, setDataForm] = useState({})
  useEffect(() => {
    setStatus("loading")
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())  
            .then(data => {
              setProducts(data)
              setStatus('success')
            }).catch(err => {
              setStatus("error")
            }
       ); 
  },[]);

  if(status === 'loading'){
    
    return (
      <div className=" w-full h-full flex place-content-center">
        <img src="https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/200w.gif?cid=6c09b952dcekyyyan8szspmqqb1bq1nuhunc7nlo1c5l6c1h&ep=v1_gifs_search&rid=200w.gif&ct=g" alt="" />
      </div>
    )
  }

  function getDataForm(products:any){
    setDataForm(products);
    
  }

  const addProduct = async ()=>{
    fetch ('https://fakestoreapi.com/products',{
      method: 'POST',
      body: JSON.stringify(Dataform),
      headers: { "Content-Type": "application/json;",
    },
    }).then((res) => res.json())
      .then((data)=>{
      console.log(data());
      
    }).catch((err)=>{
      console.log(err);
      
    });
    setOpenModal(false)
  }

  return (
    <div>
    <div className="flex justify-center my-8">
    <Button onClick={() => setOpenModal(true)}>Create New Product</Button>
    </div>
    <div  className=" mx-16 grid grid-flow-row grid-cols-4 gap-4"> 
      {products.map((product) =>(
          <CardComponent
           key={product.id}
           title={product.title}
           price={product.price}
           image={product.image}
          
          />
        ))}
    </div>
    {/* model */}
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create New Product </Modal.Header>
        <Modal.Body>
           
          
          <CardFormComponent getDataForm={getDataForm}/> 
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => addProduct()}>Add</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
           Cancle
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
       
  )
  
}

export default App;
