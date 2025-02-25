import { format } from "date-fns";

export const dateFormat = (date: Date): string => {
    return format(date, "dd/MM/yyyy"); 
};