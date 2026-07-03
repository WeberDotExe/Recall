import { useEffect, useState } from "react";
import { LoaderCircle, Save } from "lucide-react";
import useAxiosPrivate from "../../hooks/UseAxiosPrivate";

function EditNoteForm({ noteId, initialNote, onClose, onSuccess }) {
  const axiosPrivate = useAxiosPrivate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    title: "",
    description: "",
  });

  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setTitle(initialNote?.title || "");
    setDescription(initialNote?.description || "");
  }, [initialNote]);

  const validateForm = () => {
    const errors = {
      title: "",
      description: "",
    };

    let isValid = true;

    if (!title.trim()) {
      errors.title = "Title is required.";
      isValid = false;
    } else if (title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters.";
      isValid = false;
    } else if (title.trim().length > 100) {
      errors.title = "Title must be under 100 characters.";
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = "Description is required.";
      isValid = false;
    } else if (description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters.";
      isValid = false;
    } else if (description.trim().length > 5000) {
      errors.description = "Description must be under 5000 characters.";
      isValid = false;
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitError("");

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      await axiosPrivate.patch(`/notes/${noteId}`, {
        title: title.trim(),
        description: description.trim(),
      });

      onSuccess?.();
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message ||
          "Failed to update note. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="edit-note-title"
          className="text-sm font-medium text-[var(--color-text-primary)]"
        >
          Note title
        </label>

        <input
          id="edit-note-title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (fieldErrors.title) {
              setFieldErrors((prev) => ({ ...prev, title: "" }));
            }
          }}
          placeholder="e.g. Ideas for Recall dashboard improvements"
          className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-indigo-300/25 focus:ring-4 focus:ring-indigo-400/10"
        />

        {fieldErrors.title && (
          <p className="text-sm text-red-300">{fieldErrors.title}</p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="edit-note-description"
          className="text-sm font-medium text-[var(--color-text-primary)]"
        >
          Description
        </label>

        <textarea
          id="edit-note-description"
          rows={8}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (fieldErrors.description) {
              setFieldErrors((prev) => ({ ...prev, description: "" }));
            }
          }}
          placeholder="Write the full note here..."
          className="w-full resize-none rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 text-sm leading-7 text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-indigo-300/25 focus:ring-4 focus:ring-indigo-400/10"
        />

        <div className="flex items-center justify-between gap-3">
          {fieldErrors.description ? (
            <p className="text-sm text-red-300">{fieldErrors.description}</p>
          ) : (
            <p className="text-xs text-[var(--color-text-muted)]">
              Keep the note specific enough so it’s searchable later.
            </p>
          )}

          <span className="shrink-0 text-xs text-[var(--color-text-muted)]">
            {description.trim().length}/5000
          </span>
        </div>
      </div>

      {submitError && (
        <div className="rounded-2xl border border-red-400/15 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {submitError}
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition hover:border-white/15 hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-accent)] px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default EditNoteForm;