import React, { useState } from "react";
import axios from "axios";

const EditableField = ({ userId, field, value, type = "text", onSave }) => {
    const [ editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleSave = async () => {
        try {
            const response = await axios.patch("/api/users/update-field", {
                userId,
                field,
                value: inputValue,
            });
            alert(response.data.message);
            onSave(inputValue); //Notify parent of update
            setEditing(false);
        } catch (error) {
            console.error("Error updating field:", error);
            alert("Error updating field");
        }
    };

    return editing ? (
        <div>
            {type === "textarea" ? (
                <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={3}
                    style={{ width: "100%" }}
                    /> 
            ) : (
                <input
                    type={type}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{ width: "100%"}}
                    />
            )}
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
    ) : (
        <div>
            <span>{value || "Click to edit"}</span>
            <button onClick={() => setEditing(true)}>Edit</button>
        </div>
    );
};

export default EditableField;