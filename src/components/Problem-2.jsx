    import React, { useEffect, useState } from 'react';
    import ReactModal from 'react-modal';

    const Problem2 = () => {

        const [allContactsModalOpen, setAllContactsModalOpen] = useState(false);
        const [usContactsModalOpen, setUSContactsModalOpen] = useState(false);
        const [checkboxChecked, setCheckboxChecked] = useState(false);
        const [allContacts, setAllContacts] = useState([]);
        const [usContacts, setUsContacts] = useState([]);

        useEffect(() => {
            if (allContactsModalOpen) {
                // Fetch contacts from your API
                fetchContactsFromApi()
                    .then((contacts) => {
                        setAllContacts(contacts);
                    })
                    .catch((error) => {
                        console.error('Error fetching contacts:', error);
                    });
            }
        }, [allContactsModalOpen]);

        useEffect(() => {
            if (usContactsModalOpen) {
                // Fetch contacts from your API
                fetchUsContactsFromApi()
                    .then((contacts) => {
                        setUsContacts(contacts);
                    })
                    .catch((error) => {
                        console.error('Error fetching contacts:', error);
                    });
            }
        }, [usContactsModalOpen]);

        const openAllContactsModal = () => {
            setAllContactsModalOpen(true);
        };

        const closeAllContactsModal = () => {
            setAllContactsModalOpen(false);
        };

        const openUSContactsModal = () => {
            setUSContactsModalOpen(true);
        };

        const closeUSContactsModal = () => {
            setUSContactsModalOpen(false);
        };

        const handleCheckboxChange = () => {
            setCheckboxChecked(!checkboxChecked);
        };

        const fetchContactsFromApi = async () => {
            const apiUrl = 'https://contact.mediusware.com/api/contacts/';

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                return data;
            } catch (error) {
                throw error;
            }
        };

        const fetchUsContactsFromApi = async () => {
            const apiUrl = 'https://contact.mediusware.com/api/country-contacts/united%20states/';

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                return data;
            } catch (error) {
                throw error;
            }
        };

        const filterEvenIds = (contacts) => {
            return contacts.filter((contact) => contact.id % 2 === 0);
        };

        const filteredAllContacts = checkboxChecked ? filterEvenIds(allContacts.results || []) : allContacts.results || [];
        const filteredUsContacts = checkboxChecked ? filterEvenIds(usContacts.results || []) : usContacts.results || [];

        return (

            <div className="container">
                <div className="row justify-content-center mt-5">
                    <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                    
                    <div className="d-flex justify-content-center gap-3">
                    <button onClick={openAllContactsModal} className="btn btn-lg btn-outline-primary" type="button" >All Contacts</button>
                    <button onClick={openUSContactsModal} className="btn btn-lg btn-outline-warning" type="button" >US Contacts</button>
                    </div>
                    
                    {/* All Contacts Modal */}
                    <ReactModal
                        isOpen={allContactsModalOpen}
                        onRequestClose={closeAllContactsModal}
                        contentLabel="All Contacts Modal"
                    >
                        {/* Your modal content for All Contacts */}
                        <button className="btn btn-outline-primary">All Contacts</button>
                        <button className="btn btn-outline-primary">US Contacts</button>
                        {/* Add other content here */}
                        <button className="btn btn-outline-warning" onClick={closeAllContactsModal}>Close Modal</button>

                        {/* Display contacts from API */}
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#ID</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAllContacts?.map((contact) => (
                                    // <li key={contact.id}>{contact.phone}</li>
                                    // Add other contact details as needed
                                    <tr key={contact.id}>
                                        <th scope="row">{contact.id}</th>
                                        <td>{contact.phone}</td>
                                        <td>{contact.country.name}</td>
                                        <td><button className="btn btn-outline-info">Details</button></td>
                                    </tr> 
                                ))}
                                                        
                            </tbody>
                        </table>    

                        {/* Checkbox in the footer */}
                        <div className="modal-footer">
                            <label>
                                <input
                                type="checkbox"
                                checked={checkboxChecked}
                                onChange={handleCheckboxChange}
                                />
                                Only even
                            </label>
                        </div>
                    </ReactModal>

                    {/* US Contacts Modal */}
                    <ReactModal
                        isOpen={usContactsModalOpen}
                        onRequestClose={closeUSContactsModal}
                        contentLabel="US Contacts Modal"
                    >
                        {/* Your modal content for All Contacts */}
                        <button className="btn btn-outline-primary">All Contacts</button>
                        <button className="btn btn-outline-primary">US Contacts</button>
                        
                        {/* Add other content here */}
                        <button className="btn btn-outline-warning" onClick={closeUSContactsModal}>Close Modal</button>

                        {/* Display contacts from API */}
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#ID</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsContacts?.map((contact) => (
                                    // <li key={contact.id}>{contact.phone}</li>
                                    // Add other contact details as needed
                                    <tr key={contact.id}>
                                        <th scope="row">{contact.id}</th>
                                        <td>{contact.phone}</td>
                                        <td>{contact.country.name}</td>
                                        <td><button className="btn btn-outline-info">Details</button></td>
                                    </tr> 
                                ))}
                                                        
                            </tbody>
                        </table>   

                        {/* Checkbox in the footer */}
                        <div className="modal-footer">
                            <label>
                                <input
                                type="checkbox"
                                checked={checkboxChecked}
                                onChange={handleCheckboxChange}
                                />
                                Only even
                            </label>
                        </div>
                    </ReactModal>

                </div>
            </div>
        );
    };

    export default Problem2;