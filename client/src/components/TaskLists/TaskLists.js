import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetTaskListsQuery } from '../../state/taskApiSlice';
import { getEditedTask, setTaskListToEdit } from '../../state/taskSlice';
import { useState, useEffect } from 'react';
import styles from '../../styles/TaskLists.module.css';
import { Loading } from '../Loading';
import classNames from 'classnames/bind';
import { useInView } from 'react-intersection-observer';
import { Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


//const LIMIT = 13;
let cn = classNames.bind(styles);

export const TaskLists = () => {
    const [expanded, setExpanded] = useState(null);

    const navigate = useNavigate();
    const { ref, inView, entry } = useInView({
        threshold: 0,
    });

    const dispatch = useDispatch();
    const editedTask = useSelector(getEditedTask);

    const handleClick = (list) => (e) => {
        e.stopPropagation()
        dispatch(setTaskListToEdit(list))
        navigate('/edited-task')
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
        const element = event.target.closest('div[id^="accordion-"]')
        
        if (isExpanded) {
            setTimeout(() => element.scrollIntoView({ behavior: "smooth", block: "start", })
                , 250);
        }
    };

    const { data, error, isLoading, refetch } = useGetTaskListsQuery();

    useEffect(() => {
        refetch()
    }, [])


    if (isLoading || !data) {
        console.log(data)
        return <Loading />
    }

    if (data.total === 0) {
        return (
            <>
                <div className={styles.wrapper}>
                    <div className={styles.content}>
                        <div className={styles.text}>Nincs még feladatsorod</div>
                    </div>
                </div>
            </>
        )
    }

    const newTask = () =>{
        dispatch(setTaskListToEdit({
            "title": ' ',
            "description": ' ',
            "status": "draft",
            "tasks": []
        }))
        navigate('/edited-task')
    }

    return (
        <div style={{ height: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px'}}>
            <div style={{ margin: '30px 0 0 0' }}>
                <Button onClick={newTask} variant='contained'>Új feladatsor</Button>
            </div>
            <div className={styles.accordionWrapper}>
                {data.data.map((taskList) => (
                    <Accordion key={taskList.id} ref={ref} id={"accordion-" + taskList.id} className={styles.accordion} expanded={expanded === taskList.id} onChange={handleChange(taskList.id)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <div className={styles.summaryWrapper} key={taskList.id}>
                                <Typography className={styles.title}><b>{taskList.title}</b></Typography>
                                <Typography className={styles.status}><b>Státusz:</b></Typography>
                                <Typography className={styles.statusData}><span className={cn({
                                    published: taskList.status === 'published',
                                    draft: taskList.status === 'draft',
                                })}>{taskList.status}</span></Typography>
                                <Typography className={styles.tasksLength}><b>Feladatok:</b></Typography>
                                <Typography className={styles.tasksLengthData}><span>{taskList.tasks.length} db</span></Typography>
                                <Typography className={styles.createdAt}><b>Létrehozva:</b></Typography>
                                <Typography className={styles.createdAtData}><span>{new Date(taskList.createdAt).toLocaleString()}</span></Typography>
                                <Typography className={styles.updatedAt}><b>Frissítve:</b></Typography>
                                <Typography className={styles.updatedAtData}><span>{new Date(taskList.updatedAt).toLocaleString()}</span></Typography>
                                <Typography className={styles.description}><b>Leírás:</b> {taskList.description}</Typography>
                                {editedTask === null && <Typography className={styles.editBtn}><Button variant='contained' onClick={handleClick(taskList)}>Szerkeszt</Button></Typography>}
                            </div>
                        </AccordionSummary>
                        <AccordionDetails id={"details-" + taskList.id}>
                            <Typography className={styles.totalPoints}><b> Öszpontszám: {taskList.tasks.reduce((prev, curr) => prev + curr.points, 0)}</b></Typography>
                            <hr />
                            <div className={styles.detailsWrapper}>
                                {taskList.tasks.map((task) => (

                                    <div className={styles.task} key={task.id}>
                                        <div><b><u>cím:</u></b><br /> <span>{task.title}</span></div>
                                        <div><b><u>leírás:</u></b><br /> <div className={styles.description}>{task.description}</div></div>
                                        <div><b><u>megjegyzés:</u></b><br /> <div className={styles.note}>{task.notes}</div></div>
                                        <div><b><u>pont:</u></b><br /> <span>{task.points}</span></div>
                                    </div>


                                ))}

                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    );
}

//ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss