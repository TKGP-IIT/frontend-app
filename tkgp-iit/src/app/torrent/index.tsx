import UploadFile from "../../../components/UploadFile";
import DownloadFile from "../../../components/DownloadFile";
import { useState } from "react";

export default function Home() {
    const [magnetURI, setMagnetURI] = useState<string>("");

    return (
        <div>
            <h1>Torrent File Sharing</h1>
            <UploadFile />
            {magnetURI && <DownloadFile magnetURI={magnetURI} />}
        </div>
    );
}
