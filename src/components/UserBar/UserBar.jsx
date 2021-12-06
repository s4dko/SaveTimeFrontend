import Spinner from 'components/Loader/Loader';
import {useDispatch, useSelector} from 'react-redux';

import authOperations from 'redux/auth/auth-operations';
import {
    getUserEmail,
    getLoadingUser,
    getError, getUserAvatar,
} from 'redux/auth/auth-selectors';
import swal from 'sweetalert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import styles from './UserBar.module.scss';
import {Badge, Button, IconButton, InputBase} from "@material-ui/core";
import { alpha, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {AccountCircle} from "@material-ui/icons";
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from '@material-ui/icons/Settings';
import {useHistory, useLocation} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'rgb(124 124 124 / 15%)',
        transition: '0.2s',
        '&:hover': {
            backgroundColor: 'rgb(124 124 124 / 25%)',
        },
        marginLeft: 0,
        marginRight: 20,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#545454'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    notification:{
        marginRight: 20
    },
    avatarIcon:{
        marginRight: 10,
        color: '#545454',
        width: 28,
        height: 28
    },
    settingsSelected:{
        color: '#927CD4'
    }

}));

export default function UserBar() {
    const dispatch = useDispatch();
    const email = useSelector(getUserEmail);
    const avatar = useSelector(getUserAvatar);
    const loading = useSelector(getLoadingUser);
    const Error = useSelector(getError);
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const onLogout = () => {
        dispatch(authOperations.logout());
        Error &&
        swal({
            text: `Server internal error`,
            icon: 'error',
            button: {text: 'OK', className: `${styles.swalButton}`},
        });
    };

    const isCurrentPage = (url) => {
        return location.pathname === url;
    }

    return (
        <div className={styles.Cont}>

            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon/>
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{'aria-label': 'search'}}
                />
            </div>

            <Avatar alt={email} src={'data:image/png;base64,' + avatar} className={classes.avatarIcon} />
            <p className={styles.User}>
                {email}
            </p>

            <IconButton onClick={ () => history.push({pathname: '/settings'})} className={isCurrentPage('/settings') ? classes.settingsSelected : classes.settings }><SettingsIcon/></IconButton>
            <IconButton onClick={onLogout}><ExitToAppIcon/></IconButton>
            {loading && <Spinner/>}
        </div>
    );
}
