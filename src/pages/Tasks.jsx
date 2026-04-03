import { useEffect, useState } from "react"
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Tasks() {
    const [tasks, setTasks] = useState([])
    const fetchTasks = async (filterStatus) => {
    const responseTask = await api.get("tasks/list", {
        params: {"status": filterStatus},
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    setTasks(responseTask.data)
};
    const fetchUser = async () => {
    const responseUser = await api.get("users/me", {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    setUser(responseUser.data)

};
    const navigate = useNavigate();

useEffect(() => {
    fetchTasks();
    fetchUser();
}, [])
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [id, setId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editStatus, setEditStatus] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [user, setUser] = useState('');
    const [createModal, setCreateModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false)

    

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
    const handleChangeFilterStatus = async (event) => {
      setFilterStatus(event.target.value);
      fetchTasks(event.target.value);    

    };
    const handleCreate = async () => {
    const response = await api.post("/tasks/create",
      { title: title, description: description},
      { headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}
  )
    fetchTasks();
    setCreateModal(false);
    setTitle('');
    setDescription('');
}
    const handleDelete = async (id) => {
    const response = await api.delete(`/tasks/delete/${id}`, 
      { headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}
  )
    setSelectedTask()
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
    fetchTasks();
    setSelectedTask(prev => ({ ...prev, title: editTitle, description: editDescription, status: editStatus }))
    setIsEditing(false);

}
    const handleToggleStatus = async (task) => {
    if(task.status === 'COMPLETED'){
      const response = await api.patch(`/tasks/update/${task.id}`,
        { status: 'PENDING'},
        { headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}
      )
    }else{
      const response = await api.patch(`/tasks/update/${task.id}`,
        { status: 'COMPLETED'},
        { headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}
      )
    }
  
    fetchTasks();
    setIsEditing(false);

}
 const handleLogout = async () => {
      localStorage.clear()
      navigate("/login")
}

      
return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 flex flex-col justify-between p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold mb-4">Minhas Tasks</h2>
          <button className="text-left px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-700" onClick={() => fetchTasks('')}>Todas</button>
          <button className="text-left px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-700" onClick={() => fetchTasks('COMPLETED')}>Completas</button>
          <button className="text-left px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-700" onClick={() => fetchTasks('PENDING')}>Pendentes</button>
        </div>
        <div>
          <p className="text-gray-300 font-semibold">{user.name}</p>
          <p className="text-gray-500 text-sm mb-3" >{user.email}</p>
          <button onClick={handleLogout} className="w-full bg-red-600 cursor-pointer hover:bg-red-700 py-2 rounded-lg transition">
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <button onClick={() => setCreateModal(true)} className="bg-blue-600 cursor-pointer hover:bg-blue-700 px-4 py-2 rounded-lg transition font-semibold">
            + Nova Task
          </button>
        </div>

        {/* Grid de tasks */}
      <div className="grid grid-cols-3 gap-4">
      {tasks.map(task => (
        <div key={task.id} onClick={() => setSelectedTask(task)} className="bg-gray-800 rounded-xl p-4 cursor-pointer hover:bg-gray-700 transition flex justify-between items-center">
          <span>{task.title}</span>
          <div onClick={(e) => { e.stopPropagation(); handleToggleStatus(task); }}>
            <input type="checkbox" checked={task.status === 'COMPLETED'} onChange={() => {}} className="accent-indigo-600 h-4 w-4 cursor-pointer" />
          </div>
        </div>
      ))}
      {tasks.length === 0 && <p className="text-gray-400">{user.name}, você não possui nenhuma task por aqui :)</p>}
      </div>
      </div>
      {/* Modal criar task */}
      {createModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-lg flex flex-col gap-4">
            <h2 className="text-xl font-bold">Nova Task</h2>
            <input type="text" value={title} onChange={handleChangeTitle} placeholder="Título"
              className="bg-gray-700 placeholder-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
            <textarea type="text" value={description} onChange={handleChangeDescription} placeholder="Descrição"
              className="bg-gray-700 placeholder-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
            <div className="flex gap-3">
              <button onClick={handleCreate} className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition font-semibold">Criar</button>
              <button onClick={() => {setCreateModal(false); setTitle(''); setDescription('')}} className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg transition">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal detalhe da task */}
      {selectedTask && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-2xl flex flex-col gap-4">
        {isEditing 
          ? <input type="text" value={editTitle} onChange={handleChangeEditTitle}
              className="bg-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-xl font-bold" />
          : <h2 className="text-xl font-bold">{selectedTask.title}</h2>
        }
        <p className="text-gray-400 font-bold">Descrição:</p>
        {isEditing
          ? <textarea value={editDescription} onChange={handleChangeEditDescription}
              className="bg-gray-700 placeholder-gray-400 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500" />
          : <p className="text-gray-400 whitespace-pre-wrap break-words">{selectedTask.description}</p>
        }
        <div className="flex gap-3">
          <button onClick={() => handleDelete(selectedTask.id)} className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg transition">Deletar</button>
          {isEditing
            ? <button onClick={() => handleSave(selectedTask.id)} className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg transition">Salvar</button>
            : <button onClick={() => {handleEdit(selectedTask); setIsEditing(true)}} className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition">Editar</button>
          }
          <button onClick={() => {setSelectedTask(null); setIsEditing(false)}} className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded-lg transition">Fechar</button>
        </div>
      </div>
    </div>
)}
    </div>
  )
}

export default Tasks