import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Clock3,
  Lock,
  Mail,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { loginUser } from "../../api/auth.api";
import useAuth from "../../hooks/authHookTemp";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/dashboard";
  const { setAuth } = useAuth();

  const [apiError, setApiError] = useState("");

  const from = location.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    setApiError("");

    try {
      const response = await loginUser(formData);

      setAuth({
        user: response.user,
        accessToken: response.accessToken,
      });

      navigate(from, { replace: true });
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-24 h-88 w-88 rounded-full bg-indigo-500/16 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-sky-300/8 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-400/8 blur-3xl" />
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
                <p className="text-sm text-(--color-text-secondary)">
                  Notes that stay clear even when your thoughts aren’t.
                </p>
              </div>
            </div>

            <div className="max-w-2xl space-y-4">
              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight">
                A cleaner place to capture, search, and shape your notes.
              </h1>

              <p className="max-w-xl text-base leading-7 text-(--color-text-secondary)">
                Built for focused work: write notes quickly, search them fast,
                sort through them cleanly, and keep your thinking in one calm
                workspace.
              </p>
            </div>

            {/* REALISTIC APP PREVIEW */}
            <div className="relative mt-10">
              <div className="absolute inset-0 rounded-4xl bg-indigo-500/10 blur-2xl" />

              <div className="surface-card relative overflow-hidden rounded-4xl p-4">
                {/* app top bar */}
                <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/6 bg-black/10 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">My Notes</p>
                    <p className="text-xs text-(--color-text-muted)">
                      Search, sort, and manage your saved notes
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-2xl border border-indigo-300/20 bg-indigo-300/8 px-3 py-2 text-sm font-medium text-indigo-200"
                  >
                    <Plus className="h-4 w-4" />
                    New Note
                  </button>
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  {/* notes list preview */}
                  <div className="rounded-[26px] border border-white/6 bg-black/10 p-4">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm text-(--color-text-muted)">
                        <Search className="h-4 w-4" />
                        Search notes...
                      </div>

                      <button
                        type="button"
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.035] text-(--color-text-secondary)"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-2xl border border-indigo-400/20 bg-[linear-gradient(135deg,rgba(109,124,255,0.14),rgba(56,189,248,0.05))] p-4 shadow-[0_0_0_1px_rgba(109,124,255,0.08)]">
                        <div className="mb-2 flex items-start justify-between gap-4">
                          <h3 className="font-semibold tracking-tight">
                            React architecture notes
                          </h3>
                          <span className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-indigo-200">
                            Recent
                          </span>
                        </div>

                        <p className="text-sm leading-6 text-(--color-text-secondary)">
                          Separate UI, state, and API concerns. Keep auth state
                          centralized and let interceptors handle token refresh.
                        </p>

                        <div className="mt-3 flex items-center gap-3 text-xs text-(--color-text-muted)">
                          <span className="inline-flex items-center gap-1">
                            <Clock3 className="h-3.5 w-3.5" />
                            Updated 2h ago
                          </span>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
                        <div className="mb-2 flex items-start justify-between gap-4">
                          <h3 className="font-medium">JWT auth flow</h3>
                          <span className="text-xs text-(--color-text-muted)">
                            Today
                          </span>
                        </div>

                        <p className="text-sm leading-6 text-(--color-text-secondary)">
                          Access token in memory, refresh token in cookie, retry
                          original request after refresh succeeds.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
                        <div className="mb-2 flex items-start justify-between gap-4">
                          <h3 className="font-medium">Backend interview prep</h3>
                          <span className="text-xs text-(--color-text-muted)">
                            Yesterday
                          </span>
                        </div>

                        <p className="text-sm leading-6 text-(--color-text-secondary)">
                          Event loop, streams, clustering, rate limiting, and
                          production API design notes.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* side summary preview */}
                  <div className="rounded-[26px] border border-white/6 bg-black/10 p-4">
                    <div className="mb-4">
                      <p className="text-sm font-medium">Quick overview</p>
                      <p className="mt-1 text-xs text-(--color-text-muted)">
                        A focused workspace for your saved thinking
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-indigo-200/80">
                          Search
                        </p>
                        <p className="mt-2 text-sm leading-6 text-(--color-text-secondary)">
                          Find notes instantly using keyword search.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-300/80">
                          Sort
                        </p>
                        <p className="mt-2 text-sm leading-6 text-(--color-text-secondary)">
                          Organize by title or latest updates without clutter.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-sky-200/80">
                          Manage
                        </p>
                        <p className="mt-2 text-sm leading-6 text-(--color-text-secondary)">
                          Create, edit, and delete notes from one clean dashboard.
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
            <Card className="relative w-full max-w-md overflow-hidden rounded-[30px] border-(--color-border-strong) p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_70%)]" />

              <div className="relative space-y-8">
                <div className="flex items-center gap-3 lg:hidden">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10">
                    <Brain className="h-5 w-5 text-indigo-300" />
                  </div>

                  <div>
                    <p className="text-lg font-semibold tracking-tight">
                      Recall
                    </p>
                    <p className="text-xs text-(--color-text-secondary)">
                      Minimal notes for focused work
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-300/8 px-3 py-1.5 text-xs font-medium text-indigo-200">
                    <span className="h-2 w-2 rounded-full bg-indigo-300" />
                    Secure login
                  </div>

                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight">
                      Welcome back
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-(--color-text-secondary)">
                      Log in to continue writing, editing, and organizing your
                      notes.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                    placeholder="Enter your password"
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
                      {isSubmitting ? "Logging in..." : "Login to Recall"}
                    </span>

                    {!isSubmitting && (
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    )}
                  </Button>
                </form>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs uppercase tracking-[0.22em] text-(--color-text-muted)">
                      New to Recall?
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <p className="text-center text-sm text-(--color-text-secondary)">
                    Don&apos;t have an account?{" "}
                    <Link
                      to="/register"
                      className="font-medium text-indigo-200 transition hover:text-indigo-100"
                    >
                      Create one
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

export default Login;