import { ITask } from "../../types/tasks";
import Item from "./Item";
import style from './List.module.scss';

interface Props {
    tasks: ITask[],
    taskSelect: (selectedTask: ITask) => void
}


function List({ tasks, taskSelect }: Props) {
    return (
        <aside className={style.taskList}>
            <h2>Estudos do dia</h2>
            <ul>
                {tasks.map((item) => (
                    <Item
                        key={item.id}
                        {...item }
                        taskSelect={taskSelect} 
                    />
                ))}
            </ul>
        </aside>
    )
}

export default List;