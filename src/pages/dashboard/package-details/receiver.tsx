import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  pickUp: z.string(),
  drop: z.string(),
  supplier: z.string(),
  wallet: z.string(),
});

interface ReceiverFormProps {
  onSubmit: (data: any) => void;
  handleBack: () => void;
}

const ReceiverDetails: React.FC<ReceiverFormProps> = ({
  onSubmit,
  handleBack,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickUp: "",
    },
  });
  return (
    <>
      <div className="w-screen h-screen p-10">
        <h1>Enter Delivery Details</h1>

        <div className="py-10">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <div className="flex flex-col space-y-4 w-1/2">
                  <FormField
                    control={form.control}
                    name="pickUp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pickup Address</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="drop"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Drop</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="supplier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Supplier</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Supplier" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="font-Geist">
                            <SelectItem value="xyz">Xyz</SelectItem>
                            <SelectItem value="abc">Abc</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="wallet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Receiver Wallet Address</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-1/2 space-x-2 flex">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="w-1/2"
                  >
                    Back
                  </Button>
                  <Button type="submit" className="w-1/2">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiverDetails;
