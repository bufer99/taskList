import styles from '../../styles/EditedTask.module.css';
import { useDispatch } from 'react-redux';
import { setTaskListToEdit } from '../../state/taskSlice';

export const Task = ({ task, taskList }) => {


    const { title, description, notes, points, id } = task;
    const dispatch = useDispatch()

    const handleChange = (e) => {

        if (e.target.id === 'points') {

            if(!Number.isInteger(e.nativeEvent.data*1)) return
            const newTask = { ...taskList.tasks.find((element) => element.id === id) };
            
            newTask[e.target.id] = Number(e.target.value)
            
            dispatch(setTaskListToEdit({
                ...taskList,
                tasks: [...taskList.tasks.map((e) => e.id === id ? newTask : e)]
            }))
            return
        }

        const newTask = { ...taskList.tasks.find((element) => element.id === id) };
        newTask[e.target.id] = e.target.value
        dispatch(setTaskListToEdit({
            ...taskList,
            tasks: [...taskList.tasks.map((e) => e.id === id ? newTask : e)]
        }))
    }


    return (

        <div style={{ fontSize: '25px', display: 'flex', flexDirection: 'column', gap: '10px' }} className={styles.task}>
            <div><b>{title}</b></div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <label htmlFor="points"><u>Pont:</u></label>
                <input onChange={handleChange} style={{ width: '60px', fontSize: '20px', height: '20px' }} id='points' value={points}></input>
            </div>
            <div>
                <div><u>Leírás:</u></div>
                <div style={{ marginLeft: '10px' }}>
                    {description}
                </div>
            </div>
            <div><textarea onChange={handleChange} id="notes" style={{ fontSize: '15px', width: '100%' }} rows={5} maxLength={150} value={notes}></textarea></div>

        </div>

    )
}