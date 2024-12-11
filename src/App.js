import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Contacts from "./Contacts";
import Sidebar from "./Sidebar";
import AddContact from "./AddContacts.js";
import DeleteContact from "./DeleteContacts.js";
import SearchContact from "./SearchContacts.js";
import Authentication from "./Login";
import NewMessage from "./NewMessages.js";

function App() {
  const [contacts, setContacts] = useState([]); // State to manage contacts
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
  return (
    <div className="App">
    {userRole ? (
    <Router>
    <div className="d-flex">
    {userRole && <Sidebar userRole={userRole} />}
    <div className="flex-grow-1 p-3">
    <h1 className="text-center">Phone Contacts App</h1>
    <Routes>
    <Route path="/" element={<div>Welcome to the Contacts App!</div>} />
    <Route path="/contacts" element={<Contacts contacts={contacts} setContacts={setContacts} /> }/>
    <Route path="/searchContacts" element={<SearchContact contacts={contacts} setContacts={setContacts} /> }/>
    {userRole === "admin" && (
    <>
    <Route path="/add-contact" element={<AddContact contacts={contacts} setContacts={setContacts}/> }/>
    <Route path="/deletecontact" element={<DeleteContact contacts={contacts} setContacts={setContacts}/>}/>
    <Route path="/new_message" element={<NewMessage contacts={contacts} setContacts={setContacts} /> }/>
    </>
    )}
    </Routes>
    </div>
    </div>
    </Router>
    ) : (
    <Authentication 
    username={username} setUsername={setUsername}
    password={password} setPassword={setPassword}
    setUserRole={setUserRole} />
    )}
    </div>
    );
}

export default App;
