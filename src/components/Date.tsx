import { parseISO, format } from "date-fns";

export default function Date({ dateString }: { dateString: string }) {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} className="text-sm text-gray-600">
      {format(date, "MMMM d, yyyy")}
    </time>
  );
}
