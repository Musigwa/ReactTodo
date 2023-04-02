import { TiDelete } from 'react-icons/ti';
import { BsCheck2Circle } from 'react-icons/bs';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import './App.css';
import { useEffect, useState } from 'react';
import { Todo } from './interfaces';
import { Circles } from 'react-loader-spinner';

const baseUrl = 'https://jsonplaceholder.typicode.com/todos';
const headers = { 'Content-type': 'application/json; charset=UTF-8' };

const App = () => {
  const [text, setText] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [sortColumn, setSortColumn] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<string>('asc');

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(baseUrl);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async () => {
    try {
      setLoading(true);
      const newTodo = { title: text, completed: false };
      const response = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers,
      });
      const createdTodo = await response.json();
      setTodos([...todos, createdTodo]);
    } catch (error) {
      console.error(error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const markTodoAsCompleted = async (id: number) => {
    try {
      setLoading(true);
      const updatedTodos = [...todos];
      const todoIndex = updatedTodos.findIndex(todo => todo.id === id);
      const todo = updatedTodos[todoIndex];
      const completed = !todo.completed;
      updatedTodos[todoIndex] = { ...todo, completed };
      setTodos(updatedTodos);
      await fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ completed }),
        headers,
      });
    } catch (error) {
      console.error(error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      setLoading(true);
      await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = ({ target }: { target: { value: string } }) => {
    setText(target.value);
  };

  const handleSort = (column: string) => {
    let direction = 'asc';
    if (sortColumn === column && sortDirection === 'asc') {
      direction = 'desc';
    }
    setSortColumn(column);
    setSortDirection(direction);
  };

  const getSortedData = () => {
    const sortedData = [...todos].sort((a: Todo, b: Todo) => {
      let comparison = 0;
      if (sortColumn === 'id') {
        comparison = a.id - b.id;
      } else if (sortColumn === 'completed') {
        comparison = Number(a.completed) - Number(b.completed);
      } else if (sortColumn === 'text') {
        comparison = a.title.localeCompare(b.title);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
    return sortedData;
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className='App'>
      {loading ? (
        <Circles color='#00BFFF' height={100} width={100} wrapperClass='centered-content' />
      ) : (
        <>
          <header className='appbar-root'>
            <h1 className='appbar-title'>Todo App</h1>
            <input placeholder='Add new todo...' onChange={handleTextChange} value={text} />
            <button className={text.length ? '' : 'button-disabled'} onClick={createTodo}>
              Add Todo
            </button>
          </header>
          <table>
            <tr>
              <th onClick={() => handleSort('id')}>ID</th>
              <th onClick={() => handleSort('text')}>Name</th>
              <th onClick={() => handleSort('completed')}>Status</th>
              <th>Delete</th>
            </tr>
            {getSortedData().map(({ completed, id, title }, index) => {
              return (
                <tr key={`${index}${id}`} onClick={() => markTodoAsCompleted(id)}>
                  <td style={{ textDecoration: completed ? 'line-through' : 'none' }}>{id}</td>
                  <td style={{ textDecoration: completed ? 'line-through' : 'none' }}>{title}</td>
                  <td>
                    {completed ? (
                      <BsCheck2Circle
                        className='completed'
                        size={25}
                        onClick={() => markTodoAsCompleted(id)}
                      />
                    ) : (
                      <RiCheckboxBlankCircleLine
                        className=''
                        size={25}
                        onClick={() => markTodoAsCompleted(id)}
                      />
                    )}
                  </td>
                  <td>
                    <TiDelete size={25} className='delete-btn' onClick={() => deleteTodo(id)} />
                  </td>
                </tr>
              );
            })}
          </table>
        </>
      )}
    </div>
  );
};

export default App;
