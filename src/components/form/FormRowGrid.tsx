import InputLabel from "./FormInput";
import TextAreaLabel from "./FormTextArea";
import SelectLabel from "./FormSelect";

interface FormRowGridProps {
    inputs: {
        label: string;
        name: string;
        type?: string;
        required: boolean;
        placeholder?: string;
        register?: any;
        error?: any;
        isTextArea?: boolean;
        isSelect?: boolean;
        options?: { label: string; value: string | number }[];
        rows?: number;
    }[];
    columns?: number;
}

const FormRowGrid = ({ inputs = [], columns = 2 }: FormRowGridProps) => {
    const gridColsClass = `grid grid-cols-${columns} gap-4`;

    return (
        <div className={gridColsClass}>
            {inputs.map((input, index) => {
                if (input.isTextArea) {
                    return (
                        <TextAreaLabel
                            key={index}
                            label={input.label}
                            name={input.name}
                            required={input.required}
                            placeholder={input.placeholder}
                            register={input.register}
                            error={input.error}
                            rows={input.rows}
                        />
                    );
                } else if (input.isSelect) {
                    return (
                        <SelectLabel
                            key={index}
                            label={input.label}
                            name={input.name}
                            options={input.options || []}
                            required={input.required}
                            placeholder={input.placeholder}
                            register={input.register}
                            error={input.error}
                        />
                    );
                } else {
                    return (
                        <InputLabel
                            key={index}
                            label={input.label}
                            name={input.name}
                            type={input.type}
                            required={input.required}
                            placeholder={input.placeholder}
                            register={input.register}
                            error={input.error}
                        />
                    );
                }
            })}
        </div>
    );
};

export default FormRowGrid;
