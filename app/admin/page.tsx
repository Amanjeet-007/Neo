"use client";

import { useState } from "react";
import AdminProjectForm from "@/components/AdminProjectForm";

export default function AdminPage() {
  const [passcode, setPasscode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  async function unlock(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError("");
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode }),
    });
    setChecking(false);
    if (res.ok) setUnlocked(true);
    else setError("That passcode is not correct.");
  }

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-sm px-5 py-20">
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="mt-2 text-sm text-muted">
          Enter the admin passcode, or sign in with an admin account and leave it empty.
        </p>
        <form onSubmit={unlock} className="mt-6 space-y-3">
          <label htmlFor="passcode" className="block text-sm font-medium">Passcode</label>
          <input
            id="passcode"
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            autoComplete="current-password"
            className="w-full rounded border border-line bg-surface px-3 py-2 text-sm"
          />
          {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={checking}
            className="rounded bg-accent px-4 py-2 text-sm font-medium text-accent-ink hover:opacity-90 disabled:opacity-60"
          >
            {checking ? "Checking…" : "Unlock"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8 flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Add a project</h1>
        <button
          onClick={() => {
            setUnlocked(false);
            setPasscode("");
          }}
          className="text-sm text-muted hover:text-ink"
        >
          Lock
        </button>
      </div>
      <p className="mb-8 max-w-[60ch] text-sm text-muted">
        Documentation is not edited here. To add or change docs, edit the markdown files in{" "}
        <code className="font-mono">content/docs/</code>.
      </p>
      <AdminProjectForm passcode={passcode} />
    </div>
  );
}
