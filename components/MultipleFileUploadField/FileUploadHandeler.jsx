import React from 'react';
import Fileheader from './FileWithProgress/FileHeader';
import LinearProgress from '@material-ui/core/LinearProgress';

const Fileuploadhandeler = ({ file, errors, onDelete }) => {
    return (
        <div className="text-white" >
            <br />
            <div className="row">
                {/* create a title and a button to delete the image one on the left side and the other on the right side */}
                <Fileheader
                    file={file}
                    onDelete={onDelete} />
            </div>
            <br />
            <LinearProgress variant="determinate" value={100} color="secondary" />
            {
                errors.length > 0 && errors.map((error, index) => (
                    <h6 className="text-danger" key={index}>{error.message}</h6>
                ))
            }
        </div>
    );
}

export default Fileuploadhandeler;
