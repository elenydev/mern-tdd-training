export const defaultValues = {
  content: "",
  status: 'false',
  prio: "Low",

};


export const deleteLocalTask = async (id) => {
  const data = {
    id
  }
  console.log(id)
  try{
    await fetch("https://lv-tdd.herokuapp.com/deletetask",{
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json"
    }
  })
  }
  catch (err) {
    console.log(err)
  }
};

export const toggleDone = async (id) =>{
  const data = {
    id
  }
  try{
    await fetch('https://lv-tdd.herokuapp.com/toggledone', {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
  })}
  catch (err) {
    console.log(err)
  }
}

export const sendTask =  async (data) => {
    try{
      await fetch('https://lv-tdd.herokuapp.com/addtask',{
        method:'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }}
        )
    }
    catch (err) {
      console.log(err)
    }
}

export const fetchTasks = async () => {
  try {
    const response = await fetch("https://lv-tdd.herokuapp.com/fetchtasks");
    const results = await response.json();
    return results;
  } catch (err) {
    console.log(err);
  }
};


export const createUser =  async (data) => {
  console.log(data)
    try{
      const response = await fetch('https://lv-tdd.herokuapp.com/createuser',{
        method:'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }}
        )
      console.log(response)
    }
    catch (err) {
      console.log(err)
    }
}

export const getUser = async (data) =>{
  try{
      const response = await fetch('https://lv-tdd.herokuapp.com/login',{
        method:'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }}
        )
      const res = await response.json()
      const user = {
        id: res.user[0]._id,
        email: res.user[0].email,
      }     
      localStorage.setItem('User', JSON.stringify(user))
    }
    catch (err) {
      console.log(err)
    }
}

export const LogOut = async () =>{
  const data = {
    id: JSON.parse(localStorage.getItem('User')).id
  }
    try{
      await fetch('https://lv-tdd.herokuapp.com/logout',{
        method:'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }}
        )
      localStorage.removeItem('User')
    }
    catch (err) {
      console.log(err)
    }
}