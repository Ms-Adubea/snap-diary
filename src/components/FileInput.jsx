// FileInput.js
import React from 'react';

const FileInput = ({ onChange, multiple = false }) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Upload Photos</label>
            <input
                name="image"
                type="file"
                onChange={onChange}
                multiple={multiple}
                className="w-full p-2 border rounded bg-white text-black"
            />
        </div>
    );
};

export default FileInput;
