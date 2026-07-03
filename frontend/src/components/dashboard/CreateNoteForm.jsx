import { useState } from "react";
import { LoaderCircle, Plus } from "lucide-react";
import useAxiosPrivate from "../../hooks/UseAxiosPrivate";

const initialForm = {
  title: "",
  description: "",
};

function CreateNoteForm({ onClose, onSuccess }) {
  const axiosPrivate = useAxiosPrivate();

  const [formData, setFormData] = useState(initialForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (apiError) {
      setApiError("");
    }
  };

  const validateForm = () => {
    const errors = {};

    const trimmedTitle = formData.title.trim();
    const trimmedDescription = formData.description.trim();

    if (!trimmedTitle) {
      errors.title = "Title is required";
    }

    if (!trimmedDescription) {
      errors.description = "Description is required";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setFormData(initialForm);
    setFieldErrors({});
    setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setApiError("");

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
      };

      const response = await axiosPrivate.post("/notes", payload);
      const createdNote = response.data?.note || null;

      resetForm();
      onSuccess?.(createdNote);
      onClose?.();
    } catch (error) {
      setApiError(
        error?.response?.data?.message ||
          "Failed to create note. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="title"
          className="text-sm font-medium text-[var(--color-text-primary)]"
        >
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. React auth refresh flow"
          className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-indigo-400/40 focus:ring-4 focus:ring-indigo-500/10"
        />

        {fieldErrors.title ? (
          <p className="text-sm text-red-300">{fieldErrors.title}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="text-sm font-medium text-[var(--color-text-primary)]"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          rows={8}
          value={formData.description}
          onChange={handleChange}
          placeholder="Write the actual note here..."
          className="min-h-[180px] w-full resize-y rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 text-sm leading-6 text-[var(--color-text-primary)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-indigo-400/40 focus:ring-4 focus:ring-indigo-500/10"
        />

        {fieldErrors.description ? (
          <p className="text-sm text-red-300">{fieldErrors.description}</p>
        ) : null}
      </div>

      {apiError ? (
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {apiError}
        </div>
      ) : null}

      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-end">
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
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Create note
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateNoteForm;