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

    const formSchema = z.object({
        item: z
            .string()
            .min(2, {
                message: "Item name must contain 2 - 50 characters.",
            })
            .max(50),
        quantity: z.number({ required_error: "Please enter a number" }),
        price: z
            .number({ required_error: "Please enter a number" })
            .positive("Price must be greater than 0"),
        expirationDate: z.date({ required_error: "Please enter a valid date" }),
    });

    export default function ProfileForm() {
        // 1. Define your form.
        const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                item: "",
                quantity: 0,
                price: 0,
                expirationDate: new Date(),
            },
        });

        // 2. Define a submit handler.
        function onSubmit(values: z.infer<typeof formSchema>) {
            // Do something with the form values.
            // ✅ This will be type-safe and validated.
            console.log(values);
        }

        return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="item"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Item</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter item name here" {...field} />
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
                                        {...field}
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
                                        placeholder="Enter Price here"
                                        {...field}
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
                                        placeholder="Enter expiration date here"
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
        );
    }
