import React from 'react';
import { Button, Grid } from '@material-ui/core'

const Fileheader = ({ file, setImages, onDelete, id }) => {
    return (
        <Grid container justify="space-between" alignItems="center" >
            <Grid item>{file.name}</Grid>
            <Grid item>
                <Button size="small"
                    onClick={() => onDelete(file, id)}
                    color="secondary"
                    style={{
                        //rounded borderRadius
                        border: '1px solid #fff',
                    }}>
                    Delete
                </Button>
            </Grid>
        </Grid>
    );
}

export default Fileheader;
