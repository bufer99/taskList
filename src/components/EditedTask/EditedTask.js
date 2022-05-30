import styles from '../../styles/EditedTask.module.css'
import { getEditedTask } from '../../state/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { StatusSelect } from './StatusSelect'
import classNames from 'classnames/bind'
import { Task } from './Task'
import { EditIcon } from './EditIcon'
import { setTaskListToEdit } from '../../state/taskSlice';
import { Button } from '@mui/material'
import { useUpdateListMutation, useCreateListMutation } from '../../state/taskApiSlice';
import { useNavigate } from 'react-router-dom'
let cn = classNames.bind(styles);

const options = ['published', 'draft']

export const EditedTask = () => {

    const navigate = useNavigate();
    const [createListFn] = useCreateListMutation();
    const [updateListFn] = useUpdateListMutation();
    const dispatch = useDispatch()
    const taskList = useSelector(getEditedTask)
    const [editTitle, setEditTitle] = useState(false);
    const [editDescription, setEditDescription] = useState(taskList.editDescription);
    
    const handleChange = (e) => {

        dispatch(setTaskListToEdit({
            ...taskList,
            [e.target.id]: e.target.value
        }))
    }

    async function saveTask() {
        console.log(updateListFn)

        if (taskList?.id) {
            try {
                const result = await updateListFn({ ...taskList });
                if (result.data) {
                    console.log(result.data);
                } else {
                    console.log('error')
                }
            } catch (err) {
                console.log("err");
            }
            return
        }

        try {
            const result = await createListFn({ ...taskList });
            if (result.data) {
                console.log(result.data);
            } else {
                console.log('error')
            }
        } catch (err) {
            console.log("err");
        }
    }

    const closeEditor = () => {
        dispatch(setTaskListToEdit(null))
        navigate('/my-tasks')
    }

    
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.taskListWrapper}>
                    <div className={styles.taskList}>
                        <div className={styles.actionBtns}>
                            <Button onClick={saveTask} variant='contained' disabled={ taskList.description.trim() === '' ||
                                                                                            taskList.title.trim() === '' ||
                                                                                            taskList.tasks.length === 0 } color='success'>Mentés</Button>
                            <Button onClick={closeEditor} variant='contained'>Szerkesztés lezárása</Button>
                        </div>
                        <div className={styles.title}>
                            {editTitle ? <input id='title' onChange={handleChange} style={{ height: '30px', fontSize: '20px' }} value={taskList.title ? taskList.title : ''}></input> : taskList.title}
                            <EditIcon edit={{ 'editValue': editTitle, 'setValue': setEditTitle }} value={taskList.title} />
                        </div>
                        <div className={cn({
                            status: true,
                            flexRow: true
                        })}>
                            <div>Státusz:</div>
                            <StatusSelect id='status' options={options} status={taskList.status} onChange={handleChange} />
                        </div>
                        <div className={styles.description}>
                            <div className={styles.features}>
                                <span>Leírás:</span>
                                <EditIcon edit={{ 'editValue': editDescription, 'setValue': setEditDescription }} value={taskList.description} />
                            </div>
                            <div className={styles.content} style={{ whiteSpace: 'pre-line', lineHeight: '1' }}>
                                {editDescription ? <textarea id='description' onChange={handleChange} style={{ fontSize: '25px', width: '100%' }} rows={5} maxLength={150} value={taskList.description ? taskList.description : ''}></textarea> : <span>{taskList.description}</span>}
                            </div>
                        </div>
                        <div className={cn({
                            createdAt: true,
                            flexRow: true
                        })}>
                            <div>Létrehozva:</div>
                            <div>{taskList.createdAt ? new Date(taskList.createdAt).toLocaleString() : '-'}</div>
                        </div>
                        <div className={cn({
                            updatedAt: true,
                            flexRow: true
                        })}>
                            <div>Frissítve:</div>
                            <div>{taskList.updatedAt ? new Date(taskList.updatedAt).toLocaleString() : '-'}</div>
                        </div>
                        <div className={cn({
                            totalPoints: true,
                            flexRow: true
                        })}>Öszpontszám: {taskList.tasks.reduce((prev, curr) => prev + Number(curr.points), 0)}</div>
                    </div>
                    <div className={styles.tasksFlex}>
                        {taskList.tasks.map((task) => (
                            <div key={task.id}>
                                <Task task={task} taskList={taskList} />
                                <hr />
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}