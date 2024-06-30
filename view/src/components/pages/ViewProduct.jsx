import "../styles/ViewProduct.css";
import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import RichTextEditor from 'react-rte';

function ViewProduct() {

  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [pname, setPname] = useState('');
  const [pslug, setPslug] = useState('');
  const [img, setImg] = useState('');
  const [price, setPrice] = useState('');
  const [disprice, setDisprice] = useState('');
  const [description, setDescription] = useState(RichTextEditor.createEmptyValue());

  useEffect(() => {
    demo(); 
  }, []);


  function demo() {
    let token = JSON.parse(window.localStorage.getItem("token"));
    fetch('http://localhost:8000/api/content', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((result) => {
      result.json().then((res) => {
        if (Array.isArray(res)) {
          setData(res); 
        }
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

 
  function del(id) {
    if (window.confirm('Are you sure you want to delete?')) {
      let token = JSON.parse(window.localStorage.getItem("token"));
      fetch(`http://localhost:8000/api/content/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => res.json())
      .then((res) => {
        toast.success('Record deleted successfully', {
          position: "top-center"
        });
        demo(); 
      })
      .catch((error) => {
        console.error('Error deleting record:', error);
        toast.error('Failed to delete record', {
          position: 'top-center'
        });
      });
    } else {
     
      toast.error('Record not deleted', {
        position: 'top-center'
      });
    }
  }


  function edit(item) {
    window.localStorage.setItem('stt', JSON.stringify(item._id));
    setTitle(item.title);
    setPname(item.pname);
    setPslug(item.pslug);
    setImg(item.img);
    setPrice(item.price);
    setDisprice(item.disprice);
    setDescription(RichTextEditor.createValueFromString(item.description, 'html'));
  }

 
  function handleUpdate(e) {
    e.preventDefault();

    let token = JSON.parse(window.localStorage.getItem("token"));
    const formData = new FormData();
    formData.append("title", title);
    formData.append("pname", pname);
    formData.append("pslug", pslug);
    formData.append("img", img);
    formData.append("price", price);
    formData.append("disprice", disprice);
    formData.append("description", description.toString('html'));

    let id = JSON.parse(window.localStorage.getItem("stt"));
    fetch(`http://localhost:8000/api/content/${id}`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    })
    .then((res) => res.json())
    .then(() => {
      toast.success('Content updated successfully');
      demo(); 
    })
    .catch((error) => {
      console.error('Error updating content:', error);
      toast.error('Failed to update content');
    });
  }


  function stripHtmlTags(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

  return (
    <div className="container">
      <div className="table-responsive">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>ProductName</th>
              <th>ProductSlug</th>
              <th>Image</th>
              <th>Price</th>
              <th>DiscountPrice</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{item?.title}</td>
                <td>{item?.pname}</td>
                <td>{item?.pslug}</td>
                <td><img src={`http://localhost:8000/api/img/${item?.img}`} height='30px' width="40px" alt='image'/></td>
                <td>{item?.price}</td>
                <td>{item?.disprice}</td>
                <td>{stripHtmlTags(item?.description)}</td> 
                <td>
                  <button type="button" onClick={() => edit(item)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Edit
                  </button>

                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Update</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <form onSubmit={handleUpdate}>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='form-control w-100' placeholder='Enter Title' /><br/>
                            <input type="text" value={pname} onChange={(e) => setPname(e.target.value)} className='form-control w-100' placeholder='Enter ProductName' /><br/>
                            <input type="text" value={pslug} onChange={(e) => setPslug(e.target.value)} className='form-control w-100' placeholder='Enter Slug' /><br/>
                            <input type="file" onChange={(e) => setImg(e.target.files[0])} className='form-control w-100' /><br/>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className='form-control w-100' placeholder='Enter Price' /><br/>
                            <input type="number" value={disprice} onChange={(e) => setDisprice(e.target.value)} className='form-control w-100' placeholder='Enter DiscountPrice' /><br/>
                            <RichTextEditor
                              value={description}
                              onChange={setDescription}
                              className='form-control w-100'
                            /><br/>
                            <input type="submit" className='form-control' value="UPDATE" style={{background:'#fdc700'}} /><br />
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td><button onClick={() => del(item._id)} className='btn btn-info'>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
}

export default ViewProduct;
