import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Clock3,
  Lock,
  Mail,
  Plus,
  Search,
  SlidersHorizontal,
  User,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { registerUser } from "../../api/auth.api";
import useAuth from "../../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    setApiError("");

    try {
      const response = await registerUser(formData);

      setAuth({
        user: response.user,
        accessToken: response.accessToken,
      });

      navigate("/dashboard");
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-[-6rem] h-[22rem] w-[22rem] rounded-full bg-indigo-500/16 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-6rem] h-[20rem] w-[20rem] rounded-full bg-sky-300/8 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-[16rem] w-[16rem] -translate-x-1/2 rounded-full bg-violet-400/8 blur-3xl" />
      </div>

      <div className="page-container relative flex min-h-screen items-center py-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* LEFT PANEL */}
          <div className="hidden lg:block">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10 shadow-[0_0_40px_rgba(109,124,255,0.15)]">
                <Brain className="h-6 w-6 text-indigo-300" />
              </div>

              <div>
                <p className="text-2xl font-semibold tracking-tight">Recall</p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Build a calmer workspace for your notes and ideas.
                </p>
              </div>
            </div>

            <div className="max-w-2xl space-y-4">
              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight">
                Start your workspace with a cleaner notes system.
              </h1>

              <p className="max-w-xl text-base leading-7 text-[var(--color-text-secondary)]">
                Capture ideas, organize your notes, search what matters, and
                keep everything in one focused place built for everyday work.
              </p>
            </div>

            {/* PRODUCT PREVIEW */}
            <div className="relative mt-10">
              <div className="absolute inset-0 rounded-[32px] bg-indigo-500/10 blur-2xl" />

              <div className="surface-card relative overflow-hidden rounded-[32px] p-4">
                {/* app top bar */}
                <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/6 bg-black/10 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">Getting started</p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      Your notes dashboard, ready from day one
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-2xl border border-indigo-300/20 bg-indigo-300/[0.08] px-3 py-2 text-sm font-medium text-indigo-200"
                  >
                    <Plus className="h-4 w-4" />
                    New Note
                  </button>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  {/* notes list preview */}
                  <div className="rounded-[26px] border border-white/6 bg-black/10 p-4">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm text-[var(--color-text-muted)]">
                        <Search className="h-4 w-4" />
                        Search notes...
                      </div>

                      <button
                        type="button"
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.035] text-[var(--color-text-secondary)]"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-2xl border border-indigo-400/20 bg-[linear-gradient(135deg,rgba(109,124,255,0.14),rgba(95,168,255,0.05))] p-4 shadow-[0_0_0_1px_rgba(109,124,255,0.08)]">
                        <div className="mb-2 flex items-start justify-between gap-4">
                          <h3 className="font-semibold tracking-tight">
                            First week planning
                          </h3>
                          <span className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-indigo-200">
                            New
                          </span>
                        </div>

                        <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                          Break goals into small steps, track important ideas,
                          and keep your notes organized from the start.
                        </p>

                        <div className="mt-3 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                          <span className="inline-flex items-center gap-1">
                            <Clock3 className="h-3.5 w-3.5" />
                            Created just now
                          </span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <div className="mb-2 flex items-start justify-between gap-4">
                          <h3 className="font-medium">Backend roadmap notes</h3>
                          <span className="text-xs text-[var(--color-text-muted)]">
                            Draft
                          </span>
                        </div>

                        <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                          Keep project plans, API ideas, and architecture notes
                          in one clean dashboard.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <div className="mb-2 flex items-start justify-between gap-4">
                          <h3 className="font-medium">React UI polish tasks</h3>
                          <span className="text-xs text-[var(--color-text-muted)]">
                            Today
                          </span>
                        </div>

                        <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
                          Track improvements, refine flows, and keep your app
                          decisions easy to revisit.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* side summary preview */}
                  <div className="rounded-[26px] border border-white/6 bg-black/10 p-4">
                    <div className="mb-4">
                      <p className="text-sm font-medium">Why Recall</p>
                      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        A focused space for your everyday notes
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-indigo-200/80">
                          Capture
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                          Write down ideas, tasks, and project notes without
                          clutter.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-300/80">
                          Organize
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                          Sort and manage your notes cleanly as your workspace
                          grows.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-sky-200/80">
                          Revisit
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                          Search and return to important thoughts whenever you
                          need them.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex items-center justify-center">
            <Card className="relative w-full max-w-md overflow-hidden rounded-[30px] border-[var(--color-border-strong)] p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(124,137,255,0.18),transparent_70%)]" />

              <div className="relative space-y-8">
                <div className="flex items-center gap-3 lg:hidden">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10">
                    <Brain className="h-5 w-5 text-indigo-300" />
                  </div>

                  <div>
                    <p className="text-lg font-semibold tracking-tight">
                      Recall
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      Minimal notes for focused work
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-300/[0.08] px-3 py-1.5 text-xs font-medium text-indigo-200">
                    <span className="h-2 w-2 rounded-full bg-indigo-300" />
                    Create your account
                  </div>

                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight">
                      Create your Recall account
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                      Set up your workspace and start capturing, organizing, and
                      managing your notes in one place.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <Input
                    label="Name"
                    type="text"
                    placeholder="Enter your name"
                    registration={register("name", {
                      required: "Name is required",
                    })}
                    error={errors.name}
                    leftIcon={<User className="h-4 w-4" />}
                  />

                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    registration={register("email", {
                      required: "Email is required",
                    })}
                    error={errors.email}
                    leftIcon={<Mail className="h-4 w-4" />}
                  />

                  <Input
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                    registration={register("password", {
                      required: "Password is required",
                    })}
                    error={errors.password}
                    leftIcon={<Lock className="h-4 w-4" />}
                  />

                  {apiError && (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      {apiError}
                    </div>
                  )}

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    className="group h-12 text-sm font-semibold"
                  >
                    <span>
                      {isSubmitting
                        ? "Creating account..."
                        : "Create your account"}
                    </span>

                    {!isSubmitting && (
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    )}
                  </Button>
                </form>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                      Already have an account?
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <p className="text-center text-sm text-[var(--color-text-secondary)]">
                    Already registered?{" "}
                    <Link
                      to="/login"
                      className="font-medium text-indigo-200 transition hover:text-indigo-100"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;