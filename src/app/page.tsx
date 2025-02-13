"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, {
    message: "Password must atleast of 5 characters"
  })
})

export default function Home() {

  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
      const result = await signIn("credentials",
        {
          redirect: false,
          email: data.email,
          password: data.password
        }
      )
      // console.log(result)
      if(result?.error){
        toast({
          title: "ERROR",
          description:  result.error,
          variant: "destructive"
        })
      }
      if(result?.url){
        router.replace("/dashboard")
      }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center text-gray-800">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 flex items-center justify-center ">
            <span>Code</span>
            <span><img src="../images/shelf.svg" className="h-10 " /></span>
            <span>Shelf</span>
          </h1>
          <p className="mb-4">Sign up to start your reading adventure</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="text-white bg-gray-800">Submit</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            New to CodeShelf?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
