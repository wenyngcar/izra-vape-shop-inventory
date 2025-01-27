import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { postData } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheckBig } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type NewBrand = {
  name: string,
  category: "E-liquid" | "Device"
}

const formSchema = z.object({
  brand: z
    .string()
    .min(2, {
      message: "Brand name must containt 2 - 50 characters.",
    })
    .max(50),
  category: z.enum(["E-liquid", "Device"], { required_error: "Please select a category" })
});

// Cannot add icon directly to description. This is needed for the icon
const ToastWithIcon = () => (
  <div className="flex space-x-3">
    <CircleCheckBig color="#00f513" />
    <span>Brand created successfully</span>
  </div>
)

export default function BrandInventoryForm({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {

  const queryClient = useQueryClient()
  const { toast } = useToast()

  // react-query hook that is use to create new brand.
  const mutation = useMutation({
    // newBrand is object that was pass by mutation.mutate.
    mutationFn: (newBrand: NewBrand) => {
      // (1)Arugment is url, (2)Argument is the object data to be created.
      return postData("create-brand", newBrand)
    },
    onSuccess: () => {
      // Toast is the side notification.
      toast({
        variant: "primary",
        description: <ToastWithIcon />,
      })
      // This refetches the brands after adding a brand.
      queryClient.invalidateQueries({ queryKey: ['brands'] })
    },
    onError: (error) => {
      // Toast is the side notification.
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
      console.error("Error creating brand:", error);
    },
    onSettled: () => {
      setOpen(false);
    }
  })

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brand: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      // Method to create brand.
      mutation.mutate({
        name: values.brand,
        category: values.category,
      })
    } catch (error) {
      console.error("Error creating brand:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter brand name here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Device">Device</SelectItem>
                  <SelectItem value="E-liquid">E-liquid</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form >
  );
}
