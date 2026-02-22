"use client";

// hooks
import { useTasks } from "@/app/hooks/useTasks";
import { useAddTask } from "@/app/hooks/useAddTask";

// ui
import { X, PlusIcon } from "@/app/components/ui/icons";

// components
import { TaskRow } from "@/app/components/TaskManager/TaskRow";

export function TaskManager() {
  const { tasks, loading, addTask, toggleTaskDone, deleteTask } = useTasks();

  const {
    isAdding,
    setIsAdding,
    newTaskTitle,
    setNewTaskTitle,
    newTaskDescription,
    setNewTaskDescription,
    newTaskDue,
    setNewTaskDue,
    handleAddSubmit,
  } = useAddTask(addTask);

  // filter tasks
  const pendingTasks = tasks.filter((t) => !t.is_done);
  const completedTasks = tasks.filter((t) => t.is_done);

  return (
    <div className="col-span-1 lg:col-span-3">
      <div className="flex flex-col rounded-2xl border-2 border-gray-100 p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">My Tasks</h2>
            <p className="text-sm text-gray-500">
              {pendingTasks.length} pending, {completedTasks.length} completed
            </p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-95"
          >
            {isAdding ? <X size={18} /> : <PlusIcon />}
            {isAdding ? "Cancel" : "Add Task"}
          </button>
        </div>

        {/* Add Task Form */}
        {isAdding && (
          <form
            onSubmit={handleAddSubmit}
            className="mb-6 flex flex-col gap-3 rounded-xl p-4"
          >
            <input
              type="text"
              placeholder="Title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              autoFocus
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="flex items-center justify-between">
              <input
                type="date"
                value={newTaskDue}
                onChange={(e) => setNewTaskDue(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 outline-none focus:border-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-gray-300"
              />
              <button
                type="submit"
                disabled={!newTaskTitle.trim()}
                className="rounded-md bg-gray-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </form>
        )}

        {/* Task List */}
        {loading ? (
          <div className="py-8 text-center text-sm text-gray-500">
            Loading tasks...
          </div>
        ) : tasks.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
            No tasks yet. Enjoy your day!
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {/* pending tasks */}
            {pendingTasks.map((task) => (
              <TaskRow
                key={task.id}
                task={task}
                onToggle={() => toggleTaskDone(task.id, task.is_done)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}

            {/* completed tasks */}
            {completedTasks.length > 0 && (
              <>
                <h3 className="mt-4 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  Completed
                </h3>
                {completedTasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTaskDone(task.id, task.is_done)}
                    onDelete={() => deleteTask(task.id)}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
