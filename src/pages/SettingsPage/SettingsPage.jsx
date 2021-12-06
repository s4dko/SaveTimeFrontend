import Spinner from "../../components/Loader";
import styles from './SettingsPage.module.scss';
import {useSelector} from "react-redux";
import {getLoadingProjects} from "../../redux/projects/projects-selectors";
import {Paper, Switch} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TrelloModal from "./Modals/TrelloModal";
import { useState } from 'react';

const SettingsPage = () => {
    const loading = useSelector(getLoadingProjects);
    const [openTrello, setOpenTrello] = useState(false);

    const closeTrello = () => {
        setOpenTrello(false);
    }

    const showTrello = () => {
        setOpenTrello(true);
    }

    return (
        <>
            <div className={styles.SettingsHeader}>
                <div>
                    <h1 className={styles.SettingsTitle}>Account</h1>
                </div>

                <div>
                    <h1 className={styles.SettingsTitle}>Integrations</h1>
                    <div style={{marginTop: 20}}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Paper className={styles.block}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <img src="/trello.png" />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <div className={styles.blockTitle}>Trello</div>
                                            <div className={styles.blockDescription}>
                                                Trello is a collaboration tool that organizes your projects into boards. In one glance, Trello tells you what's being worked on, who's working on what, and where something is in a process.
                                            </div>
                                            <div className={styles.blockOpen}>
                                                <span className={styles.btnOpen} onClick={showTrello}>Open settings</span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Switch
                                                checked={true}
                                                color="primary"
                                                name="checkedB"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                className={styles.blockSwitch}
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                            <Grid item xs={4}>
                                <Paper className={styles.block}>
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <img src="/jira.png" />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <div className={styles.blockTitle}>Jira</div>
                                            <div className={styles.blockDescription}>
                                                Jira is a flexible issue tracking tool that helps teams plan, manage, and report on their work.  There are different versions of Jira depending on your usage needs.
                                            </div>
                                            <div className={styles.blockOpen}>
                                                <span className={styles.btnOpen}>Open settings</span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Switch
                                                color="primary"
                                                name="checkedB"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                className={styles.blockSwitch}
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>

                            <Grid item xs={4}>
                                <Paper className={styles.block} >
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <img src="/asana.png" />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <div className={styles.blockTitle}>Asana</div>
                                            <div className={styles.blockDescription}>
                                                Asana is a cloud-based task management solution that allows businesses to manage, collaborate, communicate, and organize their tasks and projects. It is specialized for handling multiple projects at one time and it is suitable for companies of any size.
                                            </div>
                                            <div className={styles.blockOpen}>
                                                <span className={styles.btnOpen}>Open settings</span>
                                            </div>

                                        </Grid>
                                        <Grid item xs={2}>
                                            <Switch
                                                color="primary"
                                                name="checkedB"
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                className={styles.blockSwitch}
                                            />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>





                    </div>
                </div>
            </div>

            {loading && <Spinner />}

            <TrelloModal open={openTrello} handleClose={closeTrello}/>
        </>
    );
};

export default SettingsPage;
