import { Stack } from "expo-router";
const headerStyle = {
  backgroundColor: '#0ea5e9',
};

export default function ProductsLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown:false,
                headerStyle,
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },  
            }}
        >
            <Stack.Screen
                name="index"
                options={{ title: 'Products' }}
            />  

            <Stack.Screen
                name="product-detail/[id]"
                options={({ route }: { route: { params?: { productName?: string } } }) => ({
                    title: route.params?.productName ? `${route.params.productName}` : 'Product Details'
                })}
            />

            <Stack.Screen
                name="add-product"
                options={{ title: 'Add Product' }}
            />

            <Stack.Screen
                name="edit-product/[id]"
                options={({ route }: { route: { params?: { productName?: string } } }) => ({
                    title: route.params?.productName ? `Edit ${route.params.productName}` : 'Edit Product'
                })}
            />

        </Stack>
    )
}