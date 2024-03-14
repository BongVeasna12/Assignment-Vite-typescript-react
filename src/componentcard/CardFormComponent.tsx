
import { Button,  Label, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
type ErroType = {
    title: string,
    price: string,
}

export default function CardFormComponent({getDataForm}:any) {
    const log = console.log;
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [Description, setDescription] = useState("")
    const [category, setCategory] = useState("electronic")
    const [image, setImage] = useState("https://vai.placeholes.com/1")
    const [error, setError ] = useState<ErroType>({
        title: "",
        price: "",
    });
    

    useEffect(()=> {
        if(title.length < 3){
            setError((prev) => {
               return { ...prev, title: "Title must be at least 3 characters"};
            });
        }
        else { setError((prev) => {
                        log(prev)
                        return { ...prev, 
                            title: "",
                        }; 
               })
            }
    

        if(price < 0){
                    setError((prev) => {
                        return { ...prev, price: "Price must be greater than 0 "};
                    });
        }else {
            setError((prev) => {
                log(prev)
                return {...prev, 
                    price: "",
                        };
                    })
                 }
    }, [title, price])

        useEffect (()=> {
            getDataForm({title, price, category ,image, Description})
        },[title, price, category ,image, Description])



  return (
    <form className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="Product title" value="Product title" />
        </div>
        <TextInput id="Product title" type="title" placeholder="Product Title" required onChange={(e)=> setTitle(e.target.value)}
        
        />
        {error.title && <p className='text-red-600'>{error.title}</p>}
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="Price" value="Product Price"  />
        </div>
        <TextInput id="Price" type="number" placeholder="*********" required
        onChange={(e)=> setPrice(parseFloat(e.target.value))} />
        {error.price && <p className='text-red-600'>{error.price}</p>}
      </div>    
      <div>
        <div className="mb-2 block">
          <Label htmlFor="Description" value="Description" />
        </div>
        <Textarea id="Description"  />
      </div>
      
     
    </form>
  );
}
