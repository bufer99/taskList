import {
    useGetTasksWithLimitQuery,
} from "../../state/taskApiSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";
import styles from '../../styles/TaskBank.module.css';
import classNames from 'classnames/bind';
import { TaskItem } from './TaskItem';
import { Loading } from '../Loading';
import { getEditedTask } from "../../state/taskSlice";

const LIMIT = 10;

export const TaskBank = () => {

    const [page, setPage] = useState(0);
    const { data, error, isLoading } = useGetTasksWithLimitQuery({ skip: page * LIMIT, limit: LIMIT });
    const [activeTask, setActiveTask] = useState(null)
    const [selectedTask, setSelectedTask] = useState([])
    const editedTask = useSelector(getEditedTask);

    const handleButton = (e) => {
        if (e.target.innerText === '>') setPage((page) => page + 1)
        else setPage((page) => page - 1)
    }

    if (isLoading || !data) {
        return <Loading />;
    }

    return (

        <div className={styles.wrapper}>
            <div className={styles.tasksWrapper}>
                {data.data.map((task) => (
                    <TaskItem key={task.id} task={task} activeTask={activeTask} setActiveTask={setActiveTask} selectedTask={selectedTask} setSelectedTask={setSelectedTask} editedTask={editedTask} />
                ))}
            </div>
            <div className={styles.btns}>
                <Button variant="contained" disabled={page === 0} onClick={(e) => handleButton(e)}>{`<`}</Button>
                <Button variant="contained" disabled={(page + 1) * LIMIT === data.total || data.total % data.limit === data.data.length} onClick={(e) => handleButton(e)}>{'>'}</Button>
            </div>
        </div>
    )
}