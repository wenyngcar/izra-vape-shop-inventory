import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { patchData } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import mongoose from "mongoose";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { CircleCheckBig, LoaderCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export interface FormEditItemDialogProps {
  itemId: mongoose.Types.ObjectId;
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
  itemDate: Date;
}

// Cannot add icon directly to description. This is needed for the icon
const ToastWithIcon = () => (
  <div className="flex space-x-3">
    <CircleCheckBig color="#00f513" />
    <span>Product edited successfully</span>
  </div>
)

type Item = {
  id: mongoose.Types.ObjectId,
  name: string,
  price: number,
  quantity: number,
  expiration: Date
}

export interface FormEditItemDialogWithSetOpen extends FormEditItemDialogProps {
  setOpen: (open: boolean) => void;
}

const formSchema = z.object({
  item: z
    .string()
    .min(2, {
      message: "Item name must contain 2 - 50 characters.",
    })
    .max(50),
  quantity: z
    .number({ required_error: "Please enter a quantity" })
    .min(1, { message: "Quantity must be at least 1." }),
  // .optional(), // this allow undefined
  price: z
    .number({ required_error: "Please enter a price" })
    .min(1, { message: "Price must be at least 1." }),
  // .optional(), // his allow undefined
  expirationDate: z
    .date({ required_error: "Please enter an expiration date" })
    .refine((date) => date > new Date(), {
      message: "Expiration date must be in the future.",
    }),
});

export default function FormEditItem({
  itemId,
  itemName,
  itemQuantity,
  itemPrice,
  itemDate,
  setOpen,
}: FormEditItemDialogWithSetOpen) {

  const queryClient = useQueryClient()
  const { toast } = useToast()

  // react-query hook that is use to create new brand.
  const mutation = useMutation({
    // editedItem is object that was pass by mutation.mutate.
    mutationFn: (editedItem: Item) => {
      // (1)Arugment is url, (2)Argument is the object data to be edited.
      return patchData("edit-product", editedItem)
    }, onSuccess: () => {
      // Toast is the side notification.
      toast({
        variant: "primary",
        description: <ToastWithIcon />,
      })
      // This refetches the item after editing an item.
      queryClient.invalidateQueries({ queryKey: ['item'] })
    },
    onError: (error) => {
      // Toast is the side notification.
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
      console.error("There was an error in editing item.", error);
    }, onSettled: () => {
      setOpen(false);
    }
  })

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: itemName,
      quantity: itemQuantity,
      price: itemPrice,
      expirationDate: new Date(itemDate),
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      // Method to edit item.
      mutation.mutate({
        id: itemId,
        name: values.item,
        price: values.price,
        quantity: values.quantity,
        expiration: values.expirationDate,
      })

    } catch (error) {
      console.log("There was an error in editing item.", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="item"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter item name here"
                  {...field}
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) =>
                    (e.target.placeholder = "Enter item name here")
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter quantity here"
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value ? Number(value) : ""); // Set undefined when empty
                  }}
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = "Enter quantity here")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter price here"
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value ? Number(value) : ""); // Set undefined when empty
                  }}
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = "Enter price here")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expirationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiration Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  value={
                    field.value ? field.value.toISOString().split("T")[0] : ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? new Date(e.target.value) : null
                    )
                  }
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) =>
                    (e.target.placeholder = "Enter expiration date here")
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {mutation.isPending ? (
          <Button disabled>
            <LoaderCircle className="animate-spin" />
            Processing
          </Button>) :
          (<Button type="submit">Submit</Button>)}
      </form>
    </Form>
  );
}