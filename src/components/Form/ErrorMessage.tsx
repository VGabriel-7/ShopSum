export interface ErrorMessageProps {
  error?: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return error && <span className="text-xs text-red-500">{error}</span>;
}