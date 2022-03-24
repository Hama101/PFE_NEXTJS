import { useEffect, useState } from 'react';
//mui
import LinearProgress from '@material-ui/core/LinearProgress';
//my controllers
import { uploadFileToCouldinary } from '../../../controllers/api/Cloudinary/mediaController'
import Fileheader from './FileHeader';

const FileWithProgress = ({ file, setImages, onDelete, onUpload, id }) => {
    const [progress, setProgress] = useState(0)



    useEffect(() => {
        //handel file uploader
        async function uploadFile() {
            const response = await uploadFileToCouldinary(file, setProgress)
            const url = response.secure_url
            const id = response.public_id
            // setImages((current) => [...current, url])
            onUpload(file, url, id)
        }
        uploadFile()
    }, [])
    return (
        <div className="text-white" >
            <br />
            <div className="row">
                {/* create a title and a button to delete the image one on the left side and the other on the right side */}
                <Fileheader
                    file={file}
                    setImages={setImages}
                    onDelete={onDelete}
                    id={id}
                />
            </div>
            <br />
            <LinearProgress variant="determinate" value={progress} />
        </div>
    );
}

export default FileWithProgress;
