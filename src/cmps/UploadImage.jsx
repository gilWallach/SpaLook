import { useState } from "react";
import { uploadImg } from "../services/img-upload.service";
import UploadFileIcon from '@mui/icons-material/UploadFile';

export const UploadImage = ({ handleSave }) => {
    const [selectedImageUrl, setSelectedImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [isDragover, setIsDragover] = useState(false)
    const [isError, setIsError] = useState(false)


    function handleFile(ev) {
        ev.preventDefault()
        let file
        if (ev.type === 'change') file = ev.target.files[0]
        else if (ev.type === 'drop') file = ev.dataTransfer.files[0]
        onUploadFile(file)
    }

    async function onUploadFile(file) {
        setIsLoading(true)
        setIsDragover(false)
        setIsError(false)
        try {
            const res = await uploadImg(file)
            handleSave(res.url)
        } catch (err) {
            console.log('err', err)
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="upload-container flex align-center justify-center" onDrop={handleFile} onDragOver={(ev) => ev.preventDefault()}>
            {isError && <div>Oops.. something went wrong, check your internet connection or try again later</div>}
            {isLoading && <div className="img-container">
                <img src={require('../assets/imgs/loader.gif')} alt="img-loader" />
            </div>}
            <br />
            <br />
            {!isLoading && <label>
                <div>
                    <p >Click to upload image - or drag an image from your computer</p>
                    <UploadFileIcon sx={{ fontSize: "100px" }} />
                </div>
                <input
                    hidden
                    type="file"
                    name="myImage"
                    onChange={(event) => handleFile(event)}
                />
            </label>}

        </div>
    );
};