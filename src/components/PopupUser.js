import React, { useState, useEffect } from 'react';

const PopupUser = ({ mode, user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        img: '',
    });

    useEffect(() => {
        // If in edit or view mode, populate the form data with user details
        if (mode !== 'add' && user) {
            setFormData(user);
        }
    }, [mode, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add any additional validation or data processing here
        onSubmit(formData);
    };


    const handleClear = () => {
        setFormData({
            email: '',
            username: '',
            img: '',
        });
    };


    return (
        <div className="modal fade" id="modal-lg">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            {mode === 'add' ? 'Add User' : mode === 'edit' ? 'Edit User' : 'View User'}
                        </h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCancel}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control"
                                    readOnly={mode === 'view'}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Username:</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="form-control"
                                    readOnly={mode === 'view'}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Image URL:</label>
                                <input
                                    type="text"
                                    name="img"
                                    value={formData.img}
                                    onChange={handleChange}
                                    className="form-control"
                                    readOnly={mode === 'view'}
                                    required
                                />
                            </div>
                            {mode !== 'view' && (
                                <div className="modal-footer justify-content-between">
                                    {/*<button type="button" className="btn btn-default" data-dismiss="modal" onClick={onCancel}>*/}
                                    {/*    Close*/}
                                    {/*</button>*/}
                                    <button type="submit" className="btn btn-primary">
                                        {mode === 'add' ? 'Add User' : 'Save changes'}
                                    </button>
                                    <button type="button" className="btn btn-secondary ml-2" onClick={handleClear}>
                                        Clear
                                    </button>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
                {/* /.modal-content */}
            </div>
            {/* /.modal-dialog */}
        </div>
    );
};

export default PopupUser;
