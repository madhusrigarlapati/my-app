import type { Metadata } from "next";
import Gauge from "@/components/progress/Gauge";
import PhaseBar from "@/components/progress/PhaseBar";
import TaskTree from "@/components/progress/TaskTree";
import { getRoadmapProgress } from "@/lib/roadmap";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Build Progress",
  description: "Live progress on the Calc Suite feature roadmap.",
  robots: { index: false, follow: false },
};

export default async function ProgressPage() {
  const { phases, overall } = await getRoadmapProgress();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-4 py-10">
      <style>{`
        .progress-viz {
          --track: #e1e0d9;
          --gauge-fill: #2a78d6;
          --status-good: #0ca30c;
          --status-warning: #fab219;
          --status-todo: #c3c2b7;
        }
        .dark .progress-viz {
          --track: #2c2c2a;
          --gauge-fill: #3987e5;
          --status-good: #0ca30c;
          --status-warning: #fab219;
          --status-todo: #383835;
        }
      `}</style>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
          Build Progress
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Live status of the roadmap stored in the <code>version1</code> table &mdash;{" "}
          {overall.total} tasks across {phases.length} phases.
        </p>
      </div>

      <div className="flex flex-col items-center gap-6 rounded-xl border border-neutral-200 p-6 dark:border-neutral-800 sm:flex-row sm:justify-around">
        <Gauge pct={overall.pct} label="Overall complete" />
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="flex flex-col gap-1">
            <span
              className="text-2xl font-semibold text-[#0ca30c]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {overall.done}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">Done</span>
          </div>
          <div className="flex flex-col gap-1">
            <span
              className="text-2xl font-semibold text-[#c98500] dark:text-[#fab219]"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {overall.inProgress}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              In progress
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span
              className="text-2xl font-semibold text-neutral-500 dark:text-neutral-400"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {overall.todo}
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">To do</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            By phase
          </h2>
          <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#0ca30c]" />
              Done
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#fab219]" />
              In progress
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
              To do
            </span>
          </div>
        </div>
        {phases.map((phase) => (
          <details
            key={phase.code}
            open={phase.done > 0 && phase.done < phase.total}
            className="group rounded-xl border border-neutral-200 dark:border-neutral-800"
          >
            <summary className="cursor-pointer list-none px-4 py-3 marker:content-none">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <PhaseBar phase={phase} />
                </div>
                <span className="shrink-0 text-neutral-400 transition-transform group-open:rotate-180">
                  &darr;
                </span>
              </div>
            </summary>
            <div className="border-t border-neutral-200 px-4 py-3 dark:border-neutral-800">
              <TaskTree tasks={phase.tasks} />
            </div>
          </details>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Table view
        </h2>
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-200 text-left text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                <th className="px-4 py-2 font-medium">Phase</th>
                <th className="px-4 py-2 font-medium">Total</th>
                <th className="px-4 py-2 font-medium">Done</th>
                <th className="px-4 py-2 font-medium">In progress</th>
                <th className="px-4 py-2 font-medium">To do</th>
                <th className="px-4 py-2 font-medium">% complete</th>
              </tr>
            </thead>
            <tbody>
              {phases.map((phase) => (
                <tr
                  key={phase.code}
                  className="border-b border-neutral-100 last:border-0 dark:border-neutral-900"
                >
                  <td className="px-4 py-2 text-neutral-900 dark:text-neutral-100">
                    {phase.title}
                  </td>
                  <td className="px-4 py-2 tabular-nums text-neutral-700 dark:text-neutral-300">
                    {phase.total}
                  </td>
                  <td className="px-4 py-2 tabular-nums text-neutral-700 dark:text-neutral-300">
                    {phase.done}
                  </td>
                  <td className="px-4 py-2 tabular-nums text-neutral-700 dark:text-neutral-300">
                    {phase.inProgress}
                  </td>
                  <td className="px-4 py-2 tabular-nums text-neutral-700 dark:text-neutral-300">
                    {phase.todo}
                  </td>
                  <td className="px-4 py-2 tabular-nums text-neutral-700 dark:text-neutral-300">
                    {phase.pct}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
