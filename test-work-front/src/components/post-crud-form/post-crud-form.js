import React from 'react';
import { TextareaAutosize, TextField, FormControl, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';


const PostCrudForm = (props) => {
    const { error, text, title, setText, setTitle, onSubmit } = props;
    return (
        <form noValidate autoComplete="off">
            <FormControl fullWidth>
                <TextField
                    label="Title"
                    error={!!error.title}
                    id="component-simple"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    helperText={error.title}
                />

            </FormControl>
            <br />
            <br />
            <FormControl fullWidth>
                <TextareaAutosize
                    placeholder="Text"
                    aria-label="empty textarea"
                    rowsMin={4}
                    style={{
                        fontSize: "14px",
                        borderColor: !!error.text ? "red" : "#666"
                    }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </FormControl>
            <br />
            <br />
            <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={onSubmit}
            >
                Save
            </Button>
        </form>
    )
}

export default PostCrudForm;