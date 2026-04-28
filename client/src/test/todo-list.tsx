import { useState } from "react";

export const TodoList = () => {
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<string[]>([]);
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTodo(e.target.value);
    }

    const onAdd = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(todo && todo.length != 0){
            setTodos((prev: string[]) => [...prev, todo]);
        }
        setTodo("");
    }

    const removeTodo = (index: number, item: string) => {
        setTodos((prev: string[]) => prev.filter((_, i) => i !== index));
        console.log("remove :", item);
    }

    const TodoComponent = () => {
        return (
            <ul>
                {todos.map((item, index) => (
                    <li key={index}>{item} <a key={index} style={{color : "red", marginLeft : "20px", cursor : "pointer"}} onClick={() => removeTodo(index, item)}>[x]</a></li>
                ))}
            </ul>
        );
    }

    return (
        <div>
            <h1>Todo List ({todos.length})</h1>
            <form onSubmit={onAdd}>
                <input type="text" value={todo} placeholder="Todo.." onChange={onChange}/>
                <button type="submit">Add Todo</button>
            </form>
            <hr/>
            <TodoComponent />
        </div>
    );
};

export default TodoList;

