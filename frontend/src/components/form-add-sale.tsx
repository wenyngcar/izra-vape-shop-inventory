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

import * as api from "@/utils/api";
import mongoose from "mongoose";

export interface FormAddSaleDialogProps {
  brandId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface FormAddSaleDialogWithSetOpen extends FormAddSaleDialogProps {
  setOpen: (open: boolean) => void;
}

const formSchema = z.object({
  sale: z
    .number({ required_error: "Please enter a quantity" })
    .min(1, { message: "Quantity must be at least 1." }),
});

export default function AddSaleForm({
  brandId,
  productId,
  quantity,
  setOpen,
}: FormAddSaleDialogWithSetOpen) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sale: undefined,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      api.createSale({
        brandId: brandId,
        productId: productId,
        sale: values.sale,
      });
      api.subtractQuantity({
        id: productId,
        quantity: quantity - values.sale,
      });

      setOpen(false);
    } catch (error) {
      console.error("Error adding sale:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="sale"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="1"
                  placeholder="Enter amount of sale"
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(value ? Number(value) : undefined); // Set undefined when empty
                  }}
                  onFocus={(e) => (e.target.placeholder = "")}
                  onBlur={(e) => (e.target.placeholder = "Enter a number here")}
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
