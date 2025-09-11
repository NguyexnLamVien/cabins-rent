import { format } from "date-fns";

export function formatDateVN(date) {
    if (!date) return "";
    return format(date, "dd/MM/yyyy");
}
