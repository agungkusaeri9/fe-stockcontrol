import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/button/Button";
import { useCreateData } from "@/hooks/useCreateData";
import OperatorService from "@/services/OperatorService";
import InputLabel from "@/components/form/FormInput";
import { operatorCreateValidator } from "@/validators/operator/operatorCreate";

const OperatorCreate = () => {

    const { mutate: createMutation, isPending } = useCreateData(
        OperatorService.createOperator,
        ["operators"],
        "/operators"
    );
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(operatorCreateValidator),
    });
    const onSubmit = (data: any) => {
        createMutation(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputLabel
                label="Name"
                name="name"
                type="text"
                required
                placeholder="Enter Name"
                register={register("name")}
                error={errors.name}
            />
            <InputLabel
                label="NIK"
                name="nik"
                type="text"
                required
                placeholder="Enter NIK"
                register={register("nik")}
                error={errors.nik}
            />
            <Button size="sm" variant="primary" className="w-full mt-4" disabled={isPending} loading={isPending}>
                Create
            </Button>
        </form>
    );
};

export default OperatorCreate;
