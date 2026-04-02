import { useEffect, useState } from "react"
import api from "../services/api";

function Tasks() {
    const [tasks, setTasks] = useState([])
    const fetchTasks = async () => {
    const response = await api.get("tasks/list", {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    setTasks(response.data)
};

useEffect(() => {
    fetchTasks();
}, [])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editStatus, setEditStatus] = useState('');


    const handleChangeTitle = (event) => {
      setTitle(event.target.value);
    };
    const handleChangeDescription = (event) => {
      setDescription(event.target.value);
    };
    const handleChangeEditTitle = (event) => {
      setEditTitle(event.target.value);
    };
    const handleChangeEditDescription = (event) => {
      setEditDescription(event.target.value);
    };
    const handleChangeEditStatus = (event) => {
      setEditStatus(event.target.value);
    };
    const handleCreate = async () => {
    const response = await api.post("/tasks/create",
      { title: title, description: description},
      { headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}
  )
    fetchTasks()
}
    const handleDelete = async (id) => {
    const response = await api.delete(`/tasks/delete/${id}`, 
      { headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}
  )
    fetchTasks()
}
    const handleEdit = (task) => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditStatus(task.status);
    setId(task.id);
}
    const handleSave = async (id) => {
    const response = await api.patch(`/tasks/update/${id}`,
      { title: editTitle, description: editDescription, status: editStatus},
      { headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}
  )
    fetchTasks()

}
      
  return (
    <div>
      <h1>Tasks</h1>
      <input
        type="title"
        value={title} 
        onChange={handleChangeTitle} 
        placeholder="Digite o título da task"
      />
      <input
        type="description"
        value={description} 
        onChange={handleChangeDescription} 
        placeholder="Digite a descrição da task"
      />
      <button onClick={handleCreate}>
      Criar Task
    </button>
      <div>
      {tasks.map(task => (
      <div key={task.id}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>{task.status}</p>
        {id === task.id && <div>
        <input type="title" value={editTitle} onChange={handleChangeEditTitle} placeholder="Digite o nome escolhido"></input>
        <input type="description" value={editDescription} onChange={handleChangeEditDescription} placeholder="Digite a descxrcao escolhido"></input>
        <select value={editStatus} onChange={handleChangeEditStatus}>
          <option value="PENDING">Pendente</option>
          <option value="COMPLETED">Completada</option>
        </select>
        <button onClick={()=> handleSave(task.id)}>
          Salvar Edição
        </button>        
        </div>
        }
        <button onClick={()=> handleDelete(task.id)}>
          Deletar Task
        </button>
        <button onClick={()=> handleEdit(task)}>
          Editar Task
        </button>
      </div>
))}      </div>
    </div>
  )
}

export default Tasks