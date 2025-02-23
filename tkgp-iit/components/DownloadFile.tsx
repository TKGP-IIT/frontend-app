import WebTorrent from "webtorrent";
import React from "react";

type DownloadFileProps = {
    magnetURI: string;
};

const DownloadFile: React.FC<DownloadFileProps> = ({ magnetURI }) => {
    const client = new WebTorrent();

    const handleDownload = () => {
        client.add(magnetURI, (torrent) => {
            torrent.files.forEach((file) => {
                file.getBlobURL((err, url) => {
                    if (!err && url) {
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = file.name;
                        a.click();
                    }
                });
            });
        });
    };

    return <button onClick={handleDownload}>Download File</button>;
};

export default DownloadFile;