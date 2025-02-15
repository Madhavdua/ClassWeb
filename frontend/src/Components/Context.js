import React, { Children } from 'react'
import context from '../Context/createContext';
import { useState, useEffect } from 'react';
function Context(props) {
  
  const server = process.env.REACT_APP_BASE_URL || "http://127.0.0.1";

  const [progress, setprogress] = useState(0);
  const [workform, setWorkform] = useState(false);

  // for login status
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState('');
  useEffect(() => {
    if (msg != '') {
      setAlert(true)
      setTimeout(() => {
        setAlert(false);
        setMsg('');
      }, 2000);
    }
  }, [msg])


  const [tasks, setTasks] = useState([]);
  const [group, setGroup] = useState([]);

  const bodyCall = async (method, body, route) => {
    setprogress(10)
    setprogress(20)
    const url = `${server + route}`
    setprogress(30)
    const result = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem('token')}`
      },
      body: body
    })
    setprogress(60);
    setprogress(80);
    // console.log(body)
    const json = result.json();
    setprogress(90);
    setprogress(100);
    return json;
  }

  const noBodyCall = async (method, route) => {
    setprogress(10);
    setprogress(30);
    const url = `${server + route}`;
    const result = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem('token')}`
      }
    })
    setprogress(50);
    setprogress(70);
    const json = result.json();
    setprogress(100);
    return json;
  }
  const creategroup = async (title, description) => {
    const data = { title: title, description: description }
    const result = await bodyCall('POST', JSON.stringify(data), '/api/group/creategroup');
    if (result.length !== undefined) {
      setMsg('Group added');
      // console.log("group added");
      fetchgroups();
    }
    else {
      // console.log(result.error);
      return result.error;
    }
    return result
  }
  const addgroup = async (code) => {
    const data = { code: code }
    const result = await bodyCall('POST', JSON.stringify(data), '/api/group/addgroup');
    if (result.success) {
      setMsg('Group added');
      fetchgroups();
      console.log("Group added");
    }
    else {
      setMsg(result.error || "Please enter valid group code");
      // console.log(result.error);
      return result.error;
    }
    return result
  }

  const fetchgroups = async () => {
    const result = await noBodyCall('GET', '/api/group/fetchgroups');
    if (result.success == false) {
      // console.log(result.error);
      return result.error;
    }
    else {
      setGroup(result);
    }
    return result;
  }
  const removegroup = async (code) => {
    const result = await noBodyCall('DELETE',`/api/group/removegroup/${code}`);

    if (result.success) {
      setMsg('Group removed successfully');
      return await fetchgroups();
    }
    else {
      // console.log(result.error);
    }
    return 
  }
  const deletegroup = async (code) => {
    const result = await noBodyCall('DELETE', `/api/group/deletegroup/${code}`);
    if (result.success) {
      setMsg('Group deleted successfully');
      return await fetchgroups();
    }
    else {
      // console.log(result.error);
    }
    return 
  }



  const addtask = async (cred) => {
    let uploadresult = '';
    if (cred.file) {
      uploadresult = await fileupload(cred.file);
    }
    const data = { title: cred.title, description: cred.description, assigned_date: cred.assigned_date, code: localStorage.getItem('code'), file: uploadresult.url }
    const result = await bodyCall('POST', JSON.stringify(data), '/api/task/createtask');
    if (result.success) {
      setMsg('Task added');
    }
    else {
      setMsg(result.error||"Error occured")
      return result.error;
    }
    return result
  }
  const fetchtasks = async (code) => {
    const result = await noBodyCall('GET',`/api/task/fetchtasks/${code}`);
    if (result.length !== undefined) {
      setTasks(result);
    }
    else {
      // console.log(result.error);
      return result.error;
    }
    return result
  }

  const deletetask = async (id) => {
    const result = await noBodyCall('DELETE', `/api/task/deletetask/${id}`);
    if (result.success) {
      return true;
    }
    else {
      setMsg("Error Occured");
      return false;
    }
  }


  const fileupload = async (filedata) => {
    const data = new FormData();
    data.append('file', filedata);
    const url = `${server + '/api/task/fileupload'}`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "auth-token": `${localStorage.getItem('token')}`
      },
      body: data
    });
    return res.json();
  }

  const showattachment = async (id) => {
    const result = await noBodyCall('GET', `/api/task/showattachment/${id}`);
    // console.log(result);
    if (result.success == false) {
      setMsg(result.error)
    }
    else {
      await noBodyCall('PUT', `/attachment/${result.file}`);
      // console.log("req completed")
      return true;
    }
    return result.success;
  }


  //  for login / signup
  const apiCall = async (route, body) => {
    setprogress(10);
    setprogress(20);
    let url = `${server + route}`;
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    })
    setprogress(40)
    let json = await response.json();
    setprogress(60);
    setprogress(90)
    setprogress(100)
    console.log(json);
    if (json.success === true) {
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('isAdmin',json.isAdmin);
      setLoggedIn(true);
      return true;
    }
    setMsg(json.error.length > 0 ? json.error : 'Some error occured')
    return false;

  }

  const login = async (username, password) => {
    localStorage.setItem('username', username);
    setUsername(username)
    let route = '/api/auth/login';
    const body = JSON.stringify({ username: username, password: password });

    return await apiCall(route, body);
  }
 

  const signUp = async (username, password) => {
    setUsername(username)
    let route = '/api/auth/createuser';
    const body = JSON.stringify({ username: username, password: password });
    return await apiCall(route, body);
  }


  return (
    <context.Provider value={{ tasks, setTasks, msg, setAlert, setMsg, alert, loggedIn, setLoggedIn, username, setUsername, login, signUp, fetchgroups, group, setGroup, addgroup, addtask, fetchtasks,  creategroup, removegroup, progress, setprogress, workform, setWorkform, fileupload, showattachment, deletetask, deletegroup }}>
      {props.children}
    </context.Provider>
  )
}

export default Context