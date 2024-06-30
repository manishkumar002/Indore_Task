import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RichTextEditor from 'react-rte';

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  pname: yup.string().required("Product name is required"),
  pslug: yup.string()
  .required("Slug is required")
  .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be a valid URL slug (lowercase letters, numbers, and hyphens only)"),

  img: yup.mixed().required("Image is required"),
  price: yup.string().required("Price is required"),
  disprice: yup.string().required("Discount price is required"),
  description: yup.string().required("Description is required"),
});

export default function AddProduct() {
  const [des, setDes] = useState(RichTextEditor.createEmptyValue());
  const navigate = useNavigate();
  const token = JSON.parse(window.localStorage.getItem("token"));
 
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("pname", data.pname);
    formData.append("pslug", data.pslug);
    formData.append("img", data.img[0]);
    formData.append("price", data.price);
    formData.append("disprice", data.disprice);
    formData.append("description", des.toString('html')); 

    fetch(`http://localhost:8000/api/content`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
       
      },
      body: formData,
    })
    .then((result) => {
      console.log(result);
      if (result.status === 200) {

        alert("Product Added Successfully.");
        navigate("/viewproduct")
      } else if (result.errors) {
        const msg = result.errors[0]?.msg;
        alert(msg);
      } else {
        
      }
    })
    .catch(err => {
      console.log(err);
    });
  };

  const handleDescription = (value) => {
    setValue("description", value.toString('html')); 
    setDes(value); 
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
      <div className="col-sm-2"></div>
      <div className='col-sm-4 col-md-12 col-lg-4'>
  <img 
    src="https://img.freepik.com/free-vector/blogging-concept-illustration_114360-4480.jpg?w=1060&t=st=1687179733~exp=1687180333~hmac=1f4a16781ceae33fdb25c5d084b4b0f941e77ca41f5c19446a23c0250eb2f493" 
    alt="Blog Concept" 
    className="img-fluid mt-5" 
   
  />
</div>

        <div className='col-sm-4 col-md-12 col-lg-4'>
          <center className='py-3'><h3 style={{color:'black'}}>Add<u style={{color:'#fdc700'}}>Product</u></h3></center>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("title")} className='form-control w-100' placeholder='Enter Your Title' />
            <p className="ErrorColor">{errors.title?.message}</p>
            
            <input {...register("pname")} className='form-control w-100' placeholder='Enter Your Product Name' />
            <p className="ErrorColor">{errors.pname?.message}</p>
            
            <input {...register("pslug")} className='form-control w-100' placeholder='Enter Your Slug' />
            <p className="ErrorColor">{errors.pslug?.message}</p>
            
            <input type="file" {...register("img")} className='form-control w-100' placeholder='Enter Your profile' />
            <p className="ErrorColor">{errors.img?.message}</p>
            
            <input type="number" {...register("price")} className='form-control w-100' placeholder='Enter Your Price' />
            <p className="ErrorColor">{errors.price?.message}</p>
            
            <input type="number" {...register("disprice")} className='form-control w-100' placeholder='Enter Your Discount Price' />
            <p className="ErrorColor">{errors.disprice?.message}</p>
            
            <RichTextEditor
              value={des}
              onChange={(value) => handleDescription(value)}
              className='form-control w-100'
              placeholder='Enter Your Description'
            />
            
            <p className="ErrorColor">{errors.description?.message}</p>
            <br/>
            <input type="submit" className='form-control' value="Submit" style={{background:'#fdc700'}} />
            <br />
          </form>
          <br />
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
}
