import React, {useState} from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [tasks, setTasks] = useState([]);

    const handleClick = (val) =>{
        setShow(val);
    }

    // add new task
    const handleTask = e => {
        e.preventDefault();
        const form = e.target;
        const task = form.task.value;
        const status = form.status.value;
        if (task !== '' && status !== '') {
            const newTask = {
                id: tasks.length + 1, 
                task,
                status,
            };
            setTasks([...tasks, newTask]);
            form.task.value = '';
            form.status.value = '';
        }
    }

    // sort all tasks
    const sortedTasks = [...tasks].sort((a, b) => {
        const statusOrder = { active: 1, completed: 2, pending: 3, archive: 4, other: 5 };
        return statusOrder[a.status] - statusOrder[b.status];
    });

    // filter task with status
    const filteredTasks = show === 'all' ? sortedTasks : sortedTasks.filter((task) => task.status === show);

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form onSubmit={handleTask} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input type="text" name="task" className="form-control" placeholder="Name"/>
                        </div>
                        <div className="col-auto">
                            <input type="text" name="status" className="form-control" placeholder="Status"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.task}</td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;