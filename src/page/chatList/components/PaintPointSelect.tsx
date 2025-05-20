import React, { useEffect, useState } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { getAllPaintPoints } from "../../../api/chat.service";
import { PaintPoint } from "../../../type/chat.type";

function useDebounce<T>(value: T, delay: number): T {
    const [debounced, setDebounced] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
}

interface PaintPointSelectProps {
    control: Control<any>;
    errors: FieldErrors<any>;
}

interface AutocompleteWrapperProps {
    options: PaintPoint[];
    valueIds: (string | number)[];
    onChange: (ids: (string | number)[]) => void;
    inputValue: string;
    onInputChange: (value: string) => void;
    loading: boolean;
    errors: FieldErrors<any>;
}

const AutocompleteWrapper: React.FC<AutocompleteWrapperProps> = ({
                                                                     options,
                                                                     valueIds,
                                                                     onChange,
                                                                     inputValue,
                                                                     onInputChange,
                                                                     loading,
                                                                     errors,
                                                                 }) => {
    const [selectedOptions, setSelectedOptions] = useState<PaintPoint[]>([]);

    useEffect(() => {
        // Оновлюємо вибрані об'єкти, базуючись на valueIds та доступних options
        const selected = options.filter((option) => valueIds?.includes(option.id));
        setSelectedOptions(selected);
    }, [valueIds, options]);

    return (
        <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option.name}
            filterOptions={(x) => x} // вимикаємо локальний фільтр, бо фільтруємо на бекенді
            onChange={(_, data) => {
                setSelectedOptions(data);
                onChange(data.map((item) => item.id));
            }}
            value={selectedOptions}
            inputValue={inputValue}
            onInputChange={(_, newInput) => onInputChange(newInput)}
            loading={loading}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select Paint Points"
                    error={!!errors.paintPoints}
                    helperText={errors.paintPoints?.message as string}
                    variant="outlined"
                    size="small"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
};

const PaintPointSelect: React.FC<PaintPointSelectProps> = ({ control, errors }) => {
    const [options, setOptions] = useState<PaintPoint[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const debouncedInput = useDebounce(inputValue, 500);

    useEffect(() => {
        if (debouncedInput.trim() === "") {
            setOptions([]);
            setLoading(false);
            return;
        }

        let active = true;
        setLoading(true);

        getAllPaintPoints({ search: debouncedInput })
            .then((res) => {
                if (!active) return;
                setOptions(res.content || []);
            })
            .catch(() => {
                if (!active) return;
                setOptions([]);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [debouncedInput]);

    return (
        <Controller
            name="paintPoints"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
                <AutocompleteWrapper
                    options={options}
                    valueIds={field.value || []}
                    onChange={field.onChange}
                    inputValue={inputValue}
                    onInputChange={setInputValue}
                    loading={loading}
                    errors={errors}
                />
            )}
        />
    );
};

export default PaintPointSelect;
