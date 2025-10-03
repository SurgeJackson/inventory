-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `oc_address` (
	`address_id` int(11) AUTO_INCREMENT NOT NULL,
	`customer_id` int(11) NOT NULL,
	`firstname` varchar(32) NOT NULL,
	`lastname` varchar(32) NOT NULL,
	`company` varchar(40) NOT NULL,
	`address_1` varchar(128) NOT NULL,
	`address_2` varchar(128) NOT NULL,
	`city` varchar(128) NOT NULL,
	`postcode` varchar(10) NOT NULL,
	`country_id` int(11) NOT NULL DEFAULT 0,
	`zone_id` int(11) NOT NULL DEFAULT 0,
	`custom_field` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_address_simple_fields` (
	`address_id` int(11) NOT NULL,
	`metadata` text
);
--> statement-breakpoint
CREATE TABLE `oc_affiliate` (
	`affiliate_id` int(11) AUTO_INCREMENT NOT NULL,
	`firstname` varchar(32) NOT NULL,
	`lastname` varchar(32) NOT NULL,
	`email` varchar(96) NOT NULL,
	`telephone` varchar(32) NOT NULL,
	`fax` varchar(32) NOT NULL,
	`password` varchar(40) NOT NULL,
	`salt` varchar(9) NOT NULL,
	`company` varchar(40) NOT NULL,
	`website` varchar(255) NOT NULL,
	`address_1` varchar(128) NOT NULL,
	`address_2` varchar(128) NOT NULL,
	`city` varchar(128) NOT NULL,
	`postcode` varchar(10) NOT NULL,
	`country_id` int(11) NOT NULL,
	`zone_id` int(11) NOT NULL,
	`code` varchar(64) NOT NULL,
	`commission` decimal(4,2) NOT NULL DEFAULT '0.00',
	`tax` varchar(64) NOT NULL,
	`payment` varchar(6) NOT NULL,
	`cheque` varchar(100) NOT NULL,
	`paypal` varchar(64) NOT NULL,
	`bank_name` varchar(64) NOT NULL,
	`bank_branch_number` varchar(64) NOT NULL,
	`bank_swift_code` varchar(64) NOT NULL,
	`bank_account_name` varchar(64) NOT NULL,
	`bank_account_number` varchar(64) NOT NULL,
	`ip` varchar(40) NOT NULL,
	`status` tinyint(1) NOT NULL,
	`approved` tinyint(1) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_affiliate_activity` (
	`affiliate_activity_id` int(11) AUTO_INCREMENT NOT NULL,
	`affiliate_id` int(11) NOT NULL,
	`key` varchar(64) NOT NULL,
	`data` text NOT NULL,
	`ip` varchar(40) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_affiliate_login` (
	`affiliate_login_id` int(11) AUTO_INCREMENT NOT NULL,
	`email` varchar(96) NOT NULL,
	`ip` varchar(40) NOT NULL,
	`total` int(4) NOT NULL,
	`date_added` datetime NOT NULL,
	`date_modified` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_affiliate_transaction` (
	`affiliate_transaction_id` int(11) AUTO_INCREMENT NOT NULL,
	`affiliate_id` int(11) NOT NULL,
	`order_id` int(11) NOT NULL,
	`description` text NOT NULL,
	`amount` decimal(15,4) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_api` (
	`api_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`key` text NOT NULL,
	`status` tinyint(1) NOT NULL,
	`date_added` datetime NOT NULL,
	`date_modified` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_api_ip` (
	`api_ip_id` int(11) AUTO_INCREMENT NOT NULL,
	`api_id` int(11) NOT NULL,
	`ip` varchar(40) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_api_session` (
	`api_session_id` int(11) AUTO_INCREMENT NOT NULL,
	`api_id` int(11) NOT NULL,
	`token` varchar(32) NOT NULL,
	`session_id` varchar(32) NOT NULL,
	`session_name` varchar(32) NOT NULL,
	`ip` varchar(40) NOT NULL,
	`date_added` datetime NOT NULL,
	`date_modified` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_artctin` (
	`status_id` int(15) AUTO_INCREMENT NOT NULL,
	`num_order` int(15),
	`sum` decimal(15,2),
	`user` text,
	`email` text,
	`status` int(1),
	`date_created` datetime,
	`date_enroled` datetime,
	`sender` text,
	`label` text,
	`label2` text,
	`label3` text,
	`label4` text,
	`label5` text,
	`label6` text,
	`label7` int(15),
	`label8` int(15),
	`label9` int(15)
);
--> statement-breakpoint
CREATE TABLE `oc_attribute` (
	`attribute_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_group_id` int(11) NOT NULL,
	`sort_order` int(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_attribute_description` (
	`attribute_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(64) NOT NULL,
	`description` varchar(255) NOT NULL DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `oc_attribute_group` (
	`attribute_group_id` int(11) AUTO_INCREMENT NOT NULL,
	`sort_order` int(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_attribute_group_description` (
	`attribute_group_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_attribute_to_1c` (
	`attribute_id` int(11) NOT NULL,
	`guid` varchar(64) NOT NULL,
	CONSTRAINT `attribute_link` UNIQUE(`attribute_id`,`guid`)
);
--> statement-breakpoint
CREATE TABLE `oc_attribute_value` (
	`attribute_value_id` int(11) AUTO_INCREMENT NOT NULL,
	`attribute_id` int(11) NOT NULL,
	`guid` varchar(64) NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `attribute_value_key` UNIQUE(`attribute_id`,`guid`)
);
--> statement-breakpoint
CREATE TABLE `oc_banner` (
	`banner_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`status` tinyint(1) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_banner_image` (
	`banner_image_id` int(11) AUTO_INCREMENT NOT NULL,
	`banner_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`title` varchar(64) NOT NULL,
	`link` varchar(255) NOT NULL,
	`image` varchar(255) NOT NULL,
	`sort_order` int(3) NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `oc_cart` (
	`cart_id` int(11) unsigned AUTO_INCREMENT NOT NULL,
	`api_id` int(11) NOT NULL,
	`customer_id` int(11) NOT NULL,
	`session_id` varchar(32) NOT NULL,
	`product_id` int(11) NOT NULL,
	`recurring_id` int(11) NOT NULL,
	`option` text NOT NULL,
	`unit_id` int(11) NOT NULL DEFAULT 0,
	`product_feature_id` int(11) NOT NULL DEFAULT 0,
	`quantity` int(5) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_category` (
	`category_id` int(11) AUTO_INCREMENT NOT NULL,
	`image` varchar(255),
	`yomenu_icon` varchar(255),
	`yomenu_image` varchar(255),
	`parent_id` int(11) NOT NULL DEFAULT 0,
	`top` tinyint(1) NOT NULL,
	`column` int(3) NOT NULL,
	`sort_order` int(3) NOT NULL DEFAULT 0,
	`status` tinyint(1) NOT NULL,
	`date_added` datetime NOT NULL,
	`date_modified` datetime NOT NULL,
	`yomenu_content` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_category_description` (
	`category_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`meta_title` varchar(255) NOT NULL,
	`meta_h1` varchar(255) NOT NULL,
	`meta_description` varchar(500) NOT NULL,
	`meta_keyword` varchar(255) NOT NULL,
	`input_vop_1` varchar(255) NOT NULL,
	`input_otv_1` text NOT NULL,
	`input_vop_2` varchar(255) NOT NULL,
	`input_otv_2` text NOT NULL,
	`input_vop_3` varchar(255) NOT NULL,
	`input_otv_3` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_category_filter` (
	`category_id` int(11) NOT NULL,
	`filter_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_category_path` (
	`category_id` int(11) NOT NULL,
	`path_id` int(11) NOT NULL,
	`level` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_category_to_1c` (
	`category_id` int(11) NOT NULL,
	`guid` varchar(64) NOT NULL,
	CONSTRAINT `category_link` UNIQUE(`category_id`,`guid`)
);
--> statement-breakpoint
CREATE TABLE `oc_category_to_layout` (
	`category_id` int(11) NOT NULL,
	`store_id` int(11) NOT NULL,
	`layout_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_category_to_store` (
	`category_id` int(11) NOT NULL,
	`store_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_cbr` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`val` float NOT NULL,
	`cur` varchar(5) NOT NULL,
	`date` varchar(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_country` (
	`country_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`iso_code_2` varchar(2) NOT NULL,
	`iso_code_3` varchar(3) NOT NULL,
	`address_format` text NOT NULL,
	`postcode_required` tinyint(1) NOT NULL,
	`status` tinyint(1) NOT NULL DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `oc_coupon` (
	`coupon_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`code` varchar(20) NOT NULL,
	`type` char(1) NOT NULL,
	`discount` decimal(15,4) NOT NULL,
	`logged` tinyint(1) NOT NULL,
	`shipping` tinyint(1) NOT NULL,
	`total` decimal(15,4) NOT NULL,
	`date_start` date NOT NULL DEFAULT '0000-00-00',
	`date_end` date NOT NULL DEFAULT '0000-00-00',
	`uses_total` int(11) NOT NULL,
	`uses_customer` varchar(11) NOT NULL,
	`status` tinyint(1) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_coupon_category` (
	`coupon_id` int(11) NOT NULL,
	`category_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_coupon_history` (
	`coupon_history_id` int(11) AUTO_INCREMENT NOT NULL,
	`coupon_id` int(11) NOT NULL,
	`order_id` int(11) NOT NULL,
	`customer_id` int(11) NOT NULL,
	`amount` decimal(15,4) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_coupon_product` (
	`coupon_product_id` int(11) AUTO_INCREMENT NOT NULL,
	`coupon_id` int(11) NOT NULL,
	`product_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_csvprice_pro` (
	`setting_id` int(11) AUTO_INCREMENT NOT NULL,
	`key` varchar(64) NOT NULL,
	`value` text,
	`serialized` tinyint(1) NOT NULL DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `oc_csvprice_pro_crontab` (
	`job_id` int(11) AUTO_INCREMENT NOT NULL,
	`profile_id` int(11) NOT NULL,
	`job_key` varchar(64) NOT NULL,
	`job_type` enum('import','export'),
	`job_file_location` enum('dir','web','ftp'),
	`job_time_start` datetime NOT NULL,
	`job_offline` tinyint(1) NOT NULL DEFAULT 0,
	`job_data` text,
	`status` tinyint(1) NOT NULL DEFAULT 0,
	`serialized` tinyint(1) NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `oc_csvprice_pro_images` (
	`catalog_id` int(11) NOT NULL,
	`image_key` char(32) NOT NULL,
	`image_path` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_csvprice_pro_profiles` (
	`profile_id` int(11) AUTO_INCREMENT NOT NULL,
	`key` varchar(64) NOT NULL,
	`catalog` varchar(64) NOT NULL DEFAULT 'product',
	`name` varchar(128) NOT NULL,
	`value` text,
	`serialized` tinyint(1) NOT NULL DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `oc_currency` (
	`currency_id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(32) NOT NULL,
	`code` varchar(3) NOT NULL,
	`symbol_left` varchar(12) NOT NULL,
	`symbol_right` varchar(12) NOT NULL,
	`decimal_place` char(2) NOT NULL,
	`value` float(15,8) NOT NULL,
	`status` tinyint(1) NOT NULL,
	`date_modified` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_custom_field` (
	`custom_field_id` int(11) AUTO_INCREMENT NOT NULL,
	`type` varchar(32) NOT NULL,
	`value` text NOT NULL,
	`validation` varchar(255) NOT NULL,
	`location` varchar(7) NOT NULL,
	`status` tinyint(1) NOT NULL,
	`sort_order` int(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_custom_field_customer_group` (
	`custom_field_id` int(11) NOT NULL,
	`customer_group_id` int(11) NOT NULL,
	`required` tinyint(1) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_custom_field_description` (
	`custom_field_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_custom_field_value` (
	`custom_field_value_id` int(11) AUTO_INCREMENT NOT NULL,
	`custom_field_id` int(11) NOT NULL,
	`sort_order` int(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_custom_field_value_description` (
	`custom_field_value_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`custom_field_id` int(11) NOT NULL,
	`name` varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_customer` (
	`customer_id` int(11) AUTO_INCREMENT NOT NULL,
	`customer_group_id` int(11) NOT NULL,
	`store_id` int(11) NOT NULL DEFAULT 0,
	`language_id` int(11) NOT NULL,
	`firstname` varchar(32) NOT NULL,
	`lastname` varchar(32) NOT NULL,
	`email` varchar(96) NOT NULL,
	`telephone` varchar(32) NOT NULL,
	`fax` varchar(32) NOT NULL,
	`password` varchar(40) NOT NULL,
	`salt` varchar(9) NOT NULL,
	`cart` text,
	`wishlist` text,
	`newsletter` tinyint(1) NOT NULL DEFAULT 0,
	`address_id` int(11) NOT NULL DEFAULT 0,
	`custom_field` text NOT NULL,
	`ip` varchar(40) NOT NULL,
	`status` tinyint(1) NOT NULL,
	`approved` tinyint(1) NOT NULL,
	`safe` tinyint(1) NOT NULL,
	`token` text NOT NULL,
	`code` varchar(40) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_customer_activity` (
	`customer_activity_id` int(11) AUTO_INCREMENT NOT NULL,
	`customer_id` int(11) NOT NULL,
	`key` varchar(64) NOT NULL,
	`data` text NOT NULL,
	`ip` varchar(40) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_customer_group` (
	`customer_group_id` int(11) AUTO_INCREMENT NOT NULL,
	`approval` int(1) NOT NULL,
	`sort_order` int(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_customer_group_description` (
	`customer_group_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(32) NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_customer_history` (
	`customer_history_id` int(11) AUTO_INCREMENT NOT NULL,
	`customer_id` int(11) NOT NULL,
	`comment` text NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_customer_ip` (
	`customer_ip_id` int(11) AUTO_INCREMENT NOT NULL,
	`customer_id` int(11) NOT NULL,
	`ip` varchar(40) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_customer_login` (
	`customer_login_id` int(11) AUTO_INCREMENT NOT NULL,
	`email` varchar(96) NOT NULL,
	`ip` varchar(40) NOT NULL,
	`total` int(4) NOT NULL,
	`date_added` datetime NOT NULL,
	`date_modified` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_customer_online` (
	`ip` varchar(40) NOT NULL,
	`customer_id` int(11) NOT NULL,
	`url` text NOT NULL,
	`referer` text NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_customer_parties` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`customer_id` int(11) NOT NULL,
	`fileds_json` varchar(1000) NOT NULL DEFAULT '',
	`date` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_customer_reward` (
	`customer_reward_id` int(11) AUTO_INCREMENT NOT NULL,
	`customer_id` int(11) NOT NULL DEFAULT 0,
	`order_id` int(11) NOT NULL DEFAULT 0,
	`description` text NOT NULL,
	`points` int(8) NOT NULL DEFAULT 0,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_customer_search` (
	`customer_search_id` int(11) AUTO_INCREMENT NOT NULL,
	`store_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`customer_id` int(11) NOT NULL,
	`keyword` varchar(255) NOT NULL,
	`category_id` int(11),
	`sub_category` tinyint(1) NOT NULL,
	`description` tinyint(1) NOT NULL,
	`products` int(11) NOT NULL,
	`ip` varchar(40) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_customer_simple_fields` (
	`customer_id` int(11) NOT NULL,
	`metadata` text,
	`requisites` text
);
--> statement-breakpoint
CREATE TABLE `oc_customer_transaction` (
	`customer_transaction_id` int(11) AUTO_INCREMENT NOT NULL,
	`customer_id` int(11) NOT NULL,
	`order_id` int(11) NOT NULL,
	`description` text NOT NULL,
	`amount` decimal(15,4) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_customer_wishlist` (
	`customer_id` int(11) NOT NULL,
	`product_id` int(11) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_download` (
	`download_id` int(11) AUTO_INCREMENT NOT NULL,
	`filename` varchar(160) NOT NULL,
	`mask` varchar(128) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_download_description` (
	`download_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_event` (
	`event_id` int(11) AUTO_INCREMENT NOT NULL,
	`code` varchar(32) NOT NULL,
	`trigger` text NOT NULL,
	`action` text NOT NULL,
	`status` tinyint(1) NOT NULL,
	`date_added` datetime NOT NULL,
	`sort_order` int(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_extension` (
	`extension_id` int(11) AUTO_INCREMENT NOT NULL,
	`type` varchar(32) NOT NULL,
	`code` varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_filter` (
	`filter_id` int(11) AUTO_INCREMENT NOT NULL,
	`filter_group_id` int(11) NOT NULL,
	`sort_order` int(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_filter_description` (
	`filter_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`filter_group_id` int(11) NOT NULL,
	`name` varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_filter_group` (
	`filter_group_id` int(11) AUTO_INCREMENT NOT NULL,
	`sort_order` int(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_filter_group_description` (
	`filter_group_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_fx_manufacturers_on_categories` (
	`category_id` mediumint(8) NOT NULL,
	`manufacturers` text NOT NULL,
	`num` mediumint(5) NOT NULL,
	CONSTRAINT `category_id` UNIQUE(`category_id`)
);
--> statement-breakpoint
CREATE TABLE `oc_fx_sitemap_categories` (
	`category_id` mediumint(8) NOT NULL,
	`url` varchar(255) NOT NULL,
	`is_seo` tinyint(1) NOT NULL,
	`date_modified` date NOT NULL,
	`store_id` smallint(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_fx_sitemap_lastmod` (
	`name` varchar(10) NOT NULL,
	`md5` varchar(32) NOT NULL,
	`date` date NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_geo_zone` (
	`geo_zone_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(32) NOT NULL,
	`description` varchar(255) NOT NULL,
	`date_modified` datetime NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_gp_bundle` (
	`product_id` int(11) NOT NULL,
	`gp_price_min` varchar(20) NOT NULL,
	`gp_price_max` varchar(20) NOT NULL,
	`gp_template` varchar(16) NOT NULL DEFAULT 'default'
);
--> statement-breakpoint
CREATE TABLE `oc_gp_bundle_child` (
	`product_id` int(11) NOT NULL,
	`child_id` int(11) NOT NULL,
	`child_sort_order` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_hd_accumulation_statuses` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(500) NOT NULL,
	`description` varchar(500) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_hd_accumulative` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(500),
	`description` varchar(500),
	`status` tinyint(1),
	`shops_all` tinyint(1),
	`shops` varchar(255),
	`customers` text,
	`products` text,
	`correction` tinyint(1),
	`order_statuses` varchar(100),
	`geos_all` tinyint(4),
	`geos` varchar(255),
	`products_filter_url` text,
	`customers_filter_url` text,
	`start_date` date,
	`end_date` date,
	`products_all` tinyint(1),
	`customers_all` tinyint(1),
	`discount_variant_discount` varchar(50),
	`discount_variant_condition` varchar(50),
	`discount_variant_specials` varchar(50),
	`discount_variant_options` varchar(50)
);
--> statement-breakpoint
CREATE TABLE `oc_hd_accumulative_discount_editor` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`discount_id` int(11),
	`editor_id` int(11),
	`discount_status_id` int(11),
	`discount_function_orders` varchar(5),
	`discount_function_products` varchar(5),
	`discount_function_sum` varchar(20),
	`discount_function` varchar(50),
	`discount_percent` varchar(5),
	`discount_type` varchar(50),
	`start_date` date,
	`end_date` date,
	`status` tinyint(1)
);
--> statement-breakpoint
CREATE TABLE `oc_hd_info` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(500) NOT NULL,
	`description` varchar(500) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_hd_kit` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(500),
	`description` varchar(500),
	`correction` int(1),
	`status` tinyint(1),
	`shops_all` tinyint(1),
	`shops` varchar(255),
	`customers_all` tinyint(1),
	`customers` text,
	`guests` tinyint(1),
	`geos_all` tinyint(4),
	`geos` varchar(255),
	`customers_filter_url` text
);
--> statement-breakpoint
CREATE TABLE `oc_hd_kit_discount_editor` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`discount_id` int(11),
	`editor_id` int(11),
	`discount_count_products` varchar(5),
	`discount_accumulation_sum` varchar(20),
	`discount_function` varchar(50),
	`discount_percent` varchar(5),
	`discount_type` varchar(50),
	`start_date` date,
	`end_date` date,
	`products_all` tinyint(1),
	`products` text,
	`discount_variant_discount` varchar(50),
	`discount_variant_condition` varchar(50),
	`discount_variant_specials` varchar(50),
	`discount_variant_options` varchar(50),
	`status` tinyint(1),
	`products_filter_url` text,
	`products2` text,
	`type_qty` tinyint(1),
	`discount_count_products2` varchar(5),
	`products_filter_url2` text
);
--> statement-breakpoint
CREATE TABLE `oc_hd_level` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(500),
	`description` varchar(500),
	`status` tinyint(1),
	`shops_all` tinyint(1),
	`shops` varchar(255),
	`products` text,
	`order_statuses` varchar(100),
	`products_filter_url` text,
	`start_date` date,
	`end_date` date,
	`products_all` tinyint(1)
);
--> statement-breakpoint
CREATE TABLE `oc_hd_level_editor` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`levels_id` int(11),
	`editor_id` int(11),
	`level_status_id` int(11),
	`level_function_orders` varchar(5),
	`level_function_products` varchar(5),
	`level_function_sum` varchar(20),
	`level_function` varchar(50),
	`start_date` date,
	`end_date` date,
	`status` tinyint(1)
);
--> statement-breakpoint
CREATE TABLE `oc_hd_product` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(500),
	`description` varchar(500),
	`status` tinyint(1),
	`shops_all` tinyint(1),
	`shops` varchar(255),
	`cost` varchar(55),
	`round` varchar(55)
);
--> statement-breakpoint
CREATE TABLE `oc_hd_product_discount_editor` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`discount_id` int(11),
	`editor_id` int(11),
	`discount_count_products` varchar(5),
	`start_date` date,
	`end_date` date,
	`products_all` tinyint(1),
	`products` text,
	`status` tinyint(1),
	`products_filter_url` text,
	`discount_coef1` varchar(5),
	`discount_coef2` varchar(5),
	`discount_coef3` varchar(5),
	`discount_priority` varchar(5),
	`discount_type1` varchar(5),
	`discount_type2` varchar(5),
	`discount_type3` varchar(5),
	`hd_product_discount_editor` text,
	`discount_week` text,
	`discount_time` text,
	`discount_period` varchar(55),
	`save_time` int(11),
	`customer_groups` text
);
--> statement-breakpoint
CREATE TABLE `oc_hd_products` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`price` float,
	`options` text,
	`discounts` text,
	`specials` text
);
--> statement-breakpoint
CREATE TABLE `oc_hd_quantitative` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(500),
	`description` varchar(500),
	`status` tinyint(1),
	`shops_all` tinyint(1),
	`shops` varchar(255),
	`customers_all` tinyint(1),
	`customers` text,
	`correction` int(1),
	`guests` tinyint(1),
	`geos_all` tinyint(4),
	`geos` varchar(255),
	`customers_filter_url` text
);
--> statement-breakpoint
CREATE TABLE `oc_hd_quantitative_discount_editor` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`discount_id` int(11),
	`editor_id` int(11),
	`discount_count_products` varchar(11),
	`discount_accumulation_sum` varchar(11),
	`discount_function` varchar(50),
	`discount_percent` varchar(5),
	`discount_type` varchar(50),
	`start_date` date,
	`end_date` date,
	`products_all` tinyint(1),
	`products` text,
	`discount_variant_discount` varchar(50),
	`discount_variant_condition` varchar(50),
	`discount_variant_specials` varchar(50),
	`discount_variant_options` varchar(50),
	`status` tinyint(1),
	`products_filter_url` text
);
--> statement-breakpoint
CREATE TABLE `oc_hd_setting` (
	`key` varchar(255) NOT NULL,
	`value` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_hd_specials` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(500),
	`description` varchar(500),
	`status` tinyint(1),
	`shops_all` tinyint(1),
	`shops` varchar(255),
	`cost` varchar(55),
	`round` varchar(55)
);
--> statement-breakpoint
CREATE TABLE `oc_hd_specials_discount_editor` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`discount_id` int(11),
	`editor_id` int(11),
	`start_date` date,
	`end_date` date,
	`products_all` tinyint(1),
	`products` text,
	`status` tinyint(1),
	`products_filter_url` text,
	`discount_coef1` varchar(5),
	`discount_coef2` varchar(5),
	`discount_coef3` varchar(5),
	`discount_priority` varchar(5),
	`discount_type1` varchar(5),
	`discount_type2` varchar(5),
	`discount_type3` varchar(5),
	`customer_groups` text,
	`discount_week` text,
	`discount_time` text,
	`discount_period` varchar(55),
	`save_time` int(11)
);
--> statement-breakpoint
CREATE TABLE `oc_hd_users` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(500),
	`description` varchar(500),
	`status` tinyint(1),
	`shops_all` tinyint(1),
	`shops` varchar(255),
	`geos_all` tinyint(4),
	`geos` varchar(255),
	`customers_all` tinyint(1),
	`customers` text,
	`guests` tinyint(1),
	`customers_filter_url` text,
	`correction` int(1)
);
--> statement-breakpoint
CREATE TABLE `oc_hd_users_discount_editor` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`editor_id` int(11),
	`discount_id` int(11),
	`products` text,
	`products_filter_url` text,
	`discount_variant_discount` text,
	`discount_variant_condition` text,
	`discount_variant_specials` text,
	`discount_variant_options` text,
	`status` tinyint(1),
	`discount_percent` varchar(5),
	`start_date` date,
	`end_date` date,
	`products_all` tinyint(1),
	`discount_type` varchar(50)
);
--> statement-breakpoint
CREATE TABLE `oc_hd_wholesale` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(500),
	`description` varchar(500),
	`status` tinyint(1),
	`shops_all` tinyint(1),
	`shops` varchar(255),
	`cost` varchar(55),
	`round` varchar(55)
);
--> statement-breakpoint
CREATE TABLE `oc_hd_wholesale_discount_editor` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`discount_id` int(11),
	`editor_id` int(11),
	`start_date` date,
	`end_date` date,
	`products_all` tinyint(1),
	`products` text,
	`status` tinyint(1),
	`products_filter_url` text,
	`discount_coef1` varchar(5),
	`discount_coef2` varchar(5),
	`discount_coef3` varchar(5),
	`discount_priority` varchar(5),
	`discount_type1` varchar(5),
	`discount_type2` varchar(5),
	`discount_type3` varchar(5),
	`hd_product_discount_editor` text,
	`discount_week` text,
	`discount_time` text,
	`discount_period` varchar(55),
	`save_time` int(11),
	`customer_groups` text
);
--> statement-breakpoint
CREATE TABLE `oc_information` (
	`information_id` int(11) AUTO_INCREMENT NOT NULL,
	`bottom` int(1) NOT NULL DEFAULT 0,
	`sort_order` int(3) NOT NULL DEFAULT 0,
	`status` tinyint(1) NOT NULL DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `oc_information_description` (
	`information_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`title` varchar(64) NOT NULL,
	`description` longtext NOT NULL,
	`meta_title` varchar(255) NOT NULL,
	`meta_h1` varchar(255) NOT NULL,
	`meta_description` varchar(255) NOT NULL,
	`meta_keyword` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_information_to_layout` (
	`information_id` int(11) NOT NULL,
	`store_id` int(11) NOT NULL,
	`layout_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_information_to_store` (
	`information_id` int(11) NOT NULL,
	`store_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_kit_price` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`session_id` varchar(32) NOT NULL,
	`product_id` int(11) NOT NULL,
	`price` decimal(15,4) NOT NULL DEFAULT '0.0000',
	`special` decimal(15,4) NOT NULL DEFAULT '0.0000'
);
--> statement-breakpoint
CREATE TABLE `oc_labels` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`product_id` int(11) NOT NULL DEFAULT 0,
	`category_id` int(11) NOT NULL DEFAULT 0,
	`json_val` varchar(5000) NOT NULL DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `oc_language` (
	`language_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(32) NOT NULL,
	`code` varchar(5) NOT NULL,
	`locale` varchar(255) NOT NULL,
	`image` varchar(64) NOT NULL,
	`directory` varchar(32) NOT NULL,
	`sort_order` int(3) NOT NULL DEFAULT 0,
	`status` tinyint(1) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_layout` (
	`layout_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_layout_module` (
	`layout_module_id` int(11) AUTO_INCREMENT NOT NULL,
	`layout_id` int(11) NOT NULL,
	`code` varchar(64) NOT NULL,
	`position` varchar(14) NOT NULL,
	`sort_order` int(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_layout_route` (
	`layout_route_id` int(11) AUTO_INCREMENT NOT NULL,
	`layout_id` int(11) NOT NULL,
	`store_id` int(11) NOT NULL,
	`route` varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_length_class` (
	`length_class_id` int(11) AUTO_INCREMENT NOT NULL,
	`value` decimal(15,2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_length_class_description` (
	`length_class_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`title` varchar(32) NOT NULL,
	`unit` varchar(4) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_location` (
	`location_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(32) NOT NULL,
	`address` text NOT NULL,
	`telephone` varchar(32) NOT NULL,
	`fax` varchar(32) NOT NULL,
	`geocode` varchar(32) NOT NULL,
	`image` varchar(255),
	`open` text NOT NULL,
	`comment` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_manufacturer` (
	`manufacturer_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`image` varchar(255),
	`yomenu_icon` varchar(255),
	`yomenu_image` varchar(255),
	`sort_order` int(3) NOT NULL,
	`yomenu_content` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_manufacturer_description` (
	`manufacturer_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(64) NOT NULL,
	`description` text NOT NULL,
	`meta_title` varchar(255) NOT NULL,
	`meta_h1` varchar(255) NOT NULL,
	`meta_description` varchar(255) NOT NULL,
	`meta_keyword` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_manufacturer_to_1c` (
	`manufacturer_id` int(11) NOT NULL,
	`guid` varchar(64) NOT NULL,
	CONSTRAINT `manufacturer_link` UNIQUE(`manufacturer_id`,`guid`)
);
--> statement-breakpoint
CREATE TABLE `oc_manufacturer_to_store` (
	`manufacturer_id` int(11) NOT NULL,
	`store_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_marketing` (
	`marketing_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(32) NOT NULL,
	`description` text NOT NULL,
	`code` varchar(64) NOT NULL,
	`clicks` int(5) NOT NULL DEFAULT 0,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_megamenu_key` (
	`key` text NOT NULL,
	`license_key` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_megamenuvh` (
	`megamenu_id` int(11) AUTO_INCREMENT NOT NULL,
	`namemenu` text NOT NULL,
	`additional_menu` varchar(45) NOT NULL,
	`link` text NOT NULL,
	`menu_type` varchar(45) NOT NULL,
	`status` tinyint(1) NOT NULL DEFAULT 1,
	`sticker_parent` varchar(255) NOT NULL,
	`sticker_parent_bg` varchar(255) NOT NULL,
	`spctext` varchar(255) NOT NULL,
	`sort_menu` int(3) NOT NULL DEFAULT 0,
	`image` varchar(255) NOT NULL,
	`image_hover` varchar(255) NOT NULL,
	`informations_list` longtext NOT NULL,
	`manufacturers_setting` longtext NOT NULL,
	`products_setting` longtext NOT NULL,
	`link_setting` tinyint(1) NOT NULL,
	`category_setting` longtext NOT NULL,
	`html_setting` longtext NOT NULL,
	`freelinks_setting` longtext NOT NULL,
	`use_add_html` tinyint(1) NOT NULL,
	`add_html` longtext NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_megamenuvh_sheme` (
	`megamenu_id` int(11) AUTO_INCREMENT NOT NULL,
	`mm_sheme_id` int(11) NOT NULL,
	`namemenu` varchar(255) NOT NULL,
	`link` text NOT NULL,
	`menu_type` varchar(45) NOT NULL,
	`status` tinyint(1) NOT NULL DEFAULT 1,
	`sticker_parent` varchar(255) NOT NULL,
	`sticker_parent_bg` varchar(255) NOT NULL,
	`spctext` varchar(255) NOT NULL,
	`sort_menu` int(3) NOT NULL DEFAULT 0,
	`image` varchar(255) NOT NULL,
	`image_hover` varchar(255) NOT NULL,
	`informations_list` longtext NOT NULL,
	`manufacturers_setting` longtext NOT NULL,
	`products_setting` longtext NOT NULL,
	`link_setting` tinyint(1) NOT NULL,
	`category_setting` longtext NOT NULL,
	`html_setting` longtext NOT NULL,
	`freelinks_setting` longtext NOT NULL,
	`use_add_html` tinyint(1) NOT NULL,
	`add_html` longtext NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_megamenuvh_sheme_list` (
	`mm_sheme_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`menu_sheme_type` int(1) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_menu` (
	`menu_id` int(11) AUTO_INCREMENT NOT NULL,
	`store_id` int(11) NOT NULL,
	`type` varchar(6) NOT NULL,
	`link` varchar(255) NOT NULL,
	`sort_order` int(3) NOT NULL,
	`status` tinyint(1) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_menu_description` (
	`menu_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_menu_module` (
	`menu_module_id` int(11) NOT NULL,
	`menu_id` int(11) NOT NULL,
	`code` varchar(64) NOT NULL,
	`sort_order` int(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_modification` (
	`modification_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`code` varchar(64) NOT NULL,
	`author` varchar(64) NOT NULL,
	`version` varchar(32) NOT NULL,
	`link` varchar(255) NOT NULL,
	`xml` mediumtext NOT NULL,
	`status` tinyint(1) NOT NULL,
	`date_added` datetime NOT NULL,
	`date_modified` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_module` (
	`module_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`code` varchar(32) NOT NULL,
	`setting` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_ocfilter_option` (
	`option_id` int(11) AUTO_INCREMENT NOT NULL,
	`type` varchar(16) NOT NULL DEFAULT 'checkbox',
	`keyword` varchar(255) NOT NULL DEFAULT '',
	`selectbox` tinyint(1) NOT NULL DEFAULT 0,
	`grouping` tinyint(2) NOT NULL DEFAULT 0,
	`color` tinyint(1) NOT NULL DEFAULT 0,
	`image` tinyint(1) NOT NULL DEFAULT 0,
	`status` tinyint(1) NOT NULL DEFAULT 1,
	`sort_order` int(11) NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `oc_ocfilter_option_description` (
	`option_id` int(11) NOT NULL,
	`language_id` tinyint(2) NOT NULL,
	`name` varchar(255) NOT NULL DEFAULT '',
	`postfix` varchar(32) NOT NULL DEFAULT '',
	`description` varchar(255) NOT NULL DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `oc_ocfilter_option_to_category` (
	`option_id` int(11) NOT NULL,
	`category_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_ocfilter_option_to_store` (
	`option_id` int(11) NOT NULL,
	`store_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_ocfilter_option_value` (
	`value_id` bigint(20) AUTO_INCREMENT NOT NULL,
	`option_id` int(11) NOT NULL DEFAULT 0,
	`keyword` varchar(255) NOT NULL DEFAULT '',
	`color` varchar(6) NOT NULL DEFAULT '',
	`image` varchar(255) NOT NULL DEFAULT '',
	`sort_order` int(11) NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `oc_ocfilter_option_value_description` (
	`value_id` bigint(20) NOT NULL,
	`option_id` int(11) NOT NULL,
	`language_id` tinyint(2) NOT NULL,
	`name` varchar(255) NOT NULL DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `oc_ocfilter_option_value_to_product` (
	`ocfilter_option_value_to_product_id` int(11) AUTO_INCREMENT NOT NULL,
	`product_id` int(11) NOT NULL,
	`option_id` int(11) NOT NULL,
	`value_id` bigint(20) NOT NULL,
	`slide_value_min` decimal(15,4) NOT NULL DEFAULT '0.0000',
	`slide_value_max` decimal(15,4) NOT NULL DEFAULT '0.0000',
	CONSTRAINT `option_id_value_id_product_id` UNIQUE(`option_id`,`value_id`,`product_id`)
);
--> statement-breakpoint
CREATE TABLE `oc_ocfilter_option_value_to_product_description` (
	`product_id` int(11) NOT NULL,
	`value_id` bigint(20) NOT NULL,
	`option_id` int(11) NOT NULL,
	`language_id` tinyint(2) NOT NULL,
	`description` varchar(255) NOT NULL DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `oc_ocfilter_page` (
	`ocfilter_page_id` int(11) AUTO_INCREMENT NOT NULL,
	`category_id` int(11) NOT NULL DEFAULT 0,
	`keyword` varchar(255) NOT NULL,
	`params` varchar(255) NOT NULL,
	`over` set('domain','category') NOT NULL DEFAULT 'category',
	`status` tinyint(1) NOT NULL DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `oc_ocfilter_page_description` (
	`ocfilter_page_id` int(11) NOT NULL DEFAULT 0,
	`language_id` int(11) NOT NULL DEFAULT 0,
	`meta_title` varchar(255) NOT NULL,
	`meta_keyword` varchar(255) NOT NULL,
	`meta_description` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`title` varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_option` (
	`option_id` int(11) AUTO_INCREMENT NOT NULL,
	`type` varchar(32) NOT NULL,
	`sort_order` int(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_option_description` (
	`option_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_option_value` (
	`option_value_id` int(11) AUTO_INCREMENT NOT NULL,
	`option_id` int(11) NOT NULL,
	`image` varchar(255) NOT NULL,
	`sort_order` int(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_option_value_description` (
	`option_value_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`option_id` int(11) NOT NULL,
	`name` varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_order` (
	`order_id` int(11) AUTO_INCREMENT NOT NULL,
	`track_no` varchar(32) NOT NULL,
	`invoice_no` int(11) NOT NULL DEFAULT 0,
	`invoice_prefix` varchar(26) NOT NULL,
	`store_id` int(11) NOT NULL DEFAULT 0,
	`store_name` varchar(64) NOT NULL,
	`store_url` varchar(255) NOT NULL,
	`customer_id` int(11) NOT NULL DEFAULT 0,
	`customer_group_id` int(11) NOT NULL DEFAULT 0,
	`firstname` varchar(32) NOT NULL,
	`lastname` varchar(32) NOT NULL,
	`email` varchar(96) NOT NULL,
	`telephone` varchar(32) NOT NULL,
	`fax` varchar(32) NOT NULL,
	`custom_field` text NOT NULL,
	`payment_firstname` varchar(32) NOT NULL,
	`payment_lastname` varchar(32) NOT NULL,
	`payment_company` varchar(60) NOT NULL,
	`payment_address_1` varchar(128) NOT NULL,
	`payment_address_2` varchar(128) NOT NULL,
	`payment_city` varchar(128) NOT NULL,
	`payment_postcode` varchar(10) NOT NULL,
	`payment_country` varchar(128) NOT NULL,
	`payment_country_id` int(11) NOT NULL,
	`payment_zone` varchar(128) NOT NULL,
	`payment_zone_id` int(11) NOT NULL,
	`payment_address_format` text NOT NULL,
	`payment_custom_field` text NOT NULL,
	`payment_method` varchar(128) NOT NULL,
	`payment_code` varchar(128) NOT NULL,
	`shipping_firstname` varchar(32) NOT NULL,
	`shipping_lastname` varchar(32) NOT NULL,
	`shipping_company` varchar(40) NOT NULL,
	`shipping_address_1` varchar(128) NOT NULL,
	`shipping_address_2` varchar(128) NOT NULL,
	`shipping_city` varchar(128) NOT NULL,
	`shipping_postcode` varchar(10) NOT NULL,
	`shipping_country` varchar(128) NOT NULL,
	`shipping_country_id` int(11) NOT NULL,
	`shipping_zone` varchar(128) NOT NULL,
	`shipping_zone_id` int(11) NOT NULL,
	`shipping_address_format` text NOT NULL,
	`shipping_custom_field` text NOT NULL,
	`shipping_method` varchar(128) NOT NULL,
	`shipping_code` varchar(128) NOT NULL,
	`comment` text NOT NULL,
	`total` decimal(15,4) NOT NULL DEFAULT '0.0000',
	`order_status_id` int(11) NOT NULL DEFAULT 0,
	`affiliate_id` int(11) NOT NULL,
	`commission` decimal(15,4) NOT NULL,
	`marketing_id` int(11) NOT NULL,
	`tracking` varchar(64) NOT NULL,
	`language_id` int(11) NOT NULL,
	`currency_id` int(11) NOT NULL,
	`currency_code` varchar(3) NOT NULL,
	`currency_value` decimal(15,8) NOT NULL DEFAULT '1.00000000',
	`ip` varchar(40) NOT NULL,
	`forwarded_ip` varchar(40) NOT NULL,
	`user_agent` varchar(255) NOT NULL,
	`accept_language` varchar(255) NOT NULL,
	`date_added` datetime NOT NULL,
	`date_modified` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_order_custom_field` (
	`order_custom_field_id` int(11) AUTO_INCREMENT NOT NULL,
	`order_id` int(11) NOT NULL,
	`custom_field_id` int(11) NOT NULL,
	`custom_field_value_id` int(11) NOT NULL,
	`name` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`type` varchar(32) NOT NULL,
	`location` varchar(16) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_order_history` (
	`order_history_id` int(11) AUTO_INCREMENT NOT NULL,
	`order_id` int(11) NOT NULL,
	`order_status_id` int(11) NOT NULL,
	`notify` tinyint(1) NOT NULL DEFAULT 0,
	`comment` text NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_order_option` (
	`order_option_id` int(11) AUTO_INCREMENT NOT NULL,
	`order_id` int(11) NOT NULL,
	`order_product_id` int(11) NOT NULL,
	`product_option_id` int(11) NOT NULL,
	`product_option_value_id` int(11) NOT NULL DEFAULT 0,
	`name` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`type` varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_order_product` (
	`order_product_id` int(11) AUTO_INCREMENT NOT NULL,
	`order_id` int(11) NOT NULL,
	`product_id` int(11) NOT NULL,
	`name` varchar(1024),
	`model` varchar(64) NOT NULL,
	`quantity` int(4) NOT NULL,
	`unit_id` int(4) DEFAULT 0,
	`price` decimal(15,4) NOT NULL DEFAULT '0.0000',
	`total` decimal(15,4) NOT NULL DEFAULT '0.0000',
	`tax` decimal(15,4) NOT NULL DEFAULT '0.0000',
	`reward` int(8) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_order_recurring` (
	`order_recurring_id` int(11) AUTO_INCREMENT NOT NULL,
	`order_id` int(11) NOT NULL,
	`reference` varchar(255) NOT NULL,
	`product_id` int(11) NOT NULL,
	`product_name` varchar(255) NOT NULL,
	`product_quantity` int(11) NOT NULL,
	`recurring_id` int(11) NOT NULL,
	`recurring_name` varchar(255) NOT NULL,
	`recurring_description` varchar(255) NOT NULL,
	`recurring_frequency` varchar(25) NOT NULL,
	`recurring_cycle` smallint(6) NOT NULL,
	`recurring_duration` smallint(6) NOT NULL,
	`recurring_price` decimal(10,4) NOT NULL,
	`trial` tinyint(1) NOT NULL,
	`trial_frequency` varchar(25) NOT NULL,
	`trial_cycle` smallint(6) NOT NULL,
	`trial_duration` smallint(6) NOT NULL,
	`trial_price` decimal(10,4) NOT NULL,
	`status` tinyint(4) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_order_recurring_transaction` (
	`order_recurring_transaction_id` int(11) AUTO_INCREMENT NOT NULL,
	`order_recurring_id` int(11) NOT NULL,
	`reference` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`amount` decimal(10,4) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_order_simple_fields` (
	`order_id` int(11) NOT NULL,
	`requisites` varchar(255) NOT NULL DEFAULT '',
	`metadata` text
);
--> statement-breakpoint
CREATE TABLE `oc_order_status` (
	`order_status_id` int(11) AUTO_INCREMENT NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_order_total` (
	`order_total_id` int(10) AUTO_INCREMENT NOT NULL,
	`order_id` int(11) NOT NULL,
	`code` varchar(32) NOT NULL,
	`title` varchar(255) NOT NULL,
	`value` decimal(15,4) NOT NULL DEFAULT '0.0000',
	`sort_order` int(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_order_voucher` (
	`order_voucher_id` int(11) AUTO_INCREMENT NOT NULL,
	`order_id` int(11) NOT NULL,
	`voucher_id` int(11) NOT NULL,
	`description` varchar(255) NOT NULL,
	`code` varchar(10) NOT NULL,
	`from_name` varchar(64) NOT NULL,
	`from_email` varchar(96) NOT NULL,
	`to_name` varchar(64) NOT NULL,
	`to_email` varchar(96) NOT NULL,
	`voucher_theme_id` int(11) NOT NULL,
	`message` text NOT NULL,
	`amount` decimal(15,4) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_product` (
	`product_id` int(11) AUTO_INCREMENT NOT NULL,
	`model` varchar(64) NOT NULL,
	`sku` varchar(64) NOT NULL,
	`upc` varchar(12) NOT NULL,
	`ean` varchar(14) NOT NULL,
	`jan` varchar(13) NOT NULL,
	`isbn` varchar(17) NOT NULL,
	`mpn` varchar(64) NOT NULL,
	`location` varchar(128) NOT NULL,
	`quantity` decimal(15,3) NOT NULL DEFAULT '0.000',
	`stock_status_id` int(11) NOT NULL,
	`image` varchar(255),
	`video` varchar(128) NOT NULL DEFAULT '',
	`manufacturer_id` int(11) NOT NULL,
	`shipping` tinyint(1) NOT NULL DEFAULT 1,
	`price` decimal(15,4) NOT NULL DEFAULT '0.0000',
	`points` int(8) NOT NULL DEFAULT 0,
	`tax_class_id` int(11) NOT NULL,
	`date_available` date NOT NULL DEFAULT '0000-00-00',
	`weight` decimal(15,3) NOT NULL DEFAULT '0.000',
	`weight_class_id` int(11) NOT NULL DEFAULT 0,
	`length` decimal(15,2) NOT NULL DEFAULT '0.00',
	`width` decimal(15,2) NOT NULL DEFAULT '0.00',
	`height` decimal(15,2) NOT NULL DEFAULT '0.00',
	`length_class_id` int(11) NOT NULL DEFAULT 0,
	`subtract` tinyint(1) NOT NULL DEFAULT 1,
	`minimum` int(11) NOT NULL DEFAULT 1,
	`sort_order` int(11) NOT NULL DEFAULT 0,
	`status` tinyint(1) NOT NULL DEFAULT 0,
	`viewed` int(5) NOT NULL DEFAULT 0,
	`date_added` datetime NOT NULL,
	`date_modified` datetime NOT NULL,
	`gp_parent_id` int(11) NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `oc_product_accessories` (
	`accessories_id` int(11) AUTO_INCREMENT NOT NULL,
	`product_id` int(11),
	`accessories_product_str_id` text
);
--> statement-breakpoint
CREATE TABLE `oc_product_attribute` (
	`product_id` int(11) NOT NULL,
	`attribute_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`text` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_product_description` (
	`product_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`tag` text NOT NULL,
	`meta_title` varchar(255) NOT NULL,
	`meta_h1` varchar(255) NOT NULL,
	`meta_description` varchar(500) NOT NULL,
	`meta_keyword` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_product_discount` (
	`product_discount_id` int(11) AUTO_INCREMENT NOT NULL,
	`product_id` int(11) NOT NULL,
	`customer_group_id` int(11) NOT NULL,
	`quantity` int(4) NOT NULL DEFAULT 0,
	`priority` int(5) NOT NULL DEFAULT 1,
	`price` decimal(15,4) NOT NULL DEFAULT '0.0000',
	`date_start` date NOT NULL DEFAULT '0000-00-00',
	`date_end` date NOT NULL DEFAULT '0000-00-00'
);
--> statement-breakpoint
CREATE TABLE `oc_product_feature` (
	`product_feature_id` int(11) AUTO_INCREMENT NOT NULL,
	`product_id` int(11) NOT NULL,
	`ean` varchar(14) NOT NULL DEFAULT '',
	`name` varchar(255) NOT NULL DEFAULT '',
	`sku` varchar(128) NOT NULL DEFAULT '',
	`guid` varchar(64) NOT NULL,
	CONSTRAINT `product_feature_key` UNIQUE(`product_id`,`guid`)
);
--> statement-breakpoint
CREATE TABLE `oc_product_feature_value` (
	`product_feature_id` int(11) NOT NULL,
	`product_option_id` int(11) NOT NULL,
	`product_id` int(11) NOT NULL,
	`product_option_value_id` int(11) NOT NULL,
	CONSTRAINT `product_feature_value_key` UNIQUE(`product_feature_id`,`product_id`,`product_option_value_id`)
);
--> statement-breakpoint
CREATE TABLE `oc_product_filter` (
	`product_id` int(11) NOT NULL,
	`filter_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_product_image` (
	`product_image_id` int(11) AUTO_INCREMENT NOT NULL,
	`product_id` int(11) NOT NULL,
	`image` varchar(255),
	`sort_order` int(3) NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `oc_product_image_description` (
	`product_image_id` int(11) NOT NULL,
	`product_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(255) NOT NULL DEFAULT '',
	CONSTRAINT `product_image_desc_key` UNIQUE(`product_image_id`,`product_id`,`language_id`)
);
--> statement-breakpoint
CREATE TABLE `oc_product_master` (
	`master_product_id` int(10) NOT NULL,
	`product_id` int(10) unsigned NOT NULL,
	`special_attribute_group_id` int(10) unsigned NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_product_option` (
	`product_option_id` int(11) AUTO_INCREMENT NOT NULL,
	`product_id` int(11) NOT NULL,
	`option_id` int(11) NOT NULL,
	`value` text NOT NULL,
	`required` tinyint(1) NOT NULL,
	`owq_setting` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_product_option_value` (
	`product_option_value_id` int(11) AUTO_INCREMENT NOT NULL,
	`product_option_id` int(11) NOT NULL,
	`product_id` int(11) NOT NULL,
	`option_id` int(11) NOT NULL,
	`option_value_id` int(11) NOT NULL,
	`quantity` decimal(15,3) NOT NULL DEFAULT '0.000',
	`subtract` tinyint(1) NOT NULL,
	`price` decimal(15,4) NOT NULL,
	`price_prefix` varchar(1) NOT NULL,
	`points` int(8) NOT NULL,
	`points_prefix` varchar(1) NOT NULL,
	`weight` decimal(15,2) NOT NULL,
	`weight_prefix` varchar(1) NOT NULL,
	`option_select` tinyint(1) NOT NULL,
	`is_default` int(11) NOT NULL DEFAULT 0,
	`image` varchar(255) NOT NULL DEFAULT '',
	`sku` varchar(64) NOT NULL DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `oc_product_price` (
	`product_price_id` int(11) AUTO_INCREMENT NOT NULL,
	`product_id` int(11) NOT NULL,
	`product_feature_id` int(11) NOT NULL DEFAULT 0,
	`customer_group_id` int(11) NOT NULL DEFAULT 0,
	`action` int(1) NOT NULL,
	`price` decimal(15,4) NOT NULL DEFAULT '0.0000',
	`unit_id` int(4) DEFAULT 0,
	CONSTRAINT `product_price_key` UNIQUE(`product_id`,`product_feature_id`,`customer_group_id`,`action`)
);
--> statement-breakpoint
CREATE TABLE `oc_product_quantity` (
	`product_quantity_id` int(11) AUTO_INCREMENT NOT NULL,
	`product_id` int(11) NOT NULL,
	`product_feature_id` int(11) NOT NULL DEFAULT 0,
	`warehouse_id` int(11) NOT NULL DEFAULT 0,
	`quantity` decimal(10,3) DEFAULT '0.000',
	CONSTRAINT `product_quantity_key` UNIQUE(`product_id`,`product_feature_id`,`warehouse_id`)
);
--> statement-breakpoint
CREATE TABLE `oc_product_recurring` (
	`product_id` int(11) NOT NULL,
	`recurring_id` int(11) NOT NULL,
	`customer_group_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_product_related` (
	`product_id` int(11) NOT NULL,
	`related_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_product_reward` (
	`product_reward_id` int(11) AUTO_INCREMENT NOT NULL,
	`product_id` int(11) NOT NULL DEFAULT 0,
	`customer_group_id` int(11) NOT NULL DEFAULT 0,
	`points` int(8) NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `oc_product_special` (
	`product_special_id` int(11) AUTO_INCREMENT NOT NULL,
	`product_id` int(11) NOT NULL,
	`customer_group_id` int(11) NOT NULL,
	`priority` int(5) NOT NULL DEFAULT 1,
	`price` decimal(15,4) NOT NULL DEFAULT '0.0000',
	`date_start` date NOT NULL DEFAULT '0000-00-00',
	`date_end` date NOT NULL DEFAULT '0000-00-00',
	`discount_week` text,
	`discount_time` text,
	`discount_period` varchar(55),
	`save_time` int(11)
);
--> statement-breakpoint
CREATE TABLE `oc_product_special_attribute` (
	`product_special_attribute_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`product_id` int(10) unsigned NOT NULL,
	`special_attribute_id` int(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_product_to_1c` (
	`product_id` int(11) NOT NULL,
	`guid` varchar(64) NOT NULL,
	CONSTRAINT `product_link` UNIQUE(`product_id`,`guid`)
);
--> statement-breakpoint
CREATE TABLE `oc_product_to_category` (
	`product_id` int(11) NOT NULL,
	`category_id` int(11) NOT NULL,
	`main_category` tinyint(1) NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `oc_product_to_download` (
	`product_id` int(11) NOT NULL,
	`download_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_product_to_layout` (
	`product_id` int(11) NOT NULL,
	`store_id` int(11) NOT NULL,
	`layout_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_product_to_store` (
	`product_id` int(11) NOT NULL,
	`store_id` int(11) NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `oc_product_unit` (
	`product_unit_id` int(11) AUTO_INCREMENT NOT NULL,
	`product_id` int(11) NOT NULL,
	`product_feature_id` int(11) NOT NULL DEFAULT 0,
	`unit_id` int(11) NOT NULL DEFAULT 0,
	`ratio` int(9) DEFAULT 1,
	CONSTRAINT `product_unit_key` UNIQUE(`product_id`,`product_feature_id`,`unit_id`)
);
--> statement-breakpoint
CREATE TABLE `oc_product_video` (
	`product_video_id` int(11) AUTO_INCREMENT NOT NULL,
	`product_id` int(11) NOT NULL,
	`video` varchar(32),
	`title` varchar(128) NOT NULL,
	`sort_order` int(3) NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `oc_raiff_links` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`order_id` int(11) NOT NULL,
	`link` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_recurring` (
	`recurring_id` int(11) AUTO_INCREMENT NOT NULL,
	`price` decimal(10,4) NOT NULL,
	`frequency` enum('day','week','semi_month','month','year') NOT NULL,
	`duration` int(10) unsigned NOT NULL,
	`cycle` int(10) unsigned NOT NULL,
	`trial_status` tinyint(4) NOT NULL,
	`trial_price` decimal(10,4) NOT NULL,
	`trial_frequency` enum('day','week','semi_month','month','year') NOT NULL,
	`trial_duration` int(10) unsigned NOT NULL,
	`trial_cycle` int(10) unsigned NOT NULL,
	`status` tinyint(4) NOT NULL,
	`sort_order` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_recurring_description` (
	`recurring_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_return` (
	`return_id` int(11) AUTO_INCREMENT NOT NULL,
	`order_id` int(11) NOT NULL,
	`product_id` int(11) NOT NULL,
	`customer_id` int(11) NOT NULL,
	`firstname` varchar(32) NOT NULL,
	`lastname` varchar(32) NOT NULL,
	`email` varchar(96) NOT NULL,
	`telephone` varchar(32) NOT NULL,
	`product` varchar(255) NOT NULL,
	`model` varchar(64) NOT NULL,
	`quantity` int(4) NOT NULL,
	`opened` tinyint(1) NOT NULL,
	`return_reason_id` int(11) NOT NULL,
	`return_action_id` int(11) NOT NULL,
	`return_status_id` int(11) NOT NULL,
	`comment` text,
	`date_ordered` date NOT NULL DEFAULT '0000-00-00',
	`date_added` datetime NOT NULL,
	`date_modified` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_return_action` (
	`return_action_id` int(11) AUTO_INCREMENT NOT NULL,
	`language_id` int(11) NOT NULL DEFAULT 0,
	`name` varchar(64) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_return_history` (
	`return_history_id` int(11) AUTO_INCREMENT NOT NULL,
	`return_id` int(11) NOT NULL,
	`return_status_id` int(11) NOT NULL,
	`notify` tinyint(1) NOT NULL,
	`comment` text NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_return_reason` (
	`return_reason_id` int(11) AUTO_INCREMENT NOT NULL,
	`language_id` int(11) NOT NULL DEFAULT 0,
	`name` varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_return_status` (
	`return_status_id` int(11) AUTO_INCREMENT NOT NULL,
	`language_id` int(11) NOT NULL DEFAULT 0,
	`name` varchar(128) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_review` (
	`review_id` int(11) AUTO_INCREMENT NOT NULL,
	`product_id` int(11) NOT NULL,
	`customer_id` int(11) NOT NULL,
	`author` varchar(64) NOT NULL,
	`text` text NOT NULL,
	`rating` int(1) NOT NULL,
	`status` tinyint(1) NOT NULL DEFAULT 0,
	`date_added` datetime NOT NULL,
	`date_modified` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_setting` (
	`setting_id` int(11) AUTO_INCREMENT NOT NULL,
	`store_id` int(11) NOT NULL DEFAULT 0,
	`code` varchar(32) NOT NULL,
	`key` varchar(64) NOT NULL,
	`value` mediumtext NOT NULL,
	`serialized` tinyint(1) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_shipping_shiptor_address` (
	`address_id` int(11) AUTO_INCREMENT NOT NULL,
	`customer_id` int(11) NOT NULL,
	`kladr_id` varchar(25) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_shipping_shiptor_countries` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`code` varchar(5) NOT NULL,
	`name` varchar(30) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_shipping_shiptor_orders` (
	`order_id` int(11) NOT NULL,
	`shiptor_id` int(11) NOT NULL,
	`shipment_id` int(11) NOT NULL,
	`date_shipment` datetime NOT NULL,
	`delivery_point` int(11) NOT NULL,
	`patronymic` varchar(100) NOT NULL,
	`address` varchar(150) NOT NULL,
	`street` varchar(100) NOT NULL,
	`house` varchar(10) NOT NULL,
	`apartment` varchar(10) NOT NULL,
	`shipping_method` int(11) NOT NULL,
	`kladr_id` varchar(25) NOT NULL,
	`time` tinyint(1) NOT NULL,
	`weight` decimal(15,2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_shoputils_specials` (
	`specials_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(512) NOT NULL,
	`customer_group_ids` text NOT NULL,
	`priority` int(5) NOT NULL,
	`percent` decimal(10,2) NOT NULL,
	`date_start` date NOT NULL,
	`date_end` date NOT NULL,
	`objects_type` int(1) NOT NULL,
	`categories` text NOT NULL,
	`products` text NOT NULL,
	`manufacturers` text NOT NULL,
	`enabled` int(1) NOT NULL DEFAULT 1,
	`sort_order` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_simple_cart` (
	`simple_cart_id` int(11) AUTO_INCREMENT NOT NULL,
	`store_id` int(11),
	`customer_id` int(11),
	`email` varchar(96),
	`firstname` varchar(32),
	`lastname` varchar(32),
	`telephone` varchar(32),
	`products` text,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_special_attribute` (
	`special_attribute_id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`special_attribute_group_id` int(10) unsigned NOT NULL,
	`special_attribute_name` varchar(100) NOT NULL DEFAULT '',
	`special_attribute_value` varchar(2000) NOT NULL DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `oc_special_attribute_group` (
	`special_attribute_group_id` int(10) unsigned NOT NULL,
	`special_attribute_group_name` varchar(100) NOT NULL DEFAULT '',
	`special_attribute_group_description` varchar(4000) NOT NULL DEFAULT ''
);
--> statement-breakpoint
CREATE TABLE `oc_stock_status` (
	`stock_status_id` int(11) AUTO_INCREMENT NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_store` (
	`store_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`url` varchar(255) NOT NULL,
	`ssl` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_store_to_1c` (
	`store_id` int(11) NOT NULL,
	`guid` varchar(64) NOT NULL,
	CONSTRAINT `store_link` UNIQUE(`store_id`,`guid`)
);
--> statement-breakpoint
CREATE TABLE `oc_tax_class` (
	`tax_class_id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(32) NOT NULL,
	`description` varchar(255) NOT NULL,
	`date_added` datetime NOT NULL,
	`date_modified` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_tax_rate` (
	`tax_rate_id` int(11) AUTO_INCREMENT NOT NULL,
	`geo_zone_id` int(11) NOT NULL DEFAULT 0,
	`name` varchar(32) NOT NULL,
	`rate` decimal(15,4) NOT NULL DEFAULT '0.0000',
	`type` char(1) NOT NULL,
	`date_added` datetime NOT NULL,
	`date_modified` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_tax_rate_to_customer_group` (
	`tax_rate_id` int(11) NOT NULL,
	`customer_group_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_tax_rule` (
	`tax_rule_id` int(11) AUTO_INCREMENT NOT NULL,
	`tax_class_id` int(11) NOT NULL,
	`tax_rate_id` int(11) NOT NULL,
	`based` varchar(10) NOT NULL,
	`priority` int(5) NOT NULL DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `oc_theme` (
	`theme_id` int(11) AUTO_INCREMENT NOT NULL,
	`store_id` int(11) NOT NULL,
	`theme` varchar(64) NOT NULL,
	`route` varchar(64) NOT NULL,
	`code` mediumtext NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_translation` (
	`translation_id` int(11) AUTO_INCREMENT NOT NULL,
	`store_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`route` varchar(64) NOT NULL,
	`key` varchar(64) NOT NULL,
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_ulogin` (
	`id` int(10) unsigned AUTO_INCREMENT NOT NULL,
	`user_id` int(10) unsigned NOT NULL,
	`identity` varchar(255) NOT NULL,
	`network` varchar(50)
);
--> statement-breakpoint
CREATE TABLE `oc_unit` (
	`unit_id` smallint(6) AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`number_code` varchar(5) NOT NULL,
	`rus_name1` varchar(50) NOT NULL DEFAULT '',
	`eng_name1` varchar(50) NOT NULL DEFAULT '',
	`rus_name2` varchar(50) NOT NULL DEFAULT '',
	`eng_name2` varchar(50) NOT NULL DEFAULT '',
	`unit_group_id` tinyint(4) NOT NULL,
	`unit_type_id` tinyint(4) NOT NULL,
	`visible` tinyint(4) NOT NULL DEFAULT 1,
	`comment` varchar(255) NOT NULL DEFAULT '',
	CONSTRAINT `number_code` UNIQUE(`number_code`)
);
--> statement-breakpoint
CREATE TABLE `oc_unit_group` (
	`unit_group_id` tinyint(4) AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_unit_to_1c` (
	`unit_id` smallint(4) AUTO_INCREMENT NOT NULL,
	`guid` varchar(64) NOT NULL,
	`name` varchar(16) NOT NULL,
	`number_code` int(4) DEFAULT 0,
	`full_name` varchar(50) DEFAULT '',
	CONSTRAINT `unit_link` UNIQUE(`unit_id`,`guid`)
);
--> statement-breakpoint
CREATE TABLE `oc_unit_type` (
	`unit_type_id` tinyint(4) AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_upload` (
	`upload_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`filename` varchar(255) NOT NULL,
	`code` varchar(255) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_url_alias` (
	`url_alias_id` int(11) AUTO_INCREMENT NOT NULL,
	`query` varchar(255) NOT NULL,
	`keyword` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_user` (
	`user_id` int(11) AUTO_INCREMENT NOT NULL,
	`user_group_id` int(11) NOT NULL,
	`username` varchar(20) NOT NULL,
	`password` varchar(40) NOT NULL,
	`salt` varchar(9) NOT NULL,
	`firstname` varchar(32) NOT NULL,
	`lastname` varchar(32) NOT NULL,
	`email` varchar(96) NOT NULL,
	`image` varchar(255) NOT NULL,
	`code` varchar(40) NOT NULL,
	`ip` varchar(40) NOT NULL,
	`status` tinyint(1) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_user_group` (
	`user_group_id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(64) NOT NULL,
	`permission` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_voucher` (
	`voucher_id` int(11) AUTO_INCREMENT NOT NULL,
	`order_id` int(11) NOT NULL,
	`code` varchar(10) NOT NULL,
	`from_name` varchar(64) NOT NULL,
	`from_email` varchar(96) NOT NULL,
	`to_name` varchar(64) NOT NULL,
	`to_email` varchar(96) NOT NULL,
	`voucher_theme_id` int(11) NOT NULL,
	`message` text NOT NULL,
	`amount` decimal(15,4) NOT NULL,
	`status` tinyint(1) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_voucher_history` (
	`voucher_history_id` int(11) AUTO_INCREMENT NOT NULL,
	`voucher_id` int(11) NOT NULL,
	`order_id` int(11) NOT NULL,
	`amount` decimal(15,4) NOT NULL,
	`date_added` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_voucher_theme` (
	`voucher_theme_id` int(11) AUTO_INCREMENT NOT NULL,
	`image` varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_voucher_theme_description` (
	`voucher_theme_id` int(11) NOT NULL,
	`language_id` int(11) NOT NULL,
	`name` varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_warehouse` (
	`warehouse_id` smallint(3) AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL DEFAULT '',
	`guid` varchar(64) NOT NULL,
	CONSTRAINT `warehouse_link` UNIQUE(`warehouse_id`,`guid`)
);
--> statement-breakpoint
CREATE TABLE `oc_weight_class` (
	`weight_class_id` int(11) AUTO_INCREMENT NOT NULL,
	`value` decimal(15,2) NOT NULL DEFAULT '0.00'
);
--> statement-breakpoint
CREATE TABLE `oc_weight_class_description` (
	`weight_class_id` int(11) AUTO_INCREMENT NOT NULL,
	`language_id` int(11) NOT NULL,
	`title` varchar(32) NOT NULL,
	`unit` varchar(4) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oc_zone` (
	`zone_id` int(11) AUTO_INCREMENT NOT NULL,
	`country_id` int(11) NOT NULL,
	`name` varchar(128) NOT NULL,
	`code` varchar(32) NOT NULL,
	`status` tinyint(1) NOT NULL DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `oc_zone_to_geo_zone` (
	`zone_to_geo_zone_id` int(11) AUTO_INCREMENT NOT NULL,
	`country_id` int(11) NOT NULL,
	`zone_id` int(11) NOT NULL DEFAULT 0,
	`geo_zone_id` int(11) NOT NULL,
	`date_added` datetime NOT NULL,
	`date_modified` datetime NOT NULL
);
--> statement-breakpoint
CREATE TABLE `simple_geo` (
	`id` int(11) NOT NULL,
	`zone_id` int(11) NOT NULL,
	`name` varchar(128) NOT NULL,
	`fullname` varchar(512) NOT NULL,
	`postcode` varchar(6) NOT NULL,
	`level` tinyint(4)
);
--> statement-breakpoint
CREATE TABLE `simple_geo_ip` (
	`start` bigint(32) NOT NULL,
	`end` bigint(32) NOT NULL,
	`geo_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sturm_3d_model` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`settings` varchar(1000) NOT NULL DEFAULT '',
	`product_id` int(11) NOT NULL,
	`show_page` int(2) NOT NULL DEFAULT 1,
	`status` int(2) NOT NULL DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `sturm_files` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`file_name` varchar(250) NOT NULL,
	`file_path` varchar(255) NOT NULL,
	`file_type` varchar(50) NOT NULL,
	`product_id` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sturm_news` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`short_txt` varchar(500) NOT NULL,
	`full_txt` longtext NOT NULL,
	`seo_title` varchar(255) NOT NULL DEFAULT '',
	`seo_desc` varchar(500) NOT NULL DEFAULT '',
	`image` varchar(255) NOT NULL DEFAULT '',
	`status` int(2) NOT NULL DEFAULT 0,
	`date` int(11) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `customer_id` ON `oc_address` (`customer_id`);--> statement-breakpoint
CREATE INDEX `email` ON `oc_affiliate_login` (`email`);--> statement-breakpoint
CREATE INDEX `ip` ON `oc_affiliate_login` (`ip`);--> statement-breakpoint
CREATE INDEX `key_guid` ON `oc_attribute_value` (`guid`);--> statement-breakpoint
CREATE INDEX `cart_id` ON `oc_cart` (`customer_id`,`session_id`,`product_id`,`recurring_id`,`product_feature_id`,`unit_id`);--> statement-breakpoint
CREATE INDEX `parent_id` ON `oc_category` (`parent_id`);--> statement-breakpoint
CREATE INDEX `name` ON `oc_category_description` (`name`);--> statement-breakpoint
CREATE INDEX `image_key` ON `oc_csvprice_pro_images` (`image_key`);--> statement-breakpoint
CREATE INDEX `ip` ON `oc_customer_ip` (`ip`);--> statement-breakpoint
CREATE INDEX `email` ON `oc_customer_login` (`email`);--> statement-breakpoint
CREATE INDEX `ip` ON `oc_customer_login` (`ip`);--> statement-breakpoint
CREATE INDEX `customer_id` ON `oc_customer_parties` (`customer_id`);--> statement-breakpoint
CREATE INDEX `store_id` ON `oc_fx_sitemap_categories` (`store_id`);--> statement-breakpoint
CREATE INDEX `product_id` ON `oc_kit_price` (`product_id`);--> statement-breakpoint
CREATE INDEX `session_id` ON `oc_kit_price` (`session_id`);--> statement-breakpoint
CREATE INDEX `category_id` ON `oc_labels` (`category_id`);--> statement-breakpoint
CREATE INDEX `product_id` ON `oc_labels` (`product_id`);--> statement-breakpoint
CREATE INDEX `name` ON `oc_language` (`name`);--> statement-breakpoint
CREATE INDEX `name` ON `oc_location` (`name`);--> statement-breakpoint
CREATE INDEX `menu_id` ON `oc_menu_module` (`menu_id`);--> statement-breakpoint
CREATE INDEX `keyword` ON `oc_ocfilter_option` (`keyword`);--> statement-breakpoint
CREATE INDEX `sort_order` ON `oc_ocfilter_option` (`sort_order`);--> statement-breakpoint
CREATE INDEX `category_id` ON `oc_ocfilter_option_to_category` (`category_id`);--> statement-breakpoint
CREATE INDEX `keyword` ON `oc_ocfilter_option_value` (`keyword`);--> statement-breakpoint
CREATE INDEX `option_id` ON `oc_ocfilter_option_value` (`option_id`);--> statement-breakpoint
CREATE INDEX `name` ON `oc_ocfilter_option_value_description` (`name`);--> statement-breakpoint
CREATE INDEX `option_id` ON `oc_ocfilter_option_value_description` (`option_id`);--> statement-breakpoint
CREATE INDEX `product_id` ON `oc_ocfilter_option_value_to_product` (`product_id`);--> statement-breakpoint
CREATE INDEX `slide_value_min_slide_value_max` ON `oc_ocfilter_option_value_to_product` (`slide_value_min`,`slide_value_max`);--> statement-breakpoint
CREATE INDEX `category_id_params` ON `oc_ocfilter_page` (`category_id`,`params`);--> statement-breakpoint
CREATE INDEX `keyword` ON `oc_ocfilter_page` (`keyword`);--> statement-breakpoint
CREATE INDEX `order_id` ON `oc_order_history` (`order_id`);--> statement-breakpoint
CREATE INDEX `order_id` ON `oc_order_total` (`order_id`);--> statement-breakpoint
CREATE INDEX `IDX_manufacturer_id` ON `oc_product` (`manufacturer_id`);--> statement-breakpoint
CREATE INDEX `model` ON `oc_product` (`model`);--> statement-breakpoint
CREATE INDEX `name` ON `oc_product_description` (`name`);--> statement-breakpoint
CREATE INDEX `product_id` ON `oc_product_discount` (`product_id`);--> statement-breakpoint
CREATE INDEX `product_id` ON `oc_product_feature_value` (`product_id`);--> statement-breakpoint
CREATE INDEX `product_option_id` ON `oc_product_feature_value` (`product_option_id`);--> statement-breakpoint
CREATE INDEX `product_option_value_id` ON `oc_product_feature_value` (`product_option_value_id`);--> statement-breakpoint
CREATE INDEX `product_id` ON `oc_product_image` (`product_id`);--> statement-breakpoint
CREATE INDEX `product_id` ON `oc_product_master` (`product_id`);--> statement-breakpoint
CREATE INDEX `product_feature_id` ON `oc_product_price` (`product_feature_id`);--> statement-breakpoint
CREATE INDEX `product_feature_id` ON `oc_product_quantity` (`product_feature_id`);--> statement-breakpoint
CREATE INDEX `warehouse_id` ON `oc_product_quantity` (`warehouse_id`);--> statement-breakpoint
CREATE INDEX `product_id` ON `oc_product_special` (`product_id`);--> statement-breakpoint
CREATE INDEX `category_id` ON `oc_product_to_category` (`category_id`);--> statement-breakpoint
CREATE INDEX `product_feature_id` ON `oc_product_unit` (`product_feature_id`);--> statement-breakpoint
CREATE INDEX `unit_id` ON `oc_product_unit` (`unit_id`);--> statement-breakpoint
CREATE INDEX `product_id` ON `oc_product_video` (`product_id`);--> statement-breakpoint
CREATE INDEX `order_id` ON `oc_raiff_links` (`order_id`);--> statement-breakpoint
CREATE INDEX `product_id` ON `oc_review` (`product_id`);--> statement-breakpoint
CREATE INDEX `customer_id` ON `oc_shipping_shiptor_address` (`customer_id`);--> statement-breakpoint
CREATE INDEX `kladr_id` ON `oc_shipping_shiptor_address` (`kladr_id`);--> statement-breakpoint
CREATE INDEX `shiptor_id` ON `oc_shipping_shiptor_orders` (`shiptor_id`);--> statement-breakpoint
CREATE INDEX `identity` ON `oc_ulogin` (`identity`);--> statement-breakpoint
CREATE INDEX `user_id` ON `oc_ulogin` (`user_id`);--> statement-breakpoint
CREATE INDEX `unit_group_id` ON `oc_unit` (`unit_group_id`);--> statement-breakpoint
CREATE INDEX `unit_type_id` ON `oc_unit` (`unit_type_id`);--> statement-breakpoint
CREATE INDEX `key_name` ON `oc_unit_to_1c` (`name`);--> statement-breakpoint
CREATE INDEX `keyword` ON `oc_url_alias` (`keyword`);--> statement-breakpoint
CREATE INDEX `query` ON `oc_url_alias` (`query`);--> statement-breakpoint
CREATE INDEX `name` ON `simple_geo` (`name`);--> statement-breakpoint
CREATE INDEX `zone_id` ON `simple_geo` (`zone_id`);--> statement-breakpoint
CREATE INDEX `product_id` ON `sturm_3d_model` (`product_id`);--> statement-breakpoint
CREATE INDEX `show_product` ON `sturm_3d_model` (`show_page`);--> statement-breakpoint
CREATE INDEX `status` ON `sturm_3d_model` (`status`);--> statement-breakpoint
CREATE INDEX `file_name` ON `sturm_files` (`file_name`);--> statement-breakpoint
CREATE INDEX `file_path` ON `sturm_files` (`file_path`);--> statement-breakpoint
CREATE INDEX `product_id` ON `sturm_files` (`product_id`);--> statement-breakpoint
CREATE INDEX `date` ON `sturm_news` (`date`);--> statement-breakpoint
CREATE INDEX `status` ON `sturm_news` (`status`);
*/