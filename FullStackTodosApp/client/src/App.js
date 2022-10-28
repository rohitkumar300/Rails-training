import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [data, SetData] = useState([]);
  const [flag, SetFlag] = useState(true);
  const [changeFlag,SetChangeFlag] = useState(false);
  const [changeId,SetChangeID] = useState(0);
  const [inputVal, SetInputVal] = useState({
    title: "",
  });


  const apilink = "http://localhost:3000/todos";

  const handleSubmit = async () => {
    if(changeFlag)
    {
      axios.put(apilink + `/${changeId}`,inputVal)
      .then(() => {
        SetFlag(!flag);
        // console.log(inputVal)
      });
      SetInputVal({
        title: "",
      });
      SetChangeFlag(false);
    }
    else
    {
      axios.post(apilink, inputVal).then((res) => {
        SetFlag(!flag);
        SetInputVal({
          title: "",
        });
      });
    }
    
  };

  useEffect(() => {
    axios.get(apilink).then((res) => {
      const reqdata = res.data;
      SetData(reqdata);
    });
  }, [flag]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    SetInputVal({ ...inputVal, [name]: value });
  };

  const handleDelete = (id) =>{
    axios.delete(apilink + `/${id}`)
      .then(() => {
        SetFlag(!flag);
      });
  }

  const handleEdit = (id,Inputtitle) =>{
    SetInputVal({...inputVal,title: Inputtitle})
    SetChangeID(id);
    SetChangeFlag(true);
  }

  return (
    <div>
      <input onChange={handleChange} name="title" value={inputVal.title} />
      <button onClick={() => handleSubmit()}>Submit</button>
      {data.map((element) => {
        return (
          <div key={element.id}>
            {element.title} <button onClick={()=>{handleEdit(element.id,element.title)}}>Edit</button> <button onClick={()=>{handleDelete(element.id)}}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
