import React from "react";
import { parseISO, format } from "date-fns";

export default function Date({ dateString, ...delegated }) {
  const date = parseISO(dateString);
  return (
    <time {...delegated} dateTime={dateString}>
      {format(date, "LLLL d, yyyy")}
    </time>
  );
}
