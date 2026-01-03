import React, { useState } from 'react';
import axios from 'axios';
import './EmailTriggerPage.css'


function EmailTriggerPage() {
    const [template, setTemplate] = useState('');
    const [recipientsCount, setRecipientsCount] = useState(1);
    const [loading, setLoading] = useState(false);
    //   const [senderEmail, setSenderEmail] = useState('');
    const [csvFile, setCsvFile] = useState(null);

    const handleCSVUpload = (e) => {
        const file = e.target.files[0];
        setCsvFile(file);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        // console.log("template", template)
        // console.log("recipientsCount", recipientsCount)

        formData.append('template', template);
        formData.append('recipientsCount', recipientsCount);
        // formData.append('senderEmail', senderEmail);
        formData.append('csvFile', csvFile);
        setLoading(true);

        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/send-emails`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
                    <option value="templateOne">Template 1</option>
                    <option value="templateTwo">Template 2</option>
                    <option value="templateThree">Template 3</option>
                    <option value="templateFour">Template 4</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="recipientsCount">Number of Recipients:</label>
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

            <button className="submit-btn" onClick={handleSubmit}>{loading ? "sanding" : "Send Emails"}</button>
        </div>
    );
}

export default EmailTriggerPage;
