import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox"; // Ensure you have a Checkbox component
import { Input } from "@/components/ui/input"; // Ensure you have an Input component
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const AddressUnitField = ({ control }) => {
  return (
    <FormField
      control={control}
      name="addressUnit"
      render={() => (
        <FormItem className="flex items-center gap-2">
          <FormLabel>3.c.</FormLabel>
          <Controller
            name="apt"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} onCheckedChange={field.onChange} label="Apt." />
            )}
          />
          <Controller
            name="ste"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} onCheckedChange={field.onChange} label="Ste." />
            )}
          />
          <Controller
            name="flr"
            control={control}
            render={({ field }) => (
              <Checkbox checked={field.value} onCheckedChange={field.onChange} label="Flr." />
            )}
          />
          <FormControl>
            <Controller
              name="unitNumber"
              control={control}
              render={({ field }) => <Input {...field} placeholder="" className="w-24" />}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AddressUnitField;