import logo from "../../../public/vite.svg";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function SignIn() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  return (
    <>
      <div className="grid grid-cols-8">
        <div className="h-screen bg-black col-span-5"></div>
        <div className="flex flex-col py-10 px-10 font-Geist col-span-3">
          <div id="logo" className="w-14 h-14 rounded-xl bg-blue-100">
            <img src={logo} />
          </div>
          <div className="py-10">
            <h1 className="font-semibold text-2xl">Sign In</h1>
            <p className="text-[#8F8F8F] pt-2">
              Enter your credentials to access your account
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-[#5673DA] hover:bg-[#5673DA]"
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
