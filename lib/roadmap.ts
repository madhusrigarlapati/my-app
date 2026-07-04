import { getSql } from "@/lib/db";

export type Status = "todo" | "in_progress" | "done";

export type PhaseProgress = {
  code: string;
  title: string;
  total: number;
  done: number;
  inProgress: number;
  todo: number;
  pct: number;
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

function normalizeStatus(status: string): Status {
  if (status === "done" || status === "in_progress") return status;
  return "todo";
}

export async function getRoadmapProgress(): Promise<RoadmapProgress> {
  const sql = getSql();

  const phaseRows = (await sql`
    SELECT code, title, sort_order
    FROM version1
    WHERE level = 'phase'
    ORDER BY sort_order
  `) as { code: string; title: string; sort_order: number }[];

  const taskRows = (await sql`
    SELECT parent_code, status
    FROM version1
    WHERE level = 'task'
  `) as { parent_code: string; status: string }[];

  const phases: PhaseProgress[] = phaseRows.map((phase) => {
    const tasks = taskRows.filter((t) => t.parent_code === phase.code);
    const total = tasks.length;
    const done = tasks.filter((t) => normalizeStatus(t.status) === "done").length;
    const inProgress = tasks.filter(
      (t) => normalizeStatus(t.status) === "in_progress"
    ).length;
    const todo = total - done - inProgress;
    const pct = total === 0 ? 0 : Math.round((done / total) * 100);
    return { code: phase.code, title: phase.title, total, done, inProgress, todo, pct };
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
