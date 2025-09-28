"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { zSchema } from "@/lib/zSchema";
import Link from "next/link";

const LoginPage = () => {
  const formSchema = zSchema.pick({
    email: true,
    password: true,
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogIn = async (values) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="w-[420px] px-4 flex justify-center shadow-2xl shadow-teal-900">
        {" "}
        <CardHeader className={"space-y-2 mt-5 text-center"}>
          <CardTitle>Login Forms</CardTitle>
          <CardDescription>Please register Your Name </CardDescription>
        </CardHeader>
        <CardContent>
          {" "}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogIn)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter Your Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter Your Paassword"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="mb-5 text-center flex justify-center gap-2">
          <p>Dont have a Account? </p>
          <Link
            href={"/auth/register"}
            className="text-blue-700 hover:underline"
          >
            Create Account
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
