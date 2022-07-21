const dev = process.env.NODE_ENV !== 'production'

export const server = {
	frontend: {
		url: (
			(dev)
			? 'http://localhost:3000/'
			: 'http://unknown'
		)
	},
	backend: {
		url: (
			(dev)
			// ? 'http://192.168.137.1/ollymann_farms/'
			? 'http://localhost:80/ollymann_farms/'
			: 'http://unknown'
		)
	}
}

export const API_ROUTE = {
	admin_profile_img: `${server.backend.url}/admin/images/`,
	customer_images: `${server.backend.url}/customers/images/`,
	product_images: `${server.backend.url}/products/images/`,
	blog_images: `${server.backend.url}/blog/images/`,
	category_images: `${server.backend.url}/categories/images/`,
	register: `${server.backend.url}/php/processes/Customer/register.php`,
	signin: `${server.backend.url}/php/processes/Customer/signin.php`,
	home: `${server.backend.url}/php/processes/Pages/home.php`,
	product_data: `${server.backend.url}/php/processes/Pages/product_data.php`,
	newsletter: `${server.backend.url}/php/processes/Data/newsletter.php`,
	get_user_data: `${server.backend.url}/php/processes/Data/GetUserData.php`,
	contact_messages: `${server.backend.url}/php/processes/Data/ContactMessages.php`,
	place_order: `${server.backend.url}/php/processes/Data/PlaceOrder.php`,
	update_user_info: `${server.backend.url}/php/processes/Data/UpdateUserInfo.php`,
	customer_orders: `${server.backend.url}/php/processes/Data/CustomerOrders.php`,
	admin_login: `${server.backend.url}/php/processes/Data/AdminLogin.php`,
	admin_add_product: `${server.backend.url}php/processes/Admin/add-product.php`,
	admin_update_product: `${server.backend.url}php/processes/Admin/update-product.php`,
	admin_all_products: `${server.backend.url}/php/processes/Admin/products.php`,
	admin_all_orders: `${server.backend.url}/php/processes/Admin/orders.php`,
	admin_delete_product: `${server.backend.url}/php/processes/Admin/delete_product.php`,
	admin_create_new_post: `${server.backend.url}/php/processes/Admin/create_new_post.php`,
	admin_get_blog_posts: `${server.backend.url}/php/processes/Admin/get_blog_posts.php`,
	admin_get_blog_post_data: `${server.backend.url}/php/processes/Admin/get_blog_post_data.php`,
	admin_get_categories_and_measures: `${server.backend.url}/php/processes/Admin/get_categories_and_measures.php`,
}