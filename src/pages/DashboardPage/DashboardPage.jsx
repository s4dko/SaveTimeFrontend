import Spinner from "../../components/Loader";
import {useDispatch, useSelector} from "react-redux";
import {getLoadingProjects, getProjects, getStatistics} from "../../redux/projects/projects-selectors";
import styles from './DashboardPage.module.scss';
import {Button, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useEffect, useMemo, useRef, useState} from "react";
import projectsOperations from "../../redux/projects/projects-operations";
import ProjectFavoriteList from "../../components/ProjectList/ProjectFavoriteList";
import {JS} from "json-server/lib/cli/utils/is";


// Hook
function usePrevious(value) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
}

const DashboardPage = () => {
    const loading = useSelector(getLoadingProjects);
    const dispatch = useDispatch();
    const projects = useSelector(getProjects);
    const statistics = useSelector(getStatistics);
    const prevProjects = usePrevious(projects)

    useEffect(() => {
        if ( JSON.stringify(prevProjects) !== JSON.stringify(projects) && projects.length === 0){
            dispatch(projectsOperations.getAllProjects())
        }
    }, [dispatch, projects]);

    useEffect(() => {
        if (projects.length > 0){
            fetchData(projects[0].id);
        }
    }, [projects]);

    function fetchData(projectId) {
        //setDataChart([]);
        dispatch(projectsOperations.getStatisticsSprintProject(projectId));
    }

    return (
        <>
            <div className={styles.DashboardHeader}>
                <div>
                    <h1 className={styles.DashboardTitle}>Sprints statistics</h1>
                </div>

                { projects.length > 0 ?
                    <div>
                        <FormControl variant="outlined" size={'small'} fullWidth style={{marginTop: 20}}>
                            <InputLabel id="demo-simple-select-outlined-label">Projects</InputLabel>
                            <Select label="Project" defaultValue={0}>
                                { projects.map( (item, index) =>
                                    <MenuItem value={index} onClick={ () => fetchData(item.id) }>{item.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <div style={{marginTop: 20}}>
                            <BarChart
                                width={1200}
                                height={250}
                                data={statistics}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="scheduled" fill="#9379D9" radius={[10, 10, 0, 0]} />
                                <Bar dataKey="spent" fill="#BCBCBC" radius={[10, 10, 0, 0]} />
                            </BarChart>
                        </div>
                    </div>
                    :
                    <div className={styles.DashboardEmptyWidget}>Not found projects</div>
                }

            </div>

            <div className={styles.DashboardHeader}>
                <div>
                    <h1 className={styles.DashboardTitle}>Current project</h1>
                </div>

                <div>
                    <ProjectFavoriteList />
                </div>
            </div>

            {loading && <Spinner />}

        </>
    );
};

export default DashboardPage;
