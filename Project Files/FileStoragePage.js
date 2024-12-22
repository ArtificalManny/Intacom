import { useEffect } from "react";
import { Button } from "react-bootstrap/lib/InputGroup";

const FileStoragePage = ({ projectId, currentUser }) => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        //Fetch user role for the project
        const fetchUserRole = async () => {
            try {
                const response = await axios.post("/api/projects/get-role", {
                    userId: currentUser.id,
                    projectId,
                });
                setUserRole(response.data.role); //e.g., "Owner", "Editor", "Viewer"
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };
        fetchUserRole();
    }, [currentUser.id.projectId]);

    //Fetch files
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const repsonse = await axios.get(`/api/files/${projectId}`);
                setFiles(response.data);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        };

        fetchFiles();
    }, [projectId]);

    //Handle file upload
    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select a file to upload");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("projectId", projectId);
        formData.append("uploadedBy", currentUser.id);

        try {
            const response = await axios.post("/api/files/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setFiles ((prevFiles) => [...prevFiles, response.data.file]);
            setSelectedFile(null);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    //Handle file deletion
    const handleFileDelete = async (fieldId) => {
        try {
            await axios.delete(`/api/files/${fileId}`, {
                data: { projectId, userId: currentUser.id },
            });
            setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    };

    return (
        <Container>
            <Row className="text-center my-4">
                <h1>File Storage</h1>
            </Row>
            {["Owner", "Editor"].includes(userRole) && (
                <Row className="mb-4">
                    <Col>
                        <Form onSubmit={handleFileUpload}> 
                            <Form.Group>
                                <Form.Label> Upload File</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) =>
                                    setSelectedFile(e.target.files[0])}
                                    />
                            </Form.Group>
                            <Button type="Submit"
                            className="mt-2">
                                Upload
                            </Button>
                        </Form>
                    </Col>
                </Row>
            )}
            <Row>
                <Col>
                    <ListGroup>
                        {files.map((file) => (
                            <ListGroup.Item key={file._}>
                                <div className="d-flex justify-content-netween align-items-center">
                                    <Button
                                    href={`/api/files/download/${file.filename}`} target="_blank" 
                                    variant="link"
                                    >
                                        Download
                                    </Button>
                                    {userRole === "Owner" && (
                                        <Button
                                        variant="danger"
                                        onClick={() => handleFileDelete (file._id)}
                                        >
                                            Delete
                                        </Button>
                                    )}
                                </div>
                                <small>
                                    Uploaded by:
                                    {file.uploadBy?.name || "Unknown"}
                                </small>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default FileStoragePage;