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
	register: `${server.backend.url}/php/processes/customer/register.php`,
	signin: `${server.backend.url}/php/processes/customer/signin.php`,
	home: `${server.backend.url}/php/processes/pages/home.php`,
	product_data: `${server.backend.url}/php/processes/pages/product_data.php`,
	newsletter: `${server.backend.url}/php/processes/data/newsletter.php`,
	get_user_data: `${server.backend.url}/php/processes/data/GetUserData.php`,
	contact_messages: `${server.backend.url}/php/processes/data/ContactMessages.php`,
	place_order: `${server.backend.url}/php/processes/data/PlaceOrder.php`,
	update_user_info: `${server.backend.url}/php/processes/data/UpdateUserInfo.php`,
	customer_orders: `${server.backend.url}/php/processes/data/CustomerOrders.php`,
	admin_login: `${server.backend.url}/php/processes/data/AdminLogin.php`,
	admin_add_product: `${server.backend.url}php/processes/admin/add-product.php`,
	admin_update_product: `${server.backend.url}php/processes/admin/update-product.php`,
	admin_all_products: `${server.backend.url}/php/processes/admin/products.php`,
	admin_all_orders: `${server.backend.url}/php/processes/admin/orders.php`,
	admin_delete_product: `${server.backend.url}/php/processes/admin/delete_product.php`,
	admin_create_new_post: `${server.backend.url}/php/processes/admin/create_new_post.php`,
	admin_get_blog_posts: `${server.backend.url}/php/processes/admin/get_blog_posts.php`,
}