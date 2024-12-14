export const createBrandValidationSchema = {
    name: {
        errorMessage: "Invalid brand name",
        notEmpty: true,
        escape: true,
    },
    category: {
        errorMessage: "Invalid brand category",
        notEmpty: true,
        escape: true,
    }
}

export const createProductValidationSchema = {
    brandName: {
        errorMessage: "Invalid brand name for product",
        notEmpty: true,
        escape: true,
    },
    brandCategory: {
        errorMessage: "Invalid brand category for product",
        notEmpty: true,
        escape: true,
    },
    variantName: {
        errorMessage: "Invalid variant name for product",
        notEmpty: true,
        escape: true,
    },
    name: {
        errorMessage: "Invalid product name",
        notEmpty: true,
        escape: true,
    },
    price: {
        errorMessage: "Invalid product price",
        notEmpty: true,
        isInt: true,
    },
    quantity: {
        errorMessage: "Invalid product quantity",
        notEmpty: true,
        isInt: true,
    },
    expiration: {   // No validator for checking if Date is in ISO format.
        errorMessage: "Invalid product expiration date",
        notEmpty: true,
        escape: true,
    }
}

export const createVariantValidationSchema = {
    name: {
        errorMessage: "Invalid variant name",
        notEmpty: true,
        escape: true,
    },
    description: {
        errorMessage: "Invalid variant description",
        notEmpty: true,
        escape: true,
    },
    category: {
        errorMessage: "Invalid variant category",
        notEmpty: true,
        escape: true,
    }
}

export const accountValidationSchema = {
    username: {
        errorMessage: "Invalid account username",
        notEmpty: true,
        escape: true,
    },
    password: {
        errorMessage: "Invalid account password",
        notEmpty: true,
        escape: true,
    }
};