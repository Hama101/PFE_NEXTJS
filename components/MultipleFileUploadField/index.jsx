import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button, Grid } from '@material-ui/core'
//my components
import FileWithProgress from './FileWithProgress'
import Fileuploadhandeler from './Fileuploadhandeler'
//my controllers
import { deleteFileFromCloudinary } from '../../controllers/api/Cloudinary/mediaController'

const MultipleFileUploadField = ({ setImages }) => {
    // a schema of a file wrapper
    const [files, setFiles] = useState([])

    const onDelete = (file, id) => {
        console.log("deleting file :", file);
        let newFiles = files
        //? sometimes bulit js function does not work
        for (let i = 0; i < newFiles.length; i++) {
            if (newFiles[i].file.name === file.name) {
                newFiles.splice(i, 1)
                break
            }
        }
        console.log("files after delete :", newFiles);
        setFiles([...newFiles])
        setImages(files.map(file => file.url))
        // handel deleting file from cloudinary
        console.log("deleting file with id of :", id)
        deleteFileFromCloudinary(id);
    }

    const onUpload = (file, url, id) => {
        for (let i = 0; i < files.length; i++) {
            if (files[i].file.name === file.name) {
                files[i].url = url
                files[i].id = id
                break
            }
        }
        //set images with only the urls
        setImages(files.map(file => file.url))
    }

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        // Do something with the files
        const mappedFiles = acceptedFiles.map(file => ({ file, errors: [] }))
        setFiles(current => [...current, ...mappedFiles, ...rejectedFiles])
    }, [])

    console.log("files :", files);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        maxSize: 512 * 1024, //512kb
    })

    return (
        <React.Fragment>
            <Grid item {...getRootProps()} style={{
                borderRadius: '10px',
                border: '2px solid #fff'
            }}>
                <input {...getInputProps()} />
                <p className="text-white" style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: '2rem',
                    marginBottom: '2rem',
                    //rounded borderRadius
                }}>Drag some files here, or click to select files</p>
            </Grid>
            {files &&
                files.map((fileWrapper, index) => (
                    <Grid item key={index}>
                        {fileWrapper.errors.length > 0
                            ?
                            <Fileuploadhandeler key={index}
                                file={fileWrapper.file}
                                errors={fileWrapper.errors}
                                onDelete={onDelete}
                            />
                            :
                            <FileWithProgress key={index}
                                file={fileWrapper.file}
                                id={fileWrapper.id}
                                setImages={setImages}
                                onDelete={onDelete}
                                onUpload={onUpload}
                            />
                        }
                    </Grid>
                ))
            }

        </React.Fragment>
    )
}

export default MultipleFileUploadField;
