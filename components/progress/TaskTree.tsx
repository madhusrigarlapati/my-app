import type { TaskNode } from "@/lib/roadmap";

const STATUS_LABEL: Record<TaskNode["status"], string> = {
  done: "Done",
  in_progress: "In progress",
  todo: "To do",
};

const STATUS_COLOR: Record<TaskNode["status"], string> = {
  done: "bg-[var(--status-good)]",
  in_progress: "bg-[var(--status-warning)]",
  todo: "bg-[var(--status-todo)]",
};

function TaskItem({ node, depth }: { node: TaskNode; depth: number }) {
  return (
    <li>
      <div
        className="flex items-center gap-2 py-1"
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        <span
          className={`inline-block h-2 w-2 shrink-0 rounded-full ${STATUS_COLOR[node.status]}`}
          aria-hidden
        />
        <span className="sr-only">{STATUS_LABEL[node.status]}</span>
        <span
          className={
            node.status === "done"
              ? "text-sm text-neutral-500 dark:text-neutral-500"
              : "text-sm text-neutral-800 dark:text-neutral-200"
          }
        >
          {node.title}
        </span>
      </div>
      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <TaskItem key={child.code} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function TaskTree({ tasks }: { tasks: TaskNode[] }) {
  if (tasks.length === 0) return null;

  return (
    <ul className="progress-viz flex flex-col">
      {tasks.map((task) => (
        <TaskItem key={task.code} node={task} depth={0} />
      ))}
    </ul>
  );
}
