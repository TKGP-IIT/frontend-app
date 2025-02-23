"use client"

import { useState } from "react";

const UploadFile = () => {
    const [magnetLink, setMagnetLink] = useState<string>("");

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;

        const formData = new FormData();
        formData.append("file", event.target.files[0]);

        const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        setMagnetLink(data.magnetURI);
    };

    return (
        <div>
            <input type="file" onChange={handleUpload} />
            {magnetLink && <p>Magnet Link: <a href={magnetLink}>{magnetLink}</a></p>}
        </div>
    );
};

export default UploadFile;
