import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";

import Dialog from '@material-ui/core/Dialog';
import {useDispatch, useSelector} from "react-redux";
import {getUserTrelloKey, getUserTrelloToken, getUserTrelloBoardId} from "../../../redux/auth/auth-selectors";
import {useState} from "react";
import authOperations from "../../../redux/auth/auth-operations";


const TrelloModal = (props) => {;
    const {open, handleClose} = props;
    const trelloToken = useSelector(getUserTrelloToken);
    const trelloKey = useSelector(getUserTrelloKey);
    const boardId = useSelector(getUserTrelloBoardId);
    const dispatch = useDispatch();

    const [currentTrelloKey, setCurrentTrelloKey] = useState(trelloKey);
    const [currentTrelloToken, setCurrentTrelloToken] = useState(trelloToken);
    const [currentTrelloBoardId, setCurrentTrelloBoardId] = useState(boardId);

    const onChange = (prop) => {
        const value = prop.target.value;
        if ( prop.target.id === 'key') {
            setCurrentTrelloKey(value);
        }else if ( prop.target.id === 'token') {
            setCurrentTrelloToken(value);
        }else if ( prop.target.id === 'boardId'){
            setCurrentTrelloBoardId(value);
        }
    }

    const handleClick = () => {
        dispatch(authOperations.setTrelloSettings({
            trelloToken: currentTrelloToken,
            trelloKey: currentTrelloKey,
            trelloBoardId: currentTrelloBoardId
        }))
        handleClose();
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle >Trello Settings</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField id="key" label="Key" variant="outlined" value={currentTrelloKey} onChange={onChange}/>
                    </DialogContentText>
                    <DialogContentText >
                        <TextField id="token" label="Token" variant="outlined" value={currentTrelloToken} onChange={onChange}/>
                    </DialogContentText>
                    <DialogContentText >
                        <TextField id="boardId" label="Board ID" variant="outlined" value={currentTrelloBoardId} onChange={onChange}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClick} color="primary" variant={'contained'}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TrelloModal;
