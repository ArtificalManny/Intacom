import { Container } from "react-bootstrap/lib/Tab";

const ProfilePage = ({ userId }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData()
    }, [userId]);

    const handleFieldSave = (field, newValue) => {
        setUserData((prevData) => ({ ...prevData, [field]: newValue }));
    };

    if (!userData) return <p>Loading...</p>;

    return (
        <Container>
            {/* Profile Header */}
            <Row>
                <Col md={3}>
                    <img
                    src={`/uploads/${userData.profilePicture}`}
                    alt="Profile"
                    style={{ width: "150px", borderRadius: "50%" }}
                    />
                    <EditableField
                        userId={userId}
                        field="personalLife"
                        value={userData.personalLife}
                        onSave={(newVal) => handleFieldSave("personalLife", newVal)}
                        type="textarea"
                        />
                </Col>
                <Col md={9}>
                    <EditableField
                        userId={userId}
                        field="name"
                        value={userData.name}
                        onSave={(newVal) => handleFieldSave("name", newVal)}
                        />
                    <EditableField
                        userId={userId}
                        field="email"
                        value={userData.email}
                        onSave={(newVal) => handleFieldSave("email", newVal)}
                        type="email"
                        />
                </Col>
            </Row>
            {/* Work Experience */}
            <Row>
                <Col>
                <h4>Work Experience</h4>
                {userData.workExperience.map((work, index) => (
                    <EditableField
                        key={index}
                        userId={userId}
                        field={`workExperience.${index}`}
                        value={`${work.position} at ${work.company}`}
                        onSave={(newVal) => {
                            const updatedWork = [...userData.workExperience];
                            updatedWork[index] = newVal;
                            handleFieldSave("workExperience", updatedWork);
                        }}
                        />
                ))}
                </Col>
            </Row>
            {/* Education */ }
            <Row>
                <Col>
                    <h4>Education</h4>
                    {userData.education.map((edu, index) => (
                        <EditableField
                        key={index}
                        userId={userId}
                        field={`education.${index}`}
                        value={`${edu.degree} at ${edu.institution}`}
                        onSave={(newVal) => {
                            const updatedWork = [...userData.education];
                            updatedEdu[index] = newVal;
                            handleFieldSave("education", updatedEdu);
                        }}
                        />
                    ))}
                </Col>
            </Row>

            {/* Projects */}
            <Row>
                <Col>
                    <h4>Current Projects</h4>
                    {userData.currentProjects.map((project, index) => (
                        <EditableField
                            key={index}
                            userId={userId}
                            field={`currentProjects.${index}`}
                            value={project.title}
                            onSave={(newVal) => {
                                const updatedProjects = [...userData.currentProjects];
                                updatedProjects[index] = newVal;
                                handleFieldSave("currentProjects", updatedProjects);
                            }}
                            />
                    ))}

                    <h4>Past Projects</h4>
                    {userData.pastProjects.map((project, index) => (
                        <EditableField
                            key={index}
                            userId={userId}
                            field={`pastProjects.${index}`}
                            value={project.title}
                            onSave={(newVal) => {
                                const updatedProjects = [...userData.pastProjects];
                                updatedPeojects[index] = newVal;
                                handleFieldSave("pastProjects", updatedProjects);
                            }}
                            />
                    ))}
                </Col>
            </Row>
        </Container>
    );
};