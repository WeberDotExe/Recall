import { useEffect, useState } from "react";
import { LoaderCircle, SearchX, TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import NotesToolbar from "../../components/dashboard/NotesToolbar";
import NoteCard from "../../components/dashboard/NoteCard";
import NotesPagination from "../../components/dashboard/NotesPagination";

import useAuth from "../../hooks/UseAuth";
import useDebounce from "../../hooks/UseDebounce";
import useAxiosPrivate from "../../hooks/UseAxiosPrivate";

import { logout } from "../../api/auth.api";

function Dashboard() {
  const navigate = useNavigate();
  const { clearAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("-createdAt");

  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalNotes, setTotalNotes] = useState(0);
  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchNotes = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiosPrivate.get("/notes", {
          params: {
            page: currentPage,
            search: debouncedSearch.trim() || undefined,
            sort,
          },
          signal: controller.signal,
        });

        const data = response.data;

        if (!isMounted) return;

        setNotes(data?.notes || []);
        setCurrentPage(data?.currentPage || 1);
        setTotalPages(data?.totalPages || 1);
        setTotalNotes(data?.totalNotes || 0);
        setCount(data?.count || 0);
      } catch (err) {
        if (!isMounted) return;

        // Ignore aborted request noise
        if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED") {
          return;
        }

        setError(
          err?.response?.data?.message ||
            "Failed to load notes. Please try again."
        );
        setNotes([]);
        setTotalPages(1);
        setTotalNotes(0);
        setCount(0);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNotes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [ currentPage, debouncedSearch, sort]);

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSort(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page === currentPage) return;
    setCurrentPage(page);
  };

  const handleCreateClick = () => {
    console.log("Open create note modal here");
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      clearAuth();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="page-container py-5 sm:py-6 lg:py-10">
        <div className="space-y-5 sm:space-y-6">
          <DashboardHeader onLogout={handleLogout} />

          <NotesToolbar
            search={search}
            sort={sort}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            onCreateClick={handleCreateClick}
          />

          {!loading && !error && (
            <div className="flex flex-col gap-2 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[var(--color-text-secondary)]">
                {totalNotes} total notes
              </p>

              <p className="text-sm text-[var(--color-text-muted)]">
                Showing {count} {count === 1 ? "note" : "notes"} on page{" "}
                {currentPage}
              </p>
            </div>
          )}

          {loading ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)]/90 px-6 py-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-indigo-300/15 bg-indigo-300/[0.08] text-indigo-200">
                <LoaderCircle className="h-7 w-7 animate-spin" />
              </div>

              <h2 className="mt-5 text-xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                Loading your notes
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-[var(--color-text-secondary)]">
                Fetching your workspace and syncing the latest notes.
              </p>
            </div>
          ) : error ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[24px] border border-red-400/15 bg-[var(--color-surface)]/90 px-6 py-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-red-400/15 bg-red-400/[0.08] text-red-300">
                <TriangleAlert className="h-7 w-7" />
              </div>

              <h2 className="mt-5 text-xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                Couldn&apos;t load notes
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-[var(--color-text-secondary)]">
                {error}
              </p>
            </div>
          ) : notes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} />
                ))}
              </div>

              <NotesPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalNotes={totalNotes}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)]/90 px-5 py-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] sm:min-h-[320px] sm:px-6 sm:py-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-indigo-300/15 bg-indigo-300/[0.08] text-indigo-200 sm:h-16 sm:w-16">
                <SearchX className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>

              <h2 className="mt-5 text-xl font-semibold tracking-tight text-[var(--color-text-primary)] sm:mt-6 sm:text-2xl">
                {search.trim() ? "No matching notes found" : "No notes yet"}
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-[var(--color-text-secondary)] sm:leading-7">
                {search.trim()
                  ? "We couldn’t find notes matching your search. Try a different keyword or clear the search."
                  : "Your workspace is empty right now. Create your first note to start building your Recall workspace."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;