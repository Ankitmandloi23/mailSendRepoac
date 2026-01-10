import React, { useState } from 'react';
import axios from 'axios';
import './EmailTriggerPage.css'
import { useNavigate } from 'react-router-dom';


function EmailTriggerPage() {
    const navigate = useNavigate();
    const [template, setTemplate] = useState('notifyTemplate');
    const [recipientsCount, setRecipientsCount] = useState(1);
    const [loading, setLoading] = useState(false);
    //   const [senderEmail, setSenderEmail] = useState('');
    const [csvFile, setCsvFile] = useState(null);

    const token = localStorage.getItem('authToken');  // Retrieve the token from local storage



    const logout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const handleCSVUpload = (e) => {
        const file = e.target.files[0];
        setCsvFile(file);
    };

    const handleSubmit = async (e) => {


        const formData = new FormData();


        formData.append('template', template);
        formData.append('limitOfRecipientsEmail', recipientsCount);

        formData.append('csvFile', csvFile);
        setLoading(true);

        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/emails/send-emails`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "authorization": `Bearer ${token}`
                },
            });
            alert('Emails Sent Successfully');
        } catch (error) {
            setLoading(false);
            console.error('Error sending emails:', error);
            alert('Failed to send emails');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={logout} className='LogoutButton'>Logout</button>
            <div className="email-trigger-container">
                <h2>Email Trigger</h2>

                <div className="form-group">
                    <label htmlFor="template">Select Template:</label>
                    <select
                        id="template"
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        className="form-control"
                    >
                        <option value="notifyTemplate">Notify Template</option>
                        <option value="launchTemplate">Lanuch Template</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="recipientsCount">Limit of Recipients email:</label>
                    <select
                        id="recipientsCount"
                        value={recipientsCount}
                        onChange={(e) => setRecipientsCount(e.target.value)}
                        className="form-control"
                    >
                        <option value="1">1</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="500">500</option>
                    </select>
                </div>

                {/* <div className="form-group">
        <label htmlFor="senderEmail">Sender Email:</label>
        <input
          type="email"
          id="senderEmail"
          placeholder="Enter sender email"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          className="form-control"
        />
      </div> */}

                <div className="form-group">
                    <label htmlFor="csvFile">Upload CSV File:</label>
                    <input
                        type="file"
                        id="csvFile"
                        onChange={handleCSVUpload}
                        className="form-control"
                    />
                </div>

                <button className="submit-btn" onClick={handleSubmit} disabled={loading}>{loading ? "Sanding..." : "Send Emails"}</button>
            </div>
        </>
    );
}

export default EmailTriggerPage;
