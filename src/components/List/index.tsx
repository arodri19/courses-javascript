import { ITask } from "../../types/tasks";
import Item from "./Item";
import style from './List.module.scss';



function List({ tasks }: { tasks: ITask[]}) {
    return (
        <aside className={style.taskList}>
            <h2>Estudos do dia</h2>
            <ul>
                {tasks.map((item, index) => (
                    <Item
                        key={index}
                        {...item } 
                    />
                ))}
            </ul>
        </aside>
    )
}

export default List;