export const defaultValues = {
  content: "",
  status: "false",
  prio: "Low",
};

export const deleteLocalTask = async (id) => {
  const data = {
    id,
  };
  try {
    await fetch("https://lv-tdd.herokuapp.com/deletetask", {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const toggleDone = async (id) => {
  const data = {
    id,
  };
  try {
    await fetch("https://lv-tdd.herokuapp.com/toggledone", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
};



export const LogOut = async () => {
  const data = {
    id: JSON.parse(localStorage.getItem("User")).id,
  };
  try {
    await fetch("https://lv-tdd.herokuapp.com/logout", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.removeItem("User");
  } catch (err) {
    console.log(err);
  }
};
