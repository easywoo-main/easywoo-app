import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import {ArrayPath, Control, Controller, FieldErrors, Path, useFieldArray, useWatch,} from "react-hook-form";
import ControlTextField from "../../../components/ControlTextField";
import {GraphType, SliderCreateUpdateProps} from "../../../type/chat.type";
import {SliderPropType} from "../type";
import {CreateUpdateSliderPropDto} from "../../../type/messageSlider.type";

interface SliderFormProps<TFieldValues extends SliderCreateUpdateProps> {
    control: Control<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
}

function SliderForm<TFieldValues extends SliderCreateUpdateProps>({
                                                                      control,
                                                                      errors,
                                                                  }: SliderFormProps<TFieldValues>) {

    const {fields, append, remove} = useFieldArray<TFieldValues>({
        control,
        name: "sliderProps" as ArrayPath<TFieldValues>,
    });

    const sliderValues = useWatch<TFieldValues>({
        control,
        name: "sliderProps" as Path<TFieldValues>,
    });

    const handleDeleteSlider = (index: number) => {
        remove(index);
    };

    const handleAddSlider = () => {
        const newSlider: CreateUpdateSliderPropDto = {
            id: undefined,
            name: "",
            text: "",
            type: SliderPropType.NEGATIVE,
            positiveMessage: "",
            negativeMessage: "",
        };
        append(newSlider as any);
    };

    return (
        <Box>
            <Typography variant="h5" sx={{mt: 3}}>
                Measurable Variables
            </Typography>
            {fields.map((field, index) => {
                const id = (sliderValues as Array<CreateUpdateSliderPropDto>)?.[index]?.id
                return (
                <Box key={field.id} sx={{ borderRadius: 1 }}>
                    <Typography variant="h6">
                        Variables {index + 1} {id &&`with id: ${id}`}
                    </Typography>
                    <ControlTextField
                        control={control}
                        errors={errors}
                        name={`sliderProps.${index}.name` as Path<TFieldValues>}
                        label="Variable name"
                    />
                    <ControlTextField
                        control={control}
                        errors={errors}
                        name={`sliderProps.${index}.text` as Path<TFieldValues>}
                        label="Variables  Text"
                    />

                    <Controller
                        name={`sliderProps.${index}.type` as Path<TFieldValues>}
                        control={control}
                        render={({ field: checkboxField }) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkboxField.value === SliderPropType.POSITIVE}
                                        onChange={(e) =>
                                            checkboxField.onChange(
                                                e.target.checked ? SliderPropType.POSITIVE : SliderPropType.NEGATIVE
                                            )
                                        }
                                    />
                                }
                                label="Is Positive"
                            />
                        )}
                    />

                    <ControlTextField
                        control={control}
                        errors={errors}
                        name={`sliderProps.${index}.positiveMessage` as Path<TFieldValues>}
                        label="Positive Message"
                    />
                    <ControlTextField
                        control={control}
                        errors={errors}
                        name={`sliderProps.${index}.negativeMessage` as Path<TFieldValues>}
                        label="Negative Message"
                    />

                    <Button variant="outlined" color="error" onClick={() => handleDeleteSlider(index)}>
                        Delete Slider
                    </Button>
                    <Divider orientation="horizontal" flexItem sx={{mt: 2, mb: 3, borderWidth: 1}}/>
                </Box>
                )
            })}

            <Button variant="contained" onClick={handleAddSlider}>
                Add New Variable
            </Button>

            <ControlTextField
                control={control}
                errors={errors}
                name={"formula" as Path<TFieldValues>}
                label="Formula Input"
                placeholder="e.g., sliderName^2 + 3 * 5"
            />
            <FormControl fullWidth error={!!errors.graphType} variant="outlined" size="small">
                <InputLabel id="graphType-label">Master graph</InputLabel>
                <Controller
                    name={"graphType" as Path<TFieldValues>}
                    control={control}
                    render={({field}) => (
                        <Select {...field} labelId="graphType-label" label="Graph Type" fullWidth
                                error={!!errors.graphType}>
                            {Object.values(GraphType).map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type.toString().charAt(0).toUpperCase() + type.toString().slice(1).toLowerCase()}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            </FormControl>
        </Box>
    );
}

export default SliderForm;
