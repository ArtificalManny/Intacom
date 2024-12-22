//server.js
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const projects = []; //A placeholder in-memory array for projects (use a DB in production)

//Route to create a new project
app.post('/api/projects', (req, res) => {
    const { name, color, features, invites } = req.body;

    const newProject = {
        id: projects.length + 1,
        name,
        color,
        feautres,
        invites,
        createdAt: new Date()
    };

    projects.push(newProject);

    if (invites && invites.length > 0) {
        invites.forEach(email => sendInvitationEmail(email, newProject));
    }

    res.status(201).json({ message: 'Project created successfully', project: newProject });
});

//Send invitation email
function sendInvitationEmail(email, project) {
    const transporter = nodemailer.createTransport ({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
        }
    });
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: `Invitation to join project: ${project.name}`,
        text: `You've been inviteds to join the project ${project.name}. Click the link to join.`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error){
            console.error("Error sending email:", error);
        } else {
            console.log('Email sent: '+info.response);
        }
    });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));