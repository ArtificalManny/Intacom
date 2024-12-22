import React, { useState, useRef } from 'react';  // Added useRef import
import PropTypes from 'prop-types';

// Assuming ButtonIcon is a valid component you've imported elsewhere
// Import your ButtonIcon and mdiPencil where necessary

function EditableTitle({ value, ...props }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const inputRef = useRef(null);

    // Function to enable edit mode
    function turnOnEditMode() {
        setIsEditMode(true);
        inputRef.current.focus();  // Autofocus the input field
    }

    return (
        <div>
            <span>
                {/* Project Title */}
                <input
                    ref={inputRef}
                    type="text"  // Added type for input
                    value={value}
                    readOnly={!isEditMode}
                    onClick={turnOnEditMode}
                    onBlur={() => setIsEditMode(false)}
                    {...props}
                />
            </span>

            {/* Assuming ButtonIcon is properly imported */}
            <ButtonIcon
                className={`hover:bg-gray-200 rounded-full`}  // Removed undefined css.button
                path={mdiPencil}  // Assuming mdiPencil is defined/imported
                size={0.65}
                color="gray"  // Set a default color or pass one via props
            />

            {/* Edit button to toggle mode, optional if needed */}
            <button onClick={turnOnEditMode}>
                Edit
            </button>
        </div>
    );
}

EditableTitle.propTypes = {
    value: PropTypes.string.isRequired,  // Added required prop validation
};

export default EditableTitle;
