import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ConfigContext } from '../ConfigContext';
import { UserContext } from '../UserContext';

const ImageUploader = () => {
    const [files, setFiles] = useState([]);
    const [path, setPath] = useState(''); // State for the container path
    const [uploadStatus, setUploadStatus] = useState('');
    const [adminUser, setAdminUser] = useState('');
    const config = useContext(ConfigContext);
    const { user } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    const handlePathChange = (event) => {
        setPath(event.target.value);
    };

    const handleUpload = async () => {
        if (!files.length || !path) {
            setUploadStatus('Please select files and specify a container path.');
            return;
        }

        const formData = new FormData();
        formData.append('path', path);
        Array.from(files).forEach((file) => {
            formData.append('images', file);
        });

        try {
            setUploadStatus('Uploading...');
            const response = await axios.post(`${config.NODE_SERVICE}/api/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if(response.status === 200){
                setUploadStatus('Files uploaded successfully.');
            }else {
                setUploadStatus('Files not uploaded  successfully.');
            }

            
            
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    useEffect(() => {
            const fetchUser = async () => {
                if(user) {
                    try {
                        const response  = await axios.get(`${config.NODE_SERVICE}/api/user?email=${user.email}`, { withCredentials: true });
                        console.log("response is ::", JSON.stringify(response.data));
                        const [{role}] = response.data;
                         const adminUSer = role === 'Admin'
                        setAdminUser(adminUSer)
                    } catch (error) {
                        setErrorMessage(error.message);
                    }
                }
                
            };
        
        fetchUser();
    }, [config.NODE_SERVICE,user]);

    return (
        <div>

            {errorMessage ? (
                <p className="err-msg">{errorMessage}</p>
            ) : (

                <div>
                    {!adminUser ? (
                <div>
Not authorized
                </div>
            ) : (
                 <>
                    <h1>Image Uploader</h1>
                    <input type="text" placeholder="Enter container path" value={path} onChange={handlePathChange} />
                    <input type="file" multiple onChange={handleFileChange} accept="image/*" />
                    <button onClick={handleUpload}>Upload</button>
                    <p>{uploadStatus}</p>
                    </>
                )}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
