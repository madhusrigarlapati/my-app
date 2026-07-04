import { getSql } from "@/lib/db";

export type Status = "todo" | "in_progress" | "done";

export type TaskNode = {
  code: string;
  title: string;
  status: Status;
  children: TaskNode[];
};

export type PhaseProgress = {
  code: string;
  title: string;
  total: number;
  done: number;
  inProgress: number;
  todo: number;
  pct: number;
  tasks: TaskNode[];
};

export type RoadmapProgress = {
  phases: PhaseProgress[];
  overall: {
    total: number;
    done: number;
    inProgress: number;
    todo: number;
    pct: number;
  };
};

type Row = {
  code: string;
  parent_code: string | null;
  title: string;
  status: string;
};

function normalizeStatus(status: string): Status {
  if (status === "done" || status === "in_progress") return status;
  return "todo";
}

export async function getRoadmapProgress(): Promise<RoadmapProgress> {
  const sql = getSql();

  const rows = (await sql`
    SELECT code, parent_code, title, status
    FROM version1
    ORDER BY sort_order
  `) as Row[];

  const byParent = new Map<string, Row[]>();
  for (const row of rows) {
    const key = row.parent_code ?? "";
    const siblings = byParent.get(key) ?? [];
    siblings.push(row);
    byParent.set(key, siblings);
  }

  function buildChildren(parentCode: string): TaskNode[] {
    const children = byParent.get(parentCode) ?? [];
    return children.map((child) => ({
      code: child.code,
      title: child.title,
      status: normalizeStatus(child.status),
      children: buildChildren(child.code),
    }));
  }

  const phaseRows = byParent.get("") ?? [];

  const phases: PhaseProgress[] = phaseRows.map((phase) => {
    const tasks = buildChildren(phase.code);
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const inProgress = tasks.filter((t) => t.status === "in_progress").length;
    const todo = total - done - inProgress;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return { code: phase.code, title: phase.title, total, done, inProgress, todo, pct, tasks };
  });

  const overallTotal = phases.reduce((sum, p) => sum + p.total, 0);
  const overallDone = phases.reduce((sum, p) => sum + p.done, 0);
  const overallInProgress = phases.reduce((sum, p) => sum + p.inProgress, 0);
  const overallTodo = phases.reduce((sum, p) => sum + p.todo, 0);
  const overallPct =
    overallTotal === 0 ? 0 : Math.round((overallDone / overallTotal) * 100);

  return {
    phases,
    overall: {
      total: overallTotal,
      done: overallDone,
      inProgress: overallInProgress,
      todo: overallTodo,
      pct: overallPct,
    },
  };
}
