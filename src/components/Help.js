// HelpPage.js

import React from 'react';










const helpSections = [
    {
        id: 'login1',
        title: 'Login 1 ',
        content: 'To log in, follow these steps.',
        imagePath: 'https://i.postimg.cc/sgnn0MQP/login.png',
        width: 600
    },
    {
        id: 'login2',
        title: 'Login 2 - Password Input Error',
        content: 'if your password not more than 8 characters will show error notification',
        imagePath: 'https://i.postimg.cc/W3ZX3S9S/login2.png',
        width: 600
    },
    {
        id: 'login3',
        title: 'Login 3 - Wrong Password',
        content: 'if your input wrong password will show error notification',
        imagePath: 'https://i.postimg.cc/2j40NcLS/login4.png',
        width: 600
    },
    {
        id: 'login4',
        title: 'Login 4 - Loading',
        content: 'when you login will show loading',
        imagePath: 'https://i.postimg.cc/prYCQrMF/login3.png',
        width: 600
    },
    {
        id: 'Dashboard1',
        title: 'Dashboard 1 - Overview',
        content: 'Dashboard page',
        imagePath: 'https://i.postimg.cc/RhcsPGKq/Dashboard.png',
        width: 900
    },
    {
        id: 'Dashboard2',
        title: 'Dashboard 2 - Menu/Navigate',
        content: 'Dashboard page',
        imagePath: 'https://i.postimg.cc/qBn5MBS0/Dashboard2.png',
        width: 400
    },
    {
        id: 'Dashboard3',
        title: 'Dashboard 3 - Small Boxes',
        content: 'Dashboard page - Small Boxes',
        imagePath: 'https://i.postimg.cc/3xbBFzVn/smallbox.png',
        width: 600
    },
    {
        id: 'Dashboard4',
        title: 'Dashboard 4 - Activity User Area Graph',
        content: 'Dashboard page',
        imagePath: 'https://i.postimg.cc/PrjFLsnD/Dashboard-activity-user-area.png',
        width: 600
    },
    {
        id: 'Dashboard5',
        title: 'Dashboard 5 - Activity User Bar Graph',
        content: 'Dashboard page',
        imagePath: 'https://i.postimg.cc/L63QLCmb/Dashboard-activity-user-bar.png',
        width: 600
    },
    {
        id: 'User1',
        title: 'User 1 - Overview',
        content: 'User page',
        imagePath: 'https://i.postimg.cc/4yZb3GHN/user.png',
        width: 600
    },
    {
        id: 'User2',
        title: 'User 2 - View User',
        content: 'User page',
        imagePath: 'https://i.postimg.cc/Hn20cNb0/user-view.png',
        width: 600
    },
    {
        id: 'User3',
        title: 'User 3 - Update User',
        content: 'User page',
        imagePath: 'https://i.postimg.cc/nzqGZrzP/user-update.png',
        width: 600
    },
    {
        id: 'User4',
        title: 'User 4 - Add User 1',
        content: 'User page',
        imagePath: 'https://i.postimg.cc/MGCmhVWB/user-add1.png',
        width: 600
    },
    {
        id: 'User5',
        title: 'User 5 - Add User 2',
        content: 'User page',
        imagePath: 'https://i.postimg.cc/1znKCJZP/user-add2.png',
        width: 600
    },
    {
        id: 'User6',
        title: 'User 6 - Delete User',
        content: 'User page',
        imagePath: 'https://i.postimg.cc/L4B3bJGq/user-delete.png',
        width: 600
    },
    {
        id: 'User7',
        title: 'User 7 - Reset Password 1',
        content: 'User page',
        imagePath: 'https://i.postimg.cc/9Fb1rDp3/reset-password.png',
        width: 600
    },
    {
        id: 'User8',
        title: 'User 8 - Reset Password 2',
        content: 'User page',
        imagePath: 'https://i.postimg.cc/sg2mS36M/reset-password2.png',
        width: 600
    },
    {
        id: 'Feedback1',
        title: 'Feedback 1 - Overview',
        content: 'Feedback page',
        imagePath: 'https://i.postimg.cc/Xvp2MndR/feedback1.png',
        width: 600
    },
    {
        id: 'Feedback2',
        title: 'Feedback 2 - New/In Progress Status',
        content: 'Feedback page',
        imagePath: 'https://i.postimg.cc/y86QPmdY/feedback2.png',
        width: 600
    },
    {
        id: 'Feedback3',
        title: 'Feedback 3 - Chart',
        content: 'Feedback page',
        imagePath: 'https://i.postimg.cc/tJHDVPwb/feedback3.png',
        width: 600
    },
    {
        id: 'Feedback4',
        title: 'Feedback 4 - Change Status',
        content: 'Feedback page',
        imagePath: 'https://i.postimg.cc/nLg3pN1C/feedback4.png',
        width: 600
    }

]



const HelpPage = () => {
    return (
        <div className="content-wrapper">

            <h1 className="text-center">Help Guide</h1>
            <br/>
            <hr/>
            <div className="row">
                {/* Left col */}
                <section className="col-lg-3 connectedSortable">
                    <ul>
                        {helpSections.map((section) => (
                            <li key={section.id}>
                                <a href={`#${section.id}`}>{section.title}</a>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="col-lg-9 connectedSortable" style={{ overflowY: 'auto', maxHeight: '600px' }}>
                    {helpSections.map((section) => (
                        <>
                            <div key={section.id} id={section.id} className="help-section text-center">
                                <h2>{section.title}</h2>
                                <p>{section.content}</p>
                                <img src={section.imagePath} alt={`${section.title} Screenshot`} width={section.width} className="align-content-center" />
                            </div>
                            <br/>
                            <hr/>
                        </>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default HelpPage;
