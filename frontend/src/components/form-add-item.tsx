"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as api from "@/utils/api.js";
import mongoose from "mongoose";

// brandName and brandCategory is needed as props for backend validation.
export interface FormAddItemDialogProps {
  brandId: mongoose.Types.ObjectId;
  brandName: string;
  brandCategory: string;
}

export interface FormAddItemDialogWithSetOpen extends FormAddItemDialogProps {
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

// brandName and brandCategory is needed for backend validation
// set Open is for dialog to close.
export default function FormAddItem({
  brandId,
  brandName,
  brandCategory,
  setOpen,
}: FormAddItemDialogWithSetOpen) {
  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      item: "",
      quantity: undefined,
      price: undefined,
      expirationDate: undefined,
    },
  });

  // Define submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // brandName and brandCategory is needed for backend validation.
    try {
      api.createProduct({
        brandId: brandId,
        brandName: brandName,
        brandCategory: brandCategory,
        variantName: "Closed Pod",
        name: values.item,
        price: values.price,
        quantity: values.quantity,
        expiration: values.expirationDate,
      });

      // setOpen is for the dialog to close.
      setOpen(false);
    } catch (error) {
      console.log("There was an error in creating brand", error);
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
                    field.onChange(value ? Number(value) : undefined); // Set undefined when empty
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
                    field.onChange(value ? Number(value) : undefined); // Set undefined when empty
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
