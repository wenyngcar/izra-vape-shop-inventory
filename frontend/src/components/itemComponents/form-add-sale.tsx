import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteData, patchData, postData } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import mongoose from "mongoose";
import { useForm } from "react-hook-form";
import { z, ZodError } from "zod";
import { CircleCheckBig, LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export interface FormAddSaleDialogProps {
  brandId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface FormAddSaleDialogWithSetOpen extends FormAddSaleDialogProps {
  setOpen: (open: boolean) => void;
}

type Sale = {
  brandId: mongoose.Types.ObjectId,
  productId: mongoose.Types.ObjectId,
  sale: number
}

type Item = {
  id: mongoose.Types.ObjectId,
  quantity: number
}

// Cannot add icon directly to description. This is needed for the icon
const ToastWithIcon = () => (
  <div className="flex space-x-3">
    <CircleCheckBig color="#00f513" />
    <span>Sale created successfully</span>
  </div>
)

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

  const queryClient = useQueryClient()
  const { toast } = useToast()

  // Mutation hook for creting sale.
  const mutationSale = useMutation({
    mutationFn: async (newSale: Sale) => {
      // (1)Arugment is url, (2)Argument is the object data to be created.
      return postData("create-sale", newSale)
    }, onSuccess: () => {
      // Toast is the side notification.
      toast({
        variant: "primary",
        description: <ToastWithIcon />,
      })
    },
    onError: (error) => {
      // Toast is the side notification.
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      })
      console.error("Error creating sale:", error);
    },
    onSettled: () => {
      setOpen(false);
    }
  })

  // Mutation hook for editing item.
  const mutationItem = useMutation({
    mutationFn: (editedItem: Item) => {
      // (1)Arugment is url, (2)Argument is the object data to be edited.
      // If quantity is 0 then delete the product. 
      if (editedItem.quantity == 0) {
        return deleteData("delete-product", editedItem.id)
      }
      // Else, just edit the quantity of the product.
      else {
        return patchData("subtract-quantity", editedItem)
      }
    }, onSuccess: () => {
      // This refetches the item after creating a sale.
      queryClient.invalidateQueries({ queryKey: ['item'] })
    },
    onError: (error) => {
      console.error("Error subtracting quantity of sale to product :", error);
    }
  })

  // This schema ensures that the sale to be created will not exceed the remaining quantity of the product.
  const nonNegativeSaleSchema = z.number().refine((sale) => sale >= 0,
    { message: "Cannot create sale more than the quantity of product." })

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
      // Ensures sale does not exceed product quantity.
      nonNegativeSaleSchema.parse(quantity - values.sale)

      // Method to create sale.
      await mutationSale.mutateAsync({
        brandId: brandId,
        productId: productId,
        sale: values.sale,
      })

      // Method to edit the item quantity.
      mutationItem.mutate({
        id: productId,
        quantity: quantity - values.sale,
      })

    } catch (error) {
      // If the error was from nonNegativeSalesSchema.
      if (error instanceof ZodError) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Sale must not exceed the remaining quantity of product.",
        })
      }
      console.error("Error creating sale:", error);
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
        {mutationSale.isPending ? (
          <Button disabled>
            <LoaderCircle className="animate-spin" />
            Processing
          </Button>) :
          (<Button type="submit">Submit</Button>)}
      </form>
    </Form>
  );
}
