import {FieldValues, UseFormStateReturn} from "react-hook-form";

export const errorParsing = <TFieldValues extends FieldValues>(
    name: string,
    errors: UseFormStateReturn<TFieldValues>["errors"]
) => {
    return name
        .split(/[\[\]\.]+/)
        .filter(Boolean)
        .reduce((acc: FieldValues, part: string) => acc?.[part], errors);
}