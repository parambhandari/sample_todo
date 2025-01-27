import React, { useState } from "react";

const Task = ({ task, onUpdate }) => {
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = (event) => {
    const updatedTask = { ...task, status: event.target.value };
    setStatus(event.target.value);
    onUpdate(updatedTask);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
    
      <div className="mb-4">
        <span className="text-sm font-semibold text-gray-500">Assigned To:</span>
        <p className="text-base font-medium text-gray-800 mt-1">
          {task.assignedTo
            ? `${task.assignedTo.firstName} ${task.assignedTo.lastName}`
            : "Not Assigned"}
        </p>
      </div>

    
      <div className="mb-4">
        <span className="text-sm font-semibold text-gray-500">Title:</span>
        <p className="text-base font-medium text-gray-800 mt-1">{task.title}</p>
      </div>

    
      <div className="mb-4">
        <span className="text-sm font-semibold text-gray-500">
          Description:
        </span>
        <p className="text-base text-gray-700 mt-1">{task.description}</p>
      </div>

    
      <div className="mb-6">
        <span className="text-sm font-semibold text-gray-500">Status:</span>
        {status === "pending" ? (
          <select
            value={status}
            onChange={handleStatusChange}
            className="border border-gray-300 px-3 py-2 rounded-md bg-gray-50 text-sm mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        ) : (
          <p
            className={`mt-1 inline-block px-3 py-1 rounded-full text-xs font-medium ${
              status === "pending"
                ? "bg-yellow-200 text-yellow-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            {status}
          </p>
        )}
      </div>

   
    </div>
  );
};

export default Task;
