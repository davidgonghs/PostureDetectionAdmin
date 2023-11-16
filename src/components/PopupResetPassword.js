import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const ResetPasswordModal = ({ user, onCancel, onSubmit }) => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        newPassword: '',
        confirmPassword: '',
    });


    useEffect(() => {
        // If in edit or view mode, populate the form data with user details
            setFormData(user);
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            // Check if the name is 'newPassword' and the value meets the minimum length requirement
            isValidPassword: name === 'newPassword' ? value.length >= 8 : true,
            passwordsMatch:
                name === 'newPassword' || name === 'confirmPassword'
                    ? prevData.newPassword === value
                    : true,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic for resetting the password (e.g., API call)
        onSubmit(formData);

        // Clear the form after submission
        setFormData({
            email: '',
            username: '',
            newPassword: '',
            confirmPassword: '',
        });
    };

    return (

        <div className="modal fade" id="resetPasswordModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Reset Password for :{formData.username}</h4>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onCancel}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form >
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    className="form-control"
                                    readOnly={true}
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password:</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className={`form-control ${formData.isValidPassword === false ? 'is-invalid' : ''}`}
                                    required
                                />
                                {formData.isValidPassword === false && (
                                    <div className="invalid-feedback">Password must meet the criteria.</div>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Confirm Password:</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`form-control ${
                                        formData.passwordsMatch === false ? 'is-invalid' : ''
                                    }`}
                                    required
                                />
                                {formData.passwordsMatch === false && (
                                    <div className="invalid-feedback">Passwords do not match.</div>
                                )}
                            </div>
                            <div className="modal-footer justify-content-between">
                                <Link to={`/user`} type="submit"  className="btn btn-primary ml-2" data-dismiss="modal" onClick={handleSubmit}>
                                    Reset Password
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordModal;
