import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

    
const DeleteContact = ({contacts, setContacts }) => {
    
const [contactName, setContactName] = useState("");
const [contactsQuery, setContactsQuery] = useState([]);
const fetchContacts = async () => {
    if (!contactName.trim()) {
    alert("Please enter a contact name");
    return;
    }
    try {
    const response = await fetch(`http://localhost:3000/contact/name?contact_name=${encodeURIComponent(contactName)}`);
    // Http status code 200, 201 is ok
    if (!response.ok) {
    throw new Error("Failed to fetch Cars");
    }
    // If response ok, convert the data javascript
    const data = await response.json();
    setContactsQuery(data);
    } catch (err) {
    alert("There was an Error loading searched Cars "+err);
    }
    };
// Delete a contact by ID
const deleteOneContact = async (id) => {
    try {
    const response = await fetch(`http://localhost:3000/contact/${id}`, {
    method: "DELETE",
    });
    // Http status code 200, 201 is ok
    if (!response.ok) {
    throw new Error("Failed to delete Car");
    }
    alert("Car deleted successfully");
    // Refresh the contacts list after deletion
    setContactsQuery(contactsQuery.filter(contact => contact.id !== id));
    } catch (err) {
    alert("There was an error deleting the contact: " + err);
    }
    };
return ( 
    <div className="container">
{/* Input name or partial name for FETCH */}
<h2 className="text-center mt-4">Delete Car</h2>
<div className="input-group mb-3">
    {/* List the result and add Delete button to each */}
<ul className="list-group">
{contactsQuery.map((contact) => (
<li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center">
<div className="d-flex align-items-center">
{contact.image_url && (
<img
src={`http://localhost:3000${contact.image_url}`}
alt={contact.contact_name}
style={{ width: "50px", height: "50px", marginRight: "15px", objectFit: "cover" }}
/>
)}
<div>
<strong>{contact.contact_name}</strong> - {contact.phone_number}
<p>{contact.message}</p>
</div>
</div>
{/* Delete contact button */}
<button className="btn btn-outline-secondary btn-sm rounded-pill"
onClick={() => deleteOneContact(contact.id)}>
Delete
</button>
</li>
))}
</ul>
</div>
<input type="text" className="form-control" placeholder="Enter Car name"
value={contactName}
onChange={(e) => setContactName(e.target.value.toLowerCase())}
/>
<button className="btn btn-primary" onClick={fetchContacts}>
Search
</button>
</div>
 );
};
export default DeleteContact;