import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import styles from '../../styles/TaskBank.module.css';
import classNames from 'classnames/bind';
import { selectCurrentUser } from '../../state/authSlice'
import { addTask, setTaskListToEdit } from "../../state/taskSlice";
import { useNavigate } from 'react-router-dom';

let cn = classNames.bind(styles)

export const TaskItem = ({ task, activeTask, setActiveTask, selectedTask, setSelectedTask, editedTask }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);


    const handleClick = (task) => {
        if (activeTask === task) setActiveTask(null)
        else setActiveTask(task)
    }

    return (

        <div className={cn({
            taskItem: true,
            selectedTaskItem: editedTask ? editedTask.tasks.some((e) => e.id === task.id) : false
        })} onClick={() => handleClick(task)}>
            <div className={styles.itemContent}>
                {/*title*/}
                <div className={styles.summary}>
                    <div>{task.title}: <span className={styles.shortDescription}>{activeTask !== task && `${task.description.slice(0, 5)}...`}</span></div>
                    {user ? !editedTask?.tasks.some((e) => e.id === task.id) ?
                        <div className={styles.select}><Button variant="contained" color="success" onClick={(e) => {
                            setSelectedTask((selectedTask) => [...selectedTask, task])
                            e.stopPropagation();
                            if (editedTask) {
                                dispatch(addTask({ ...task, 'points': 0 }))
                            } else {
                                dispatch(setTaskListToEdit({
                                    "title": ' ',
                                    "description": ' ',
                                    "status": "draft",
                                    "tasks": [{ ...task, 'points': 0 }]
                                }))
                                navigate('/edited-task')
                            }


                        }}>Kiválaszt</Button></div>
                        :
                        <div>KIVÁLASZTVA</div> : <></>}
                </div>
                {/*description*/}
                {activeTask === task &&
                    <div className={styles.description}>{task.description}</div>}
            </div>
        </div>

    )
}
