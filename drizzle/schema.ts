import {
  mysqlTable,
  //   mysqlSchema,
  //   AnyMySqlColumn,
  index,
  int,
  varchar,
  text,
  decimal,
  datetime,
  unique,
  float,
  char,
  date,
  mysqlEnum,
  smallint,
  longtext,
  mediumtext,
  tinyint,
  mediumint,
  bigint,
} from 'drizzle-orm/mysql-core'
// import { sql } from 'drizzle-orm'

export const ocAddress = mysqlTable(
  'oc_address',
  {
    addressId: int('address_id').autoincrement().notNull(),
    customerId: int('customer_id').notNull(),
    firstname: varchar({ length: 32 }).notNull(),
    lastname: varchar({ length: 32 }).notNull(),
    company: varchar({ length: 40 }).notNull(),
    address1: varchar('address_1', { length: 128 }).notNull(),
    address2: varchar('address_2', { length: 128 }).notNull(),
    city: varchar({ length: 128 }).notNull(),
    postcode: varchar({ length: 10 }).notNull(),
    countryId: int('country_id').default(0).notNull(),
    zoneId: int('zone_id').default(0).notNull(),
    customField: text('custom_field').notNull(),
  },
  (table) => [index('customer_id').on(table.customerId)]
)

export const ocAddressSimpleFields = mysqlTable('oc_address_simple_fields', {
  addressId: int('address_id').notNull(),
  metadata: text(),
})

export const ocAffiliate = mysqlTable('oc_affiliate', {
  affiliateId: int('affiliate_id').autoincrement().notNull(),
  firstname: varchar({ length: 32 }).notNull(),
  lastname: varchar({ length: 32 }).notNull(),
  email: varchar({ length: 96 }).notNull(),
  telephone: varchar({ length: 32 }).notNull(),
  fax: varchar({ length: 32 }).notNull(),
  password: varchar({ length: 40 }).notNull(),
  salt: varchar({ length: 9 }).notNull(),
  company: varchar({ length: 40 }).notNull(),
  website: varchar({ length: 255 }).notNull(),
  address1: varchar('address_1', { length: 128 }).notNull(),
  address2: varchar('address_2', { length: 128 }).notNull(),
  city: varchar({ length: 128 }).notNull(),
  postcode: varchar({ length: 10 }).notNull(),
  countryId: int('country_id').notNull(),
  zoneId: int('zone_id').notNull(),
  code: varchar({ length: 64 }).notNull(),
  commission: decimal({ precision: 4, scale: 2 }).default('0.00').notNull(),
  tax: varchar({ length: 64 }).notNull(),
  payment: varchar({ length: 6 }).notNull(),
  cheque: varchar({ length: 100 }).notNull(),
  paypal: varchar({ length: 64 }).notNull(),
  bankName: varchar('bank_name', { length: 64 }).notNull(),
  bankBranchNumber: varchar('bank_branch_number', { length: 64 }).notNull(),
  bankSwiftCode: varchar('bank_swift_code', { length: 64 }).notNull(),
  bankAccountName: varchar('bank_account_name', { length: 64 }).notNull(),
  bankAccountNumber: varchar('bank_account_number', { length: 64 }).notNull(),
  ip: varchar({ length: 40 }).notNull(),
  status: tinyint().notNull(),
  approved: tinyint().notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocAffiliateActivity = mysqlTable('oc_affiliate_activity', {
  affiliateActivityId: int('affiliate_activity_id').autoincrement().notNull(),
  affiliateId: int('affiliate_id').notNull(),
  key: varchar({ length: 64 }).notNull(),
  data: text().notNull(),
  ip: varchar({ length: 40 }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocAffiliateLogin = mysqlTable(
  'oc_affiliate_login',
  {
    affiliateLoginId: int('affiliate_login_id').autoincrement().notNull(),
    email: varchar({ length: 96 }).notNull(),
    ip: varchar({ length: 40 }).notNull(),
    total: int().notNull(),
    dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
    dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
  },
  (table) => [index('email').on(table.email), index('ip').on(table.ip)]
)

export const ocAffiliateTransaction = mysqlTable('oc_affiliate_transaction', {
  affiliateTransactionId: int('affiliate_transaction_id')
    .autoincrement()
    .notNull(),
  affiliateId: int('affiliate_id').notNull(),
  orderId: int('order_id').notNull(),
  description: text().notNull(),
  amount: decimal({ precision: 15, scale: 4 }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocApi = mysqlTable('oc_api', {
  apiId: int('api_id').autoincrement().notNull(),
  name: varchar({ length: 64 }).notNull(),
  key: text().notNull(),
  status: tinyint().notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
  dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
})

export const ocApiIp = mysqlTable('oc_api_ip', {
  apiIpId: int('api_ip_id').autoincrement().notNull(),
  apiId: int('api_id').notNull(),
  ip: varchar({ length: 40 }).notNull(),
})

export const ocApiSession = mysqlTable('oc_api_session', {
  apiSessionId: int('api_session_id').autoincrement().notNull(),
  apiId: int('api_id').notNull(),
  token: varchar({ length: 32 }).notNull(),
  sessionId: varchar('session_id', { length: 32 }).notNull(),
  sessionName: varchar('session_name', { length: 32 }).notNull(),
  ip: varchar({ length: 40 }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
  dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
})

export const ocArtctin = mysqlTable('oc_artctin', {
  statusId: int('status_id').autoincrement().notNull(),
  numOrder: int('num_order'),
  sum: decimal({ precision: 15, scale: 2 }),
  user: text(),
  email: text(),
  status: int(),
  dateCreated: datetime('date_created', { mode: 'string' }),
  dateEnroled: datetime('date_enroled', { mode: 'string' }),
  sender: text(),
  label: text(),
  label2: text(),
  label3: text(),
  label4: text(),
  label5: text(),
  label6: text(),
  label7: int(),
  label8: int(),
  label9: int(),
})

export const ocAttribute = mysqlTable('oc_attribute', {
  attributeId: int('attribute_id').autoincrement().notNull(),
  attributeGroupId: int('attribute_group_id').notNull(),
  sortOrder: int('sort_order').notNull(),
})

export const ocAttributeDescription = mysqlTable('oc_attribute_description', {
  attributeId: int('attribute_id').notNull(),
  languageId: int('language_id').notNull(),
  name: varchar({ length: 64 }).notNull(),
  description: varchar({ length: 255 }).default('').notNull(),
})

export const ocAttributeGroup = mysqlTable('oc_attribute_group', {
  attributeGroupId: int('attribute_group_id').autoincrement().notNull(),
  sortOrder: int('sort_order').notNull(),
})

export const ocAttributeGroupDescription = mysqlTable(
  'oc_attribute_group_description',
  {
    attributeGroupId: int('attribute_group_id').notNull(),
    languageId: int('language_id').notNull(),
    name: varchar({ length: 64 }).notNull(),
  }
)

export const ocAttributeTo1C = mysqlTable(
  'oc_attribute_to_1c',
  {
    attributeId: int('attribute_id').notNull(),
    guid: varchar({ length: 64 }).notNull(),
  },
  (table) => [unique('attribute_link').on(table.attributeId, table.guid)]
)

export const ocAttributeValue = mysqlTable(
  'oc_attribute_value',
  {
    attributeValueId: int('attribute_value_id').autoincrement().notNull(),
    attributeId: int('attribute_id').notNull(),
    guid: varchar({ length: 64 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
  },
  (table) => [
    index('key_guid').on(table.guid),
    unique('attribute_value_key').on(table.attributeId, table.guid),
  ]
)

export const ocBanner = mysqlTable('oc_banner', {
  bannerId: int('banner_id').autoincrement().notNull(),
  name: varchar({ length: 64 }).notNull(),
  status: tinyint().notNull(),
})

export const ocBannerImage = mysqlTable('oc_banner_image', {
  bannerImageId: int('banner_image_id').autoincrement().notNull(),
  bannerId: int('banner_id').notNull(),
  languageId: int('language_id').notNull(),
  title: varchar({ length: 64 }).notNull(),
  link: varchar({ length: 255 }).notNull(),
  image: varchar({ length: 255 }).notNull(),
  sortOrder: int('sort_order').default(0).notNull(),
})

export const ocCart = mysqlTable(
  'oc_cart',
  {
    cartId: int('cart_id').autoincrement().notNull(),
    apiId: int('api_id').notNull(),
    customerId: int('customer_id').notNull(),
    sessionId: varchar('session_id', { length: 32 }).notNull(),
    productId: int('product_id').notNull(),
    recurringId: int('recurring_id').notNull(),
    option: text().notNull(),
    unitId: int('unit_id').default(0).notNull(),
    productFeatureId: int('product_feature_id').default(0).notNull(),
    quantity: int().notNull(),
    dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
  },
  (table) => [
    index('cart_id').on(
      table.customerId,
      table.sessionId,
      table.productId,
      table.recurringId,
      table.productFeatureId,
      table.unitId
    ),
  ]
)

export const ocCategory = mysqlTable(
  'oc_category',
  {
    categoryId: int('category_id').autoincrement().notNull(),
    image: varchar({ length: 255 }),
    yomenuIcon: varchar('yomenu_icon', { length: 255 }),
    yomenuImage: varchar('yomenu_image', { length: 255 }),
    parentId: int('parent_id').default(0).notNull(),
    top: tinyint().notNull(),
    column: int().notNull(),
    sortOrder: int('sort_order').default(0).notNull(),
    status: tinyint().notNull(),
    dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
    dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
    yomenuContent: text('yomenu_content').notNull(),
  },
  (table) => [index('parent_id').on(table.parentId)]
)

export const ocCategoryDescription = mysqlTable(
  'oc_category_description',
  {
    categoryId: int('category_id').notNull(),
    languageId: int('language_id').notNull(),
    name: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    metaTitle: varchar('meta_title', { length: 255 }).notNull(),
    metaH1: varchar('meta_h1', { length: 255 }).notNull(),
    metaDescription: varchar('meta_description', { length: 500 }).notNull(),
    metaKeyword: varchar('meta_keyword', { length: 255 }).notNull(),
    inputVop1: varchar('input_vop_1', { length: 255 }).notNull(),
    inputOtv1: text('input_otv_1').notNull(),
    inputVop2: varchar('input_vop_2', { length: 255 }).notNull(),
    inputOtv2: text('input_otv_2').notNull(),
    inputVop3: varchar('input_vop_3', { length: 255 }).notNull(),
    inputOtv3: text('input_otv_3').notNull(),
  },
  (table) => [index('name').on(table.name)]
)

export const ocCategoryFilter = mysqlTable('oc_category_filter', {
  categoryId: int('category_id').notNull(),
  filterId: int('filter_id').notNull(),
})

export const ocCategoryPath = mysqlTable('oc_category_path', {
  categoryId: int('category_id').notNull(),
  pathId: int('path_id').notNull(),
  level: int().notNull(),
})

export const ocCategoryTo1C = mysqlTable(
  'oc_category_to_1c',
  {
    categoryId: int('category_id').notNull(),
    guid: varchar({ length: 64 }).notNull(),
  },
  (table) => [unique('category_link').on(table.categoryId, table.guid)]
)

export const ocCategoryToLayout = mysqlTable('oc_category_to_layout', {
  categoryId: int('category_id').notNull(),
  storeId: int('store_id').notNull(),
  layoutId: int('layout_id').notNull(),
})

export const ocCategoryToStore = mysqlTable('oc_category_to_store', {
  categoryId: int('category_id').notNull(),
  storeId: int('store_id').notNull(),
})

export const ocCbr = mysqlTable('oc_cbr', {
  id: int().autoincrement().notNull(),
  val: float().notNull(),
  cur: varchar({ length: 5 }).notNull(),
  date: varchar({ length: 11 }).notNull(),
})

export const ocCountry = mysqlTable('oc_country', {
  countryId: int('country_id').autoincrement().notNull(),
  name: varchar({ length: 128 }).notNull(),
  isoCode2: varchar('iso_code_2', { length: 2 }).notNull(),
  isoCode3: varchar('iso_code_3', { length: 3 }).notNull(),
  addressFormat: text('address_format').notNull(),
  postcodeRequired: tinyint('postcode_required').notNull(),
  status: tinyint().default(1).notNull(),
})

export const ocCoupon = mysqlTable('oc_coupon', {
  couponId: int('coupon_id').autoincrement().notNull(),
  name: varchar({ length: 128 }).notNull(),
  code: varchar({ length: 20 }).notNull(),
  type: char({ length: 1 }).notNull(),
  discount: decimal({ precision: 15, scale: 4 }).notNull(),
  logged: tinyint().notNull(),
  shipping: tinyint().notNull(),
  total: decimal({ precision: 15, scale: 4 }).notNull(),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  dateStart: date('date_start', { mode: 'string' })
    .default('0000-00-00')
    .notNull(),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  dateEnd: date('date_end', { mode: 'string' }).default('0000-00-00').notNull(),
  usesTotal: int('uses_total').notNull(),
  usesCustomer: varchar('uses_customer', { length: 11 }).notNull(),
  status: tinyint().notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocCouponCategory = mysqlTable('oc_coupon_category', {
  couponId: int('coupon_id').notNull(),
  categoryId: int('category_id').notNull(),
})

export const ocCouponHistory = mysqlTable('oc_coupon_history', {
  couponHistoryId: int('coupon_history_id').autoincrement().notNull(),
  couponId: int('coupon_id').notNull(),
  orderId: int('order_id').notNull(),
  customerId: int('customer_id').notNull(),
  amount: decimal({ precision: 15, scale: 4 }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocCouponProduct = mysqlTable('oc_coupon_product', {
  couponProductId: int('coupon_product_id').autoincrement().notNull(),
  couponId: int('coupon_id').notNull(),
  productId: int('product_id').notNull(),
})

export const ocCsvpricePro = mysqlTable('oc_csvprice_pro', {
  settingId: int('setting_id').autoincrement().notNull(),
  key: varchar({ length: 64 }).notNull(),
  value: text(),
  serialized: tinyint().default(1).notNull(),
})

export const ocCsvpriceProCrontab = mysqlTable('oc_csvprice_pro_crontab', {
  jobId: int('job_id').autoincrement().notNull(),
  profileId: int('profile_id').notNull(),
  jobKey: varchar('job_key', { length: 64 }).notNull(),
  jobType: mysqlEnum('job_type', ['import', 'export']),
  jobFileLocation: mysqlEnum('job_file_location', ['dir', 'web', 'ftp']),
  jobTimeStart: datetime('job_time_start', { mode: 'string' }).notNull(),
  jobOffline: tinyint('job_offline').default(0).notNull(),
  jobData: text('job_data'),
  status: tinyint().default(0).notNull(),
  serialized: tinyint().default(0).notNull(),
})

export const ocCsvpriceProImages = mysqlTable(
  'oc_csvprice_pro_images',
  {
    catalogId: int('catalog_id').notNull(),
    imageKey: char('image_key', { length: 32 }).notNull(),
    imagePath: varchar('image_path', { length: 255 }).notNull(),
  },
  (table) => [index('image_key').on(table.imageKey)]
)

export const ocCsvpriceProProfiles = mysqlTable('oc_csvprice_pro_profiles', {
  profileId: int('profile_id').autoincrement().notNull(),
  key: varchar({ length: 64 }).notNull(),
  catalog: varchar({ length: 64 }).default('product').notNull(),
  name: varchar({ length: 128 }).notNull(),
  value: text(),
  serialized: tinyint().default(1).notNull(),
})

export const ocCurrency = mysqlTable('oc_currency', {
  currencyId: int('currency_id').autoincrement().notNull(),
  title: varchar({ length: 32 }).notNull(),
  code: varchar({ length: 3 }).notNull(),
  symbolLeft: varchar('symbol_left', { length: 12 }).notNull(),
  symbolRight: varchar('symbol_right', { length: 12 }).notNull(),
  decimalPlace: char('decimal_place', { length: 2 }).notNull(),
  value: float({ precision: 15, scale: 8 }).notNull(),
  status: tinyint().notNull(),
  dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
})

export const ocCustomField = mysqlTable('oc_custom_field', {
  customFieldId: int('custom_field_id').autoincrement().notNull(),
  type: varchar({ length: 32 }).notNull(),
  value: text().notNull(),
  validation: varchar({ length: 255 }).notNull(),
  location: varchar({ length: 7 }).notNull(),
  status: tinyint().notNull(),
  sortOrder: int('sort_order').notNull(),
})

export const ocCustomFieldCustomerGroup = mysqlTable(
  'oc_custom_field_customer_group',
  {
    customFieldId: int('custom_field_id').notNull(),
    customerGroupId: int('customer_group_id').notNull(),
    required: tinyint().notNull(),
  }
)

export const ocCustomFieldDescription = mysqlTable(
  'oc_custom_field_description',
  {
    customFieldId: int('custom_field_id').notNull(),
    languageId: int('language_id').notNull(),
    name: varchar({ length: 128 }).notNull(),
  }
)

export const ocCustomFieldValue = mysqlTable('oc_custom_field_value', {
  customFieldValueId: int('custom_field_value_id').autoincrement().notNull(),
  customFieldId: int('custom_field_id').notNull(),
  sortOrder: int('sort_order').notNull(),
})

export const ocCustomFieldValueDescription = mysqlTable(
  'oc_custom_field_value_description',
  {
    customFieldValueId: int('custom_field_value_id').notNull(),
    languageId: int('language_id').notNull(),
    customFieldId: int('custom_field_id').notNull(),
    name: varchar({ length: 128 }).notNull(),
  }
)

export const ocCustomer = mysqlTable('oc_customer', {
  customerId: int('customer_id').autoincrement().notNull(),
  customerGroupId: int('customer_group_id').notNull(),
  storeId: int('store_id').default(0).notNull(),
  languageId: int('language_id').notNull(),
  firstname: varchar({ length: 32 }).notNull(),
  lastname: varchar({ length: 32 }).notNull(),
  email: varchar({ length: 96 }).notNull(),
  telephone: varchar({ length: 32 }).notNull(),
  fax: varchar({ length: 32 }).notNull(),
  password: varchar({ length: 40 }).notNull(),
  salt: varchar({ length: 9 }).notNull(),
  cart: text(),
  wishlist: text(),
  newsletter: tinyint().default(0).notNull(),
  addressId: int('address_id').default(0).notNull(),
  customField: text('custom_field').notNull(),
  ip: varchar({ length: 40 }).notNull(),
  status: tinyint().notNull(),
  approved: tinyint().notNull(),
  safe: tinyint().notNull(),
  token: text().notNull(),
  code: varchar({ length: 40 }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocCustomerActivity = mysqlTable('oc_customer_activity', {
  customerActivityId: int('customer_activity_id').autoincrement().notNull(),
  customerId: int('customer_id').notNull(),
  key: varchar({ length: 64 }).notNull(),
  data: text().notNull(),
  ip: varchar({ length: 40 }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocCustomerGroup = mysqlTable('oc_customer_group', {
  customerGroupId: int('customer_group_id').autoincrement().notNull(),
  approval: int().notNull(),
  sortOrder: int('sort_order').notNull(),
})

export const ocCustomerGroupDescription = mysqlTable(
  'oc_customer_group_description',
  {
    customerGroupId: int('customer_group_id').notNull(),
    languageId: int('language_id').notNull(),
    name: varchar({ length: 32 }).notNull(),
    description: text().notNull(),
  }
)

export const ocCustomerHistory = mysqlTable('oc_customer_history', {
  customerHistoryId: int('customer_history_id').autoincrement().notNull(),
  customerId: int('customer_id').notNull(),
  comment: text().notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocCustomerIp = mysqlTable(
  'oc_customer_ip',
  {
    customerIpId: int('customer_ip_id').autoincrement().notNull(),
    customerId: int('customer_id').notNull(),
    ip: varchar({ length: 40 }).notNull(),
    dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
  },
  (table) => [index('ip').on(table.ip)]
)

export const ocCustomerLogin = mysqlTable(
  'oc_customer_login',
  {
    customerLoginId: int('customer_login_id').autoincrement().notNull(),
    email: varchar({ length: 96 }).notNull(),
    ip: varchar({ length: 40 }).notNull(),
    total: int().notNull(),
    dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
    dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
  },
  (table) => [index('email').on(table.email), index('ip').on(table.ip)]
)

export const ocCustomerOnline = mysqlTable('oc_customer_online', {
  ip: varchar({ length: 40 }).notNull(),
  customerId: int('customer_id').notNull(),
  url: text().notNull(),
  referer: text().notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocCustomerParties = mysqlTable(
  'oc_customer_parties',
  {
    id: int().autoincrement().notNull(),
    customerId: int('customer_id').notNull(),
    filedsJson: varchar('fileds_json', { length: 1000 }).default('').notNull(),
    date: int().notNull(),
  },
  (table) => [index('customer_id').on(table.customerId)]
)

export const ocCustomerReward = mysqlTable('oc_customer_reward', {
  customerRewardId: int('customer_reward_id').autoincrement().notNull(),
  customerId: int('customer_id').default(0).notNull(),
  orderId: int('order_id').default(0).notNull(),
  description: text().notNull(),
  points: int().default(0).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocCustomerSearch = mysqlTable('oc_customer_search', {
  customerSearchId: int('customer_search_id').autoincrement().notNull(),
  storeId: int('store_id').notNull(),
  languageId: int('language_id').notNull(),
  customerId: int('customer_id').notNull(),
  keyword: varchar({ length: 255 }).notNull(),
  categoryId: int('category_id'),
  subCategory: tinyint('sub_category').notNull(),
  description: tinyint().notNull(),
  products: int().notNull(),
  ip: varchar({ length: 40 }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocCustomerSimpleFields = mysqlTable('oc_customer_simple_fields', {
  customerId: int('customer_id').notNull(),
  metadata: text(),
  requisites: text(),
})

export const ocCustomerTransaction = mysqlTable('oc_customer_transaction', {
  customerTransactionId: int('customer_transaction_id')
    .autoincrement()
    .notNull(),
  customerId: int('customer_id').notNull(),
  orderId: int('order_id').notNull(),
  description: text().notNull(),
  amount: decimal({ precision: 15, scale: 4 }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocCustomerWishlist = mysqlTable('oc_customer_wishlist', {
  customerId: int('customer_id').notNull(),
  productId: int('product_id').notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocDownload = mysqlTable('oc_download', {
  downloadId: int('download_id').autoincrement().notNull(),
  filename: varchar({ length: 160 }).notNull(),
  mask: varchar({ length: 128 }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocDownloadDescription = mysqlTable('oc_download_description', {
  downloadId: int('download_id').notNull(),
  languageId: int('language_id').notNull(),
  name: varchar({ length: 64 }).notNull(),
})

export const ocEvent = mysqlTable('oc_event', {
  eventId: int('event_id').autoincrement().notNull(),
  code: varchar({ length: 32 }).notNull(),
  trigger: text().notNull(),
  action: text().notNull(),
  status: tinyint().notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
  sortOrder: int('sort_order').notNull(),
})

export const ocExtension = mysqlTable('oc_extension', {
  extensionId: int('extension_id').autoincrement().notNull(),
  type: varchar({ length: 32 }).notNull(),
  code: varchar({ length: 32 }).notNull(),
})

export const ocFilter = mysqlTable('oc_filter', {
  filterId: int('filter_id').autoincrement().notNull(),
  filterGroupId: int('filter_group_id').notNull(),
  sortOrder: int('sort_order').notNull(),
})

export const ocFilterDescription = mysqlTable('oc_filter_description', {
  filterId: int('filter_id').notNull(),
  languageId: int('language_id').notNull(),
  filterGroupId: int('filter_group_id').notNull(),
  name: varchar({ length: 64 }).notNull(),
})

export const ocFilterGroup = mysqlTable('oc_filter_group', {
  filterGroupId: int('filter_group_id').autoincrement().notNull(),
  sortOrder: int('sort_order').notNull(),
})

export const ocFilterGroupDescription = mysqlTable(
  'oc_filter_group_description',
  {
    filterGroupId: int('filter_group_id').notNull(),
    languageId: int('language_id').notNull(),
    name: varchar({ length: 64 }).notNull(),
  }
)

export const ocFxManufacturersOnCategories = mysqlTable(
  'oc_fx_manufacturers_on_categories',
  {
    categoryId: mediumint('category_id').notNull(),
    manufacturers: text().notNull(),
    num: mediumint().notNull(),
  },
  (table) => [unique('category_id').on(table.categoryId)]
)

export const ocFxSitemapCategories = mysqlTable(
  'oc_fx_sitemap_categories',
  {
    categoryId: mediumint('category_id').notNull(),
    url: varchar({ length: 255 }).notNull(),
    isSeo: tinyint('is_seo').notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    dateModified: date('date_modified', { mode: 'string' }).notNull(),
    storeId: smallint('store_id').notNull(),
  },
  (table) => [index('store_id').on(table.storeId)]
)

export const ocFxSitemapLastmod = mysqlTable('oc_fx_sitemap_lastmod', {
  name: varchar({ length: 10 }).notNull(),
  md5: varchar({ length: 32 }).notNull(),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  date: date({ mode: 'string' }).notNull(),
})

export const ocGeoZone = mysqlTable('oc_geo_zone', {
  geoZoneId: int('geo_zone_id').autoincrement().notNull(),
  name: varchar({ length: 32 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocGpBundle = mysqlTable('oc_gp_bundle', {
  productId: int('product_id').notNull(),
  gpPriceMin: varchar('gp_price_min', { length: 20 }).notNull(),
  gpPriceMax: varchar('gp_price_max', { length: 20 }).notNull(),
  gpTemplate: varchar('gp_template', { length: 16 })
    .default('default')
    .notNull(),
})

export const ocGpBundleChild = mysqlTable('oc_gp_bundle_child', {
  productId: int('product_id').notNull(),
  childId: int('child_id').notNull(),
  childSortOrder: int('child_sort_order').notNull(),
})

export const ocHdAccumulationStatuses = mysqlTable(
  'oc_hd_accumulation_statuses',
  {
    id: int().autoincrement().notNull(),
    name: varchar({ length: 500 }).notNull(),
    description: varchar({ length: 500 }).notNull(),
  }
)

export const ocHdAccumulative = mysqlTable('oc_hd_accumulative', {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 500 }),
  description: varchar({ length: 500 }),
  status: tinyint(),
  shopsAll: tinyint('shops_all'),
  shops: varchar({ length: 255 }),
  customers: text(),
  products: text(),
  correction: tinyint(),
  orderStatuses: varchar('order_statuses', { length: 100 }),
  geosAll: tinyint('geos_all'),
  geos: varchar({ length: 255 }),
  productsFilterUrl: text('products_filter_url'),
  customersFilterUrl: text('customers_filter_url'),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  startDate: date('start_date', { mode: 'string' }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  endDate: date('end_date', { mode: 'string' }),
  productsAll: tinyint('products_all'),
  customersAll: tinyint('customers_all'),
  discountVariantDiscount: varchar('discount_variant_discount', { length: 50 }),
  discountVariantCondition: varchar('discount_variant_condition', {
    length: 50,
  }),
  discountVariantSpecials: varchar('discount_variant_specials', { length: 50 }),
  discountVariantOptions: varchar('discount_variant_options', { length: 50 }),
})

export const ocHdAccumulativeDiscountEditor = mysqlTable(
  'oc_hd_accumulative_discount_editor',
  {
    id: int().autoincrement().notNull(),
    discountId: int('discount_id'),
    editorId: int('editor_id'),
    discountStatusId: int('discount_status_id'),
    discountFunctionOrders: varchar('discount_function_orders', { length: 5 }),
    discountFunctionProducts: varchar('discount_function_products', {
      length: 5,
    }),
    discountFunctionSum: varchar('discount_function_sum', { length: 20 }),
    discountFunction: varchar('discount_function', { length: 50 }),
    discountPercent: varchar('discount_percent', { length: 5 }),
    discountType: varchar('discount_type', { length: 50 }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    startDate: date('start_date', { mode: 'string' }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    endDate: date('end_date', { mode: 'string' }),
    status: tinyint(),
  }
)

export const ocHdInfo = mysqlTable('oc_hd_info', {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 500 }).notNull(),
  description: varchar({ length: 500 }).notNull(),
})

export const ocHdKit = mysqlTable('oc_hd_kit', {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 500 }),
  description: varchar({ length: 500 }),
  correction: int(),
  status: tinyint(),
  shopsAll: tinyint('shops_all'),
  shops: varchar({ length: 255 }),
  customersAll: tinyint('customers_all'),
  customers: text(),
  guests: tinyint(),
  geosAll: tinyint('geos_all'),
  geos: varchar({ length: 255 }),
  customersFilterUrl: text('customers_filter_url'),
})

export const ocHdKitDiscountEditor = mysqlTable('oc_hd_kit_discount_editor', {
  id: int().autoincrement().notNull(),
  discountId: int('discount_id'),
  editorId: int('editor_id'),
  discountCountProducts: varchar('discount_count_products', { length: 5 }),
  discountAccumulationSum: varchar('discount_accumulation_sum', { length: 20 }),
  discountFunction: varchar('discount_function', { length: 50 }),
  discountPercent: varchar('discount_percent', { length: 5 }),
  discountType: varchar('discount_type', { length: 50 }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  startDate: date('start_date', { mode: 'string' }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  endDate: date('end_date', { mode: 'string' }),
  productsAll: tinyint('products_all'),
  products: text(),
  discountVariantDiscount: varchar('discount_variant_discount', { length: 50 }),
  discountVariantCondition: varchar('discount_variant_condition', {
    length: 50,
  }),
  discountVariantSpecials: varchar('discount_variant_specials', { length: 50 }),
  discountVariantOptions: varchar('discount_variant_options', { length: 50 }),
  status: tinyint(),
  productsFilterUrl: text('products_filter_url'),
  products2: text(),
  typeQty: tinyint('type_qty'),
  discountCountProducts2: varchar('discount_count_products2', { length: 5 }),
  productsFilterUrl2: text('products_filter_url2'),
})

export const ocHdLevel = mysqlTable('oc_hd_level', {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 500 }),
  description: varchar({ length: 500 }),
  status: tinyint(),
  shopsAll: tinyint('shops_all'),
  shops: varchar({ length: 255 }),
  products: text(),
  orderStatuses: varchar('order_statuses', { length: 100 }),
  productsFilterUrl: text('products_filter_url'),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  startDate: date('start_date', { mode: 'string' }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  endDate: date('end_date', { mode: 'string' }),
  productsAll: tinyint('products_all'),
})

export const ocHdLevelEditor = mysqlTable('oc_hd_level_editor', {
  id: int().autoincrement().notNull(),
  levelsId: int('levels_id'),
  editorId: int('editor_id'),
  levelStatusId: int('level_status_id'),
  levelFunctionOrders: varchar('level_function_orders', { length: 5 }),
  levelFunctionProducts: varchar('level_function_products', { length: 5 }),
  levelFunctionSum: varchar('level_function_sum', { length: 20 }),
  levelFunction: varchar('level_function', { length: 50 }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  startDate: date('start_date', { mode: 'string' }),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  endDate: date('end_date', { mode: 'string' }),
  status: tinyint(),
})

export const ocHdProduct = mysqlTable('oc_hd_product', {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 500 }),
  description: varchar({ length: 500 }),
  status: tinyint(),
  shopsAll: tinyint('shops_all'),
  shops: varchar({ length: 255 }),
  cost: varchar({ length: 55 }),
  round: varchar({ length: 55 }),
})

export const ocHdProductDiscountEditor = mysqlTable(
  'oc_hd_product_discount_editor',
  {
    id: int().autoincrement().notNull(),
    discountId: int('discount_id'),
    editorId: int('editor_id'),
    discountCountProducts: varchar('discount_count_products', { length: 5 }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    startDate: date('start_date', { mode: 'string' }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    endDate: date('end_date', { mode: 'string' }),
    productsAll: tinyint('products_all'),
    products: text(),
    status: tinyint(),
    productsFilterUrl: text('products_filter_url'),
    discountCoef1: varchar('discount_coef1', { length: 5 }),
    discountCoef2: varchar('discount_coef2', { length: 5 }),
    discountCoef3: varchar('discount_coef3', { length: 5 }),
    discountPriority: varchar('discount_priority', { length: 5 }),
    discountType1: varchar('discount_type1', { length: 5 }),
    discountType2: varchar('discount_type2', { length: 5 }),
    discountType3: varchar('discount_type3', { length: 5 }),
    hdProductDiscountEditor: text('hd_product_discount_editor'),
    discountWeek: text('discount_week'),
    discountTime: text('discount_time'),
    discountPeriod: varchar('discount_period', { length: 55 }),
    saveTime: int('save_time'),
    customerGroups: text('customer_groups'),
  }
)

export const ocHdProducts = mysqlTable('oc_hd_products', {
  id: int().autoincrement().notNull(),
  price: float(),
  options: text(),
  discounts: text(),
  specials: text(),
})

export const ocHdQuantitative = mysqlTable('oc_hd_quantitative', {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 500 }),
  description: varchar({ length: 500 }),
  status: tinyint(),
  shopsAll: tinyint('shops_all'),
  shops: varchar({ length: 255 }),
  customersAll: tinyint('customers_all'),
  customers: text(),
  correction: int(),
  guests: tinyint(),
  geosAll: tinyint('geos_all'),
  geos: varchar({ length: 255 }),
  customersFilterUrl: text('customers_filter_url'),
})

export const ocHdQuantitativeDiscountEditor = mysqlTable(
  'oc_hd_quantitative_discount_editor',
  {
    id: int().autoincrement().notNull(),
    discountId: int('discount_id'),
    editorId: int('editor_id'),
    discountCountProducts: varchar('discount_count_products', { length: 11 }),
    discountAccumulationSum: varchar('discount_accumulation_sum', {
      length: 11,
    }),
    discountFunction: varchar('discount_function', { length: 50 }),
    discountPercent: varchar('discount_percent', { length: 5 }),
    discountType: varchar('discount_type', { length: 50 }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    startDate: date('start_date', { mode: 'string' }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    endDate: date('end_date', { mode: 'string' }),
    productsAll: tinyint('products_all'),
    products: text(),
    discountVariantDiscount: varchar('discount_variant_discount', {
      length: 50,
    }),
    discountVariantCondition: varchar('discount_variant_condition', {
      length: 50,
    }),
    discountVariantSpecials: varchar('discount_variant_specials', {
      length: 50,
    }),
    discountVariantOptions: varchar('discount_variant_options', { length: 50 }),
    status: tinyint(),
    productsFilterUrl: text('products_filter_url'),
  }
)

export const ocHdSetting = mysqlTable('oc_hd_setting', {
  key: varchar({ length: 255 }).notNull(),
  value: varchar({ length: 255 }).notNull(),
})

export const ocHdSpecials = mysqlTable('oc_hd_specials', {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 500 }),
  description: varchar({ length: 500 }),
  status: tinyint(),
  shopsAll: tinyint('shops_all'),
  shops: varchar({ length: 255 }),
  cost: varchar({ length: 55 }),
  round: varchar({ length: 55 }),
})

export const ocHdSpecialsDiscountEditor = mysqlTable(
  'oc_hd_specials_discount_editor',
  {
    id: int().autoincrement().notNull(),
    discountId: int('discount_id'),
    editorId: int('editor_id'),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    startDate: date('start_date', { mode: 'string' }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    endDate: date('end_date', { mode: 'string' }),
    productsAll: tinyint('products_all'),
    products: text(),
    status: tinyint(),
    productsFilterUrl: text('products_filter_url'),
    discountCoef1: varchar('discount_coef1', { length: 5 }),
    discountCoef2: varchar('discount_coef2', { length: 5 }),
    discountCoef3: varchar('discount_coef3', { length: 5 }),
    discountPriority: varchar('discount_priority', { length: 5 }),
    discountType1: varchar('discount_type1', { length: 5 }),
    discountType2: varchar('discount_type2', { length: 5 }),
    discountType3: varchar('discount_type3', { length: 5 }),
    customerGroups: text('customer_groups'),
    discountWeek: text('discount_week'),
    discountTime: text('discount_time'),
    discountPeriod: varchar('discount_period', { length: 55 }),
    saveTime: int('save_time'),
  }
)

export const ocHdUsers = mysqlTable('oc_hd_users', {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 500 }),
  description: varchar({ length: 500 }),
  status: tinyint(),
  shopsAll: tinyint('shops_all'),
  shops: varchar({ length: 255 }),
  geosAll: tinyint('geos_all'),
  geos: varchar({ length: 255 }),
  customersAll: tinyint('customers_all'),
  customers: text(),
  guests: tinyint(),
  customersFilterUrl: text('customers_filter_url'),
  correction: int(),
})

export const ocHdUsersDiscountEditor = mysqlTable(
  'oc_hd_users_discount_editor',
  {
    id: int().autoincrement().notNull(),
    editorId: int('editor_id'),
    discountId: int('discount_id'),
    products: text(),
    productsFilterUrl: text('products_filter_url'),
    discountVariantDiscount: text('discount_variant_discount'),
    discountVariantCondition: text('discount_variant_condition'),
    discountVariantSpecials: text('discount_variant_specials'),
    discountVariantOptions: text('discount_variant_options'),
    status: tinyint(),
    discountPercent: varchar('discount_percent', { length: 5 }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    startDate: date('start_date', { mode: 'string' }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    endDate: date('end_date', { mode: 'string' }),
    productsAll: tinyint('products_all'),
    discountType: varchar('discount_type', { length: 50 }),
  }
)

export const ocHdWholesale = mysqlTable('oc_hd_wholesale', {
  id: int().autoincrement().notNull(),
  name: varchar({ length: 500 }),
  description: varchar({ length: 500 }),
  status: tinyint(),
  shopsAll: tinyint('shops_all'),
  shops: varchar({ length: 255 }),
  cost: varchar({ length: 55 }),
  round: varchar({ length: 55 }),
})

export const ocHdWholesaleDiscountEditor = mysqlTable(
  'oc_hd_wholesale_discount_editor',
  {
    id: int().autoincrement().notNull(),
    discountId: int('discount_id'),
    editorId: int('editor_id'),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    startDate: date('start_date', { mode: 'string' }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    endDate: date('end_date', { mode: 'string' }),
    productsAll: tinyint('products_all'),
    products: text(),
    status: tinyint(),
    productsFilterUrl: text('products_filter_url'),
    discountCoef1: varchar('discount_coef1', { length: 5 }),
    discountCoef2: varchar('discount_coef2', { length: 5 }),
    discountCoef3: varchar('discount_coef3', { length: 5 }),
    discountPriority: varchar('discount_priority', { length: 5 }),
    discountType1: varchar('discount_type1', { length: 5 }),
    discountType2: varchar('discount_type2', { length: 5 }),
    discountType3: varchar('discount_type3', { length: 5 }),
    hdProductDiscountEditor: text('hd_product_discount_editor'),
    discountWeek: text('discount_week'),
    discountTime: text('discount_time'),
    discountPeriod: varchar('discount_period', { length: 55 }),
    saveTime: int('save_time'),
    customerGroups: text('customer_groups'),
  }
)

export const ocInformation = mysqlTable('oc_information', {
  informationId: int('information_id').autoincrement().notNull(),
  bottom: int().default(0).notNull(),
  sortOrder: int('sort_order').default(0).notNull(),
  status: tinyint().default(1).notNull(),
})

export const ocInformationDescription = mysqlTable(
  'oc_information_description',
  {
    informationId: int('information_id').notNull(),
    languageId: int('language_id').notNull(),
    title: varchar({ length: 64 }).notNull(),
    description: longtext().notNull(),
    metaTitle: varchar('meta_title', { length: 255 }).notNull(),
    metaH1: varchar('meta_h1', { length: 255 }).notNull(),
    metaDescription: varchar('meta_description', { length: 255 }).notNull(),
    metaKeyword: varchar('meta_keyword', { length: 255 }).notNull(),
  }
)

export const ocInformationToLayout = mysqlTable('oc_information_to_layout', {
  informationId: int('information_id').notNull(),
  storeId: int('store_id').notNull(),
  layoutId: int('layout_id').notNull(),
})

export const ocInformationToStore = mysqlTable('oc_information_to_store', {
  informationId: int('information_id').notNull(),
  storeId: int('store_id').notNull(),
})

export const ocKitPrice = mysqlTable(
  'oc_kit_price',
  {
    id: int().autoincrement().notNull(),
    sessionId: varchar('session_id', { length: 32 }).notNull(),
    productId: int('product_id').notNull(),
    price: decimal({ precision: 15, scale: 4 }).default('0.0000').notNull(),
    special: decimal({ precision: 15, scale: 4 }).default('0.0000').notNull(),
  },
  (table) => [
    index('product_id').on(table.productId),
    index('session_id').on(table.sessionId),
  ]
)

export const ocLabels = mysqlTable(
  'oc_labels',
  {
    id: int().autoincrement().notNull(),
    productId: int('product_id').default(0).notNull(),
    categoryId: int('category_id').default(0).notNull(),
    jsonVal: varchar('json_val', { length: 5000 }).default('').notNull(),
  },
  (table) => [
    index('category_id').on(table.categoryId),
    index('product_id').on(table.productId),
  ]
)

export const ocLanguage = mysqlTable(
  'oc_language',
  {
    languageId: int('language_id').autoincrement().notNull(),
    name: varchar({ length: 32 }).notNull(),
    code: varchar({ length: 5 }).notNull(),
    locale: varchar({ length: 255 }).notNull(),
    image: varchar({ length: 64 }).notNull(),
    directory: varchar({ length: 32 }).notNull(),
    sortOrder: int('sort_order').default(0).notNull(),
    status: tinyint().notNull(),
  },
  (table) => [index('name').on(table.name)]
)

export const ocLayout = mysqlTable('oc_layout', {
  layoutId: int('layout_id').autoincrement().notNull(),
  name: varchar({ length: 64 }).notNull(),
})

export const ocLayoutModule = mysqlTable('oc_layout_module', {
  layoutModuleId: int('layout_module_id').autoincrement().notNull(),
  layoutId: int('layout_id').notNull(),
  code: varchar({ length: 64 }).notNull(),
  position: varchar({ length: 14 }).notNull(),
  sortOrder: int('sort_order').notNull(),
})

export const ocLayoutRoute = mysqlTable('oc_layout_route', {
  layoutRouteId: int('layout_route_id').autoincrement().notNull(),
  layoutId: int('layout_id').notNull(),
  storeId: int('store_id').notNull(),
  route: varchar({ length: 64 }).notNull(),
})

export const ocLengthClass = mysqlTable('oc_length_class', {
  lengthClassId: int('length_class_id').autoincrement().notNull(),
  value: decimal({ precision: 15, scale: 2 }).notNull(),
})

export const ocLengthClassDescription = mysqlTable(
  'oc_length_class_description',
  {
    lengthClassId: int('length_class_id').notNull(),
    languageId: int('language_id').notNull(),
    title: varchar({ length: 32 }).notNull(),
    unit: varchar({ length: 4 }).notNull(),
  }
)

export const ocLocation = mysqlTable(
  'oc_location',
  {
    locationId: int('location_id').autoincrement().notNull(),
    name: varchar({ length: 32 }).notNull(),
    address: text().notNull(),
    telephone: varchar({ length: 32 }).notNull(),
    fax: varchar({ length: 32 }).notNull(),
    geocode: varchar({ length: 32 }).notNull(),
    image: varchar({ length: 255 }),
    open: text().notNull(),
    comment: text().notNull(),
  },
  (table) => [index('name').on(table.name)]
)

export const ocManufacturer = mysqlTable('oc_manufacturer', {
  manufacturerId: int('manufacturer_id').autoincrement().notNull(),
  name: varchar({ length: 64 }).notNull(),
  image: varchar({ length: 255 }),
  yomenuIcon: varchar('yomenu_icon', { length: 255 }),
  yomenuImage: varchar('yomenu_image', { length: 255 }),
  sortOrder: int('sort_order').notNull(),
  yomenuContent: text('yomenu_content').notNull(),
})

export const ocManufacturerDescription = mysqlTable(
  'oc_manufacturer_description',
  {
    manufacturerId: int('manufacturer_id').notNull(),
    languageId: int('language_id').notNull(),
    name: varchar({ length: 64 }).notNull(),
    description: text().notNull(),
    metaTitle: varchar('meta_title', { length: 255 }).notNull(),
    metaH1: varchar('meta_h1', { length: 255 }).notNull(),
    metaDescription: varchar('meta_description', { length: 255 }).notNull(),
    metaKeyword: varchar('meta_keyword', { length: 255 }).notNull(),
  }
)

export const ocManufacturerTo1C = mysqlTable(
  'oc_manufacturer_to_1c',
  {
    manufacturerId: int('manufacturer_id').notNull(),
    guid: varchar({ length: 64 }).notNull(),
  },
  (table) => [unique('manufacturer_link').on(table.manufacturerId, table.guid)]
)

export const ocManufacturerToStore = mysqlTable('oc_manufacturer_to_store', {
  manufacturerId: int('manufacturer_id').notNull(),
  storeId: int('store_id').notNull(),
})

export const ocMarketing = mysqlTable('oc_marketing', {
  marketingId: int('marketing_id').autoincrement().notNull(),
  name: varchar({ length: 32 }).notNull(),
  description: text().notNull(),
  code: varchar({ length: 64 }).notNull(),
  clicks: int().default(0).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocMegamenuKey = mysqlTable('oc_megamenu_key', {
  key: text().notNull(),
  licenseKey: text('license_key').notNull(),
})

export const ocMegamenuvh = mysqlTable('oc_megamenuvh', {
  megamenuId: int('megamenu_id').autoincrement().notNull(),
  namemenu: text().notNull(),
  additionalMenu: varchar('additional_menu', { length: 45 }).notNull(),
  link: text().notNull(),
  menuType: varchar('menu_type', { length: 45 }).notNull(),
  status: tinyint().default(1).notNull(),
  stickerParent: varchar('sticker_parent', { length: 255 }).notNull(),
  stickerParentBg: varchar('sticker_parent_bg', { length: 255 }).notNull(),
  spctext: varchar({ length: 255 }).notNull(),
  sortMenu: int('sort_menu').default(0).notNull(),
  image: varchar({ length: 255 }).notNull(),
  imageHover: varchar('image_hover', { length: 255 }).notNull(),
  informationsList: longtext('informations_list').notNull(),
  manufacturersSetting: longtext('manufacturers_setting').notNull(),
  productsSetting: longtext('products_setting').notNull(),
  linkSetting: tinyint('link_setting').notNull(),
  categorySetting: longtext('category_setting').notNull(),
  htmlSetting: longtext('html_setting').notNull(),
  freelinksSetting: longtext('freelinks_setting').notNull(),
  useAddHtml: tinyint('use_add_html').notNull(),
  addHtml: longtext('add_html').notNull(),
})

export const ocMegamenuvhSheme = mysqlTable('oc_megamenuvh_sheme', {
  megamenuId: int('megamenu_id').autoincrement().notNull(),
  mmShemeId: int('mm_sheme_id').notNull(),
  namemenu: varchar({ length: 255 }).notNull(),
  link: text().notNull(),
  menuType: varchar('menu_type', { length: 45 }).notNull(),
  status: tinyint().default(1).notNull(),
  stickerParent: varchar('sticker_parent', { length: 255 }).notNull(),
  stickerParentBg: varchar('sticker_parent_bg', { length: 255 }).notNull(),
  spctext: varchar({ length: 255 }).notNull(),
  sortMenu: int('sort_menu').default(0).notNull(),
  image: varchar({ length: 255 }).notNull(),
  imageHover: varchar('image_hover', { length: 255 }).notNull(),
  informationsList: longtext('informations_list').notNull(),
  manufacturersSetting: longtext('manufacturers_setting').notNull(),
  productsSetting: longtext('products_setting').notNull(),
  linkSetting: tinyint('link_setting').notNull(),
  categorySetting: longtext('category_setting').notNull(),
  htmlSetting: longtext('html_setting').notNull(),
  freelinksSetting: longtext('freelinks_setting').notNull(),
  useAddHtml: tinyint('use_add_html').notNull(),
  addHtml: longtext('add_html').notNull(),
})

export const ocMegamenuvhShemeList = mysqlTable('oc_megamenuvh_sheme_list', {
  mmShemeId: int('mm_sheme_id').autoincrement().notNull(),
  name: varchar({ length: 255 }).notNull(),
  menuShemeType: int('menu_sheme_type').notNull(),
})

export const ocMenu = mysqlTable('oc_menu', {
  menuId: int('menu_id').autoincrement().notNull(),
  storeId: int('store_id').notNull(),
  type: varchar({ length: 6 }).notNull(),
  link: varchar({ length: 255 }).notNull(),
  sortOrder: int('sort_order').notNull(),
  status: tinyint().notNull(),
})

export const ocMenuDescription = mysqlTable('oc_menu_description', {
  menuId: int('menu_id').notNull(),
  languageId: int('language_id').notNull(),
  name: varchar({ length: 64 }).notNull(),
})

export const ocMenuModule = mysqlTable(
  'oc_menu_module',
  {
    menuModuleId: int('menu_module_id').notNull(),
    menuId: int('menu_id').notNull(),
    code: varchar({ length: 64 }).notNull(),
    sortOrder: int('sort_order').notNull(),
  },
  (table) => [index('menu_id').on(table.menuId)]
)

export const ocModification = mysqlTable('oc_modification', {
  modificationId: int('modification_id').autoincrement().notNull(),
  name: varchar({ length: 64 }).notNull(),
  code: varchar({ length: 64 }).notNull(),
  author: varchar({ length: 64 }).notNull(),
  version: varchar({ length: 32 }).notNull(),
  link: varchar({ length: 255 }).notNull(),
  xml: mediumtext().notNull(),
  status: tinyint().notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
  dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
})

export const ocModule = mysqlTable('oc_module', {
  moduleId: int('module_id').autoincrement().notNull(),
  name: varchar({ length: 64 }).notNull(),
  code: varchar({ length: 32 }).notNull(),
  setting: text().notNull(),
})

export const ocOcfilterOption = mysqlTable(
  'oc_ocfilter_option',
  {
    optionId: int('option_id').autoincrement().notNull(),
    type: varchar({ length: 16 }).default('checkbox').notNull(),
    keyword: varchar({ length: 255 }).default('').notNull(),
    selectbox: tinyint().default(0).notNull(),
    grouping: tinyint().default(0).notNull(),
    color: tinyint().default(0).notNull(),
    image: tinyint().default(0).notNull(),
    status: tinyint().default(1).notNull(),
    sortOrder: int('sort_order').default(0).notNull(),
  },
  (table) => [
    index('keyword').on(table.keyword),
    index('sort_order').on(table.sortOrder),
  ]
)

export const ocOcfilterOptionDescription = mysqlTable(
  'oc_ocfilter_option_description',
  {
    optionId: int('option_id').notNull(),
    languageId: tinyint('language_id').notNull(),
    name: varchar({ length: 255 }).default('').notNull(),
    postfix: varchar({ length: 32 }).default('').notNull(),
    description: varchar({ length: 255 }).default('').notNull(),
  }
)

export const ocOcfilterOptionToCategory = mysqlTable(
  'oc_ocfilter_option_to_category',
  {
    optionId: int('option_id').notNull(),
    categoryId: int('category_id').notNull(),
  },
  (table) => [index('category_id').on(table.categoryId)]
)

export const ocOcfilterOptionToStore = mysqlTable(
  'oc_ocfilter_option_to_store',
  {
    optionId: int('option_id').notNull(),
    storeId: int('store_id').notNull(),
  }
)

export const ocOcfilterOptionValue = mysqlTable(
  'oc_ocfilter_option_value',
  {
    valueId: bigint('value_id', { mode: 'number' }).autoincrement().notNull(),
    optionId: int('option_id').default(0).notNull(),
    keyword: varchar({ length: 255 }).default('').notNull(),
    color: varchar({ length: 6 }).default('').notNull(),
    image: varchar({ length: 255 }).default('').notNull(),
    sortOrder: int('sort_order').default(0).notNull(),
  },
  (table) => [
    index('keyword').on(table.keyword),
    index('option_id').on(table.optionId),
  ]
)

export const ocOcfilterOptionValueDescription = mysqlTable(
  'oc_ocfilter_option_value_description',
  {
    valueId: bigint('value_id', { mode: 'number' }).notNull(),
    optionId: int('option_id').notNull(),
    languageId: tinyint('language_id').notNull(),
    name: varchar({ length: 255 }).default('').notNull(),
  },
  (table) => [
    index('name').on(table.name),
    index('option_id').on(table.optionId),
  ]
)

export const ocOcfilterOptionValueToProduct = mysqlTable(
  'oc_ocfilter_option_value_to_product',
  {
    ocfilterOptionValueToProductId: int('ocfilter_option_value_to_product_id')
      .autoincrement()
      .notNull(),
    productId: int('product_id').notNull(),
    optionId: int('option_id').notNull(),
    valueId: bigint('value_id', { mode: 'number' }).notNull(),
    slideValueMin: decimal('slide_value_min', { precision: 15, scale: 4 })
      .default('0.0000')
      .notNull(),
    slideValueMax: decimal('slide_value_max', { precision: 15, scale: 4 })
      .default('0.0000')
      .notNull(),
  },
  (table) => [
    index('product_id').on(table.productId),
    index('slide_value_min_slide_value_max').on(
      table.slideValueMin,
      table.slideValueMax
    ),
    unique('option_id_value_id_product_id').on(
      table.optionId,
      table.valueId,
      table.productId
    ),
  ]
)

export const ocOcfilterOptionValueToProductDescription = mysqlTable(
  'oc_ocfilter_option_value_to_product_description',
  {
    productId: int('product_id').notNull(),
    valueId: bigint('value_id', { mode: 'number' }).notNull(),
    optionId: int('option_id').notNull(),
    languageId: tinyint('language_id').notNull(),
    description: varchar({ length: 255 }).default('').notNull(),
  }
)

export const ocOcfilterPage = mysqlTable(
  'oc_ocfilter_page',
  {
    ocfilterPageId: int('ocfilter_page_id').autoincrement().notNull(),
    categoryId: int('category_id').default(0).notNull(),
    keyword: varchar({ length: 255 }).notNull(),
    params: varchar({ length: 255 }).notNull(),
    // Warning: Can't parse set('domain','category') from database
    // set('domain','category')Type: set('domain','category')("over").notNull(),
    status: tinyint().default(1).notNull(),
  },
  (table) => [
    index('category_id_params').on(table.categoryId, table.params),
    index('keyword').on(table.keyword),
  ]
)

export const ocOcfilterPageDescription = mysqlTable(
  'oc_ocfilter_page_description',
  {
    ocfilterPageId: int('ocfilter_page_id').default(0).notNull(),
    languageId: int('language_id').default(0).notNull(),
    metaTitle: varchar('meta_title', { length: 255 }).notNull(),
    metaKeyword: varchar('meta_keyword', { length: 255 }).notNull(),
    metaDescription: varchar('meta_description', { length: 255 }).notNull(),
    description: text().notNull(),
    title: varchar({ length: 128 }).notNull(),
  }
)

export const ocOption = mysqlTable('oc_option', {
  optionId: int('option_id').autoincrement().notNull(),
  type: varchar({ length: 32 }).notNull(),
  sortOrder: int('sort_order').notNull(),
})

export const ocOptionDescription = mysqlTable('oc_option_description', {
  optionId: int('option_id').notNull(),
  languageId: int('language_id').notNull(),
  name: varchar({ length: 128 }).notNull(),
})

export const ocOptionValue = mysqlTable('oc_option_value', {
  optionValueId: int('option_value_id').autoincrement().notNull(),
  optionId: int('option_id').notNull(),
  image: varchar({ length: 255 }).notNull(),
  sortOrder: int('sort_order').notNull(),
})

export const ocOptionValueDescription = mysqlTable(
  'oc_option_value_description',
  {
    optionValueId: int('option_value_id').notNull(),
    languageId: int('language_id').notNull(),
    optionId: int('option_id').notNull(),
    name: varchar({ length: 128 }).notNull(),
  }
)

export const ocOrder = mysqlTable('oc_order', {
  orderId: int('order_id').autoincrement().notNull(),
  trackNo: varchar('track_no', { length: 32 }).notNull(),
  invoiceNo: int('invoice_no').default(0).notNull(),
  invoicePrefix: varchar('invoice_prefix', { length: 26 }).notNull(),
  storeId: int('store_id').default(0).notNull(),
  storeName: varchar('store_name', { length: 64 }).notNull(),
  storeUrl: varchar('store_url', { length: 255 }).notNull(),
  customerId: int('customer_id').default(0).notNull(),
  customerGroupId: int('customer_group_id').default(0).notNull(),
  firstname: varchar({ length: 32 }).notNull(),
  lastname: varchar({ length: 32 }).notNull(),
  email: varchar({ length: 96 }).notNull(),
  telephone: varchar({ length: 32 }).notNull(),
  fax: varchar({ length: 32 }).notNull(),
  customField: text('custom_field').notNull(),
  paymentFirstname: varchar('payment_firstname', { length: 32 }).notNull(),
  paymentLastname: varchar('payment_lastname', { length: 32 }).notNull(),
  paymentCompany: varchar('payment_company', { length: 60 }).notNull(),
  paymentAddress1: varchar('payment_address_1', { length: 128 }).notNull(),
  paymentAddress2: varchar('payment_address_2', { length: 128 }).notNull(),
  paymentCity: varchar('payment_city', { length: 128 }).notNull(),
  paymentPostcode: varchar('payment_postcode', { length: 10 }).notNull(),
  paymentCountry: varchar('payment_country', { length: 128 }).notNull(),
  paymentCountryId: int('payment_country_id').notNull(),
  paymentZone: varchar('payment_zone', { length: 128 }).notNull(),
  paymentZoneId: int('payment_zone_id').notNull(),
  paymentAddressFormat: text('payment_address_format').notNull(),
  paymentCustomField: text('payment_custom_field').notNull(),
  paymentMethod: varchar('payment_method', { length: 128 }).notNull(),
  paymentCode: varchar('payment_code', { length: 128 }).notNull(),
  shippingFirstname: varchar('shipping_firstname', { length: 32 }).notNull(),
  shippingLastname: varchar('shipping_lastname', { length: 32 }).notNull(),
  shippingCompany: varchar('shipping_company', { length: 40 }).notNull(),
  shippingAddress1: varchar('shipping_address_1', { length: 128 }).notNull(),
  shippingAddress2: varchar('shipping_address_2', { length: 128 }).notNull(),
  shippingCity: varchar('shipping_city', { length: 128 }).notNull(),
  shippingPostcode: varchar('shipping_postcode', { length: 10 }).notNull(),
  shippingCountry: varchar('shipping_country', { length: 128 }).notNull(),
  shippingCountryId: int('shipping_country_id').notNull(),
  shippingZone: varchar('shipping_zone', { length: 128 }).notNull(),
  shippingZoneId: int('shipping_zone_id').notNull(),
  shippingAddressFormat: text('shipping_address_format').notNull(),
  shippingCustomField: text('shipping_custom_field').notNull(),
  shippingMethod: varchar('shipping_method', { length: 128 }).notNull(),
  shippingCode: varchar('shipping_code', { length: 128 }).notNull(),
  comment: text().notNull(),
  total: decimal({ precision: 15, scale: 4 }).default('0.0000').notNull(),
  orderStatusId: int('order_status_id').default(0).notNull(),
  affiliateId: int('affiliate_id').notNull(),
  commission: decimal({ precision: 15, scale: 4 }).notNull(),
  marketingId: int('marketing_id').notNull(),
  tracking: varchar({ length: 64 }).notNull(),
  languageId: int('language_id').notNull(),
  currencyId: int('currency_id').notNull(),
  currencyCode: varchar('currency_code', { length: 3 }).notNull(),
  currencyValue: decimal('currency_value', { precision: 15, scale: 8 })
    .default('1.00000000')
    .notNull(),
  ip: varchar({ length: 40 }).notNull(),
  forwardedIp: varchar('forwarded_ip', { length: 40 }).notNull(),
  userAgent: varchar('user_agent', { length: 255 }).notNull(),
  acceptLanguage: varchar('accept_language', { length: 255 }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
  dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
})

export const ocOrderCustomField = mysqlTable('oc_order_custom_field', {
  orderCustomFieldId: int('order_custom_field_id').autoincrement().notNull(),
  orderId: int('order_id').notNull(),
  customFieldId: int('custom_field_id').notNull(),
  customFieldValueId: int('custom_field_value_id').notNull(),
  name: varchar({ length: 255 }).notNull(),
  value: text().notNull(),
  type: varchar({ length: 32 }).notNull(),
  location: varchar({ length: 16 }).notNull(),
})

export const ocOrderHistory = mysqlTable(
  'oc_order_history',
  {
    orderHistoryId: int('order_history_id').autoincrement().notNull(),
    orderId: int('order_id').notNull(),
    orderStatusId: int('order_status_id').notNull(),
    notify: tinyint().default(0).notNull(),
    comment: text().notNull(),
    dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
  },
  (table) => [index('order_id').on(table.orderId)]
)

export const ocOrderOption = mysqlTable('oc_order_option', {
  orderOptionId: int('order_option_id').autoincrement().notNull(),
  orderId: int('order_id').notNull(),
  orderProductId: int('order_product_id').notNull(),
  productOptionId: int('product_option_id').notNull(),
  productOptionValueId: int('product_option_value_id').default(0).notNull(),
  name: varchar({ length: 255 }).notNull(),
  value: text().notNull(),
  type: varchar({ length: 32 }).notNull(),
})

export const ocOrderProduct = mysqlTable('oc_order_product', {
  orderProductId: int('order_product_id').autoincrement().notNull(),
  orderId: int('order_id').notNull(),
  productId: int('product_id').notNull(),
  name: varchar({ length: 1024 }),
  model: varchar({ length: 64 }).notNull(),
  quantity: int().notNull(),
  unitId: int('unit_id').default(0),
  price: decimal({ precision: 15, scale: 4 }).default('0.0000').notNull(),
  total: decimal({ precision: 15, scale: 4 }).default('0.0000').notNull(),
  tax: decimal({ precision: 15, scale: 4 }).default('0.0000').notNull(),
  reward: int().notNull(),
})

export const ocOrderRecurring = mysqlTable('oc_order_recurring', {
  orderRecurringId: int('order_recurring_id').autoincrement().notNull(),
  orderId: int('order_id').notNull(),
  reference: varchar({ length: 255 }).notNull(),
  productId: int('product_id').notNull(),
  productName: varchar('product_name', { length: 255 }).notNull(),
  productQuantity: int('product_quantity').notNull(),
  recurringId: int('recurring_id').notNull(),
  recurringName: varchar('recurring_name', { length: 255 }).notNull(),
  recurringDescription: varchar('recurring_description', {
    length: 255,
  }).notNull(),
  recurringFrequency: varchar('recurring_frequency', { length: 25 }).notNull(),
  recurringCycle: smallint('recurring_cycle').notNull(),
  recurringDuration: smallint('recurring_duration').notNull(),
  recurringPrice: decimal('recurring_price', {
    precision: 10,
    scale: 4,
  }).notNull(),
  trial: tinyint().notNull(),
  trialFrequency: varchar('trial_frequency', { length: 25 }).notNull(),
  trialCycle: smallint('trial_cycle').notNull(),
  trialDuration: smallint('trial_duration').notNull(),
  trialPrice: decimal('trial_price', { precision: 10, scale: 4 }).notNull(),
  status: tinyint().notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocOrderRecurringTransaction = mysqlTable(
  'oc_order_recurring_transaction',
  {
    orderRecurringTransactionId: int('order_recurring_transaction_id')
      .autoincrement()
      .notNull(),
    orderRecurringId: int('order_recurring_id').notNull(),
    reference: varchar({ length: 255 }).notNull(),
    type: varchar({ length: 255 }).notNull(),
    amount: decimal({ precision: 10, scale: 4 }).notNull(),
    dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
  }
)

export const ocOrderSimpleFields = mysqlTable('oc_order_simple_fields', {
  orderId: int('order_id').notNull(),
  requisites: varchar({ length: 255 }).default('').notNull(),
  metadata: text(),
})

export const ocOrderStatus = mysqlTable('oc_order_status', {
  orderStatusId: int('order_status_id').autoincrement().notNull(),
  languageId: int('language_id').notNull(),
  name: varchar({ length: 32 }).notNull(),
})

export const ocOrderTotal = mysqlTable(
  'oc_order_total',
  {
    orderTotalId: int('order_total_id').autoincrement().notNull(),
    orderId: int('order_id').notNull(),
    code: varchar({ length: 32 }).notNull(),
    title: varchar({ length: 255 }).notNull(),
    value: decimal({ precision: 15, scale: 4 }).default('0.0000').notNull(),
    sortOrder: int('sort_order').notNull(),
  },
  (table) => [index('order_id').on(table.orderId)]
)

export const ocOrderVoucher = mysqlTable('oc_order_voucher', {
  orderVoucherId: int('order_voucher_id').autoincrement().notNull(),
  orderId: int('order_id').notNull(),
  voucherId: int('voucher_id').notNull(),
  description: varchar({ length: 255 }).notNull(),
  code: varchar({ length: 10 }).notNull(),
  fromName: varchar('from_name', { length: 64 }).notNull(),
  fromEmail: varchar('from_email', { length: 96 }).notNull(),
  toName: varchar('to_name', { length: 64 }).notNull(),
  toEmail: varchar('to_email', { length: 96 }).notNull(),
  voucherThemeId: int('voucher_theme_id').notNull(),
  message: text().notNull(),
  amount: decimal({ precision: 15, scale: 4 }).notNull(),
})

export const ocProduct = mysqlTable(
  'oc_product',
  {
    productId: int('product_id').autoincrement().notNull(),
    model: varchar({ length: 64 }).notNull(),
    sku: varchar({ length: 64 }).notNull(),
    upc: varchar({ length: 12 }).notNull(),
    ean: varchar({ length: 14 }).notNull(),
    jan: varchar({ length: 13 }).notNull(),
    isbn: varchar({ length: 17 }).notNull(),
    mpn: varchar({ length: 64 }).notNull(),
    location: varchar({ length: 128 }).notNull(),
    quantity: decimal({ precision: 15, scale: 3 }).default('0.000').notNull(),
    stockStatusId: int('stock_status_id').notNull(),
    image: varchar({ length: 255 }),
    video: varchar({ length: 128 }).default('').notNull(),
    manufacturerId: int('manufacturer_id').notNull(),
    shipping: tinyint().default(1).notNull(),
    price: decimal({ precision: 15, scale: 4 }).default('0.0000').notNull(),
    points: int().default(0).notNull(),
    taxClassId: int('tax_class_id').notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    dateAvailable: date('date_available', { mode: 'string' })
      .default('0000-00-00')
      .notNull(),
    weight: decimal({ precision: 15, scale: 3 }).default('0.000').notNull(),
    weightClassId: int('weight_class_id').default(0).notNull(),
    length: decimal({ precision: 15, scale: 2 }).default('0.00').notNull(),
    width: decimal({ precision: 15, scale: 2 }).default('0.00').notNull(),
    height: decimal({ precision: 15, scale: 2 }).default('0.00').notNull(),
    lengthClassId: int('length_class_id').default(0).notNull(),
    subtract: tinyint().default(1).notNull(),
    minimum: int().default(1).notNull(),
    sortOrder: int('sort_order').default(0).notNull(),
    status: tinyint().default(0).notNull(),
    viewed: int().default(0).notNull(),
    dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
    dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
    gpParentId: int('gp_parent_id').default(0).notNull(),
  },
  (table) => [
    index('IDX_manufacturer_id').on(table.manufacturerId),
    index('model').on(table.model),
  ]
)

export const ocProductAccessories = mysqlTable('oc_product_accessories', {
  accessoriesId: int('accessories_id').autoincrement().notNull(),
  productId: int('product_id'),
  accessoriesProductStrId: text('accessories_product_str_id'),
})

export const ocProductAttribute = mysqlTable('oc_product_attribute', {
  productId: int('product_id').notNull(),
  attributeId: int('attribute_id').notNull(),
  languageId: int('language_id').notNull(),
  text: text().notNull(),
})

export const ocProductDescription = mysqlTable(
  'oc_product_description',
  {
    productId: int('product_id').notNull(),
    languageId: int('language_id').notNull(),
    name: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    tag: text().notNull(),
    metaTitle: varchar('meta_title', { length: 255 }).notNull(),
    metaH1: varchar('meta_h1', { length: 255 }).notNull(),
    metaDescription: varchar('meta_description', { length: 500 }).notNull(),
    metaKeyword: varchar('meta_keyword', { length: 255 }).notNull(),
  },
  (table) => [index('name').on(table.name)]
)

export const ocProductDiscount = mysqlTable(
  'oc_product_discount',
  {
    productDiscountId: int('product_discount_id').autoincrement().notNull(),
    productId: int('product_id').notNull(),
    customerGroupId: int('customer_group_id').notNull(),
    quantity: int().default(0).notNull(),
    priority: int().default(1).notNull(),
    price: decimal({ precision: 15, scale: 4 }).default('0.0000').notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    dateStart: date('date_start', { mode: 'string' })
      .default('0000-00-00')
      .notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    dateEnd: date('date_end', { mode: 'string' })
      .default('0000-00-00')
      .notNull(),
  },
  (table) => [index('product_id').on(table.productId)]
)

export const ocProductFeature = mysqlTable(
  'oc_product_feature',
  {
    productFeatureId: int('product_feature_id').autoincrement().notNull(),
    productId: int('product_id').notNull(),
    ean: varchar({ length: 14 }).default('').notNull(),
    name: varchar({ length: 255 }).default('').notNull(),
    sku: varchar({ length: 128 }).default('').notNull(),
    guid: varchar({ length: 64 }).notNull(),
  },
  (table) => [unique('product_feature_key').on(table.productId, table.guid)]
)

export const ocProductFeatureValue = mysqlTable(
  'oc_product_feature_value',
  {
    productFeatureId: int('product_feature_id').notNull(),
    productOptionId: int('product_option_id').notNull(),
    productId: int('product_id').notNull(),
    productOptionValueId: int('product_option_value_id').notNull(),
  },
  (table) => [
    index('product_id').on(table.productId),
    index('product_option_id').on(table.productOptionId),
    index('product_option_value_id').on(table.productOptionValueId),
    unique('product_feature_value_key').on(
      table.productFeatureId,
      table.productId,
      table.productOptionValueId
    ),
  ]
)

export const ocProductFilter = mysqlTable('oc_product_filter', {
  productId: int('product_id').notNull(),
  filterId: int('filter_id').notNull(),
})

export const ocProductImage = mysqlTable(
  'oc_product_image',
  {
    productImageId: int('product_image_id').autoincrement().notNull(),
    productId: int('product_id').notNull(),
    image: varchar({ length: 255 }),
    sortOrder: int('sort_order').default(0).notNull(),
  },
  (table) => [index('product_id').on(table.productId)]
)

export const ocProductImageDescription = mysqlTable(
  'oc_product_image_description',
  {
    productImageId: int('product_image_id').notNull(),
    productId: int('product_id').notNull(),
    languageId: int('language_id').notNull(),
    name: varchar({ length: 255 }).default('').notNull(),
  },
  (table) => [
    unique('product_image_desc_key').on(
      table.productImageId,
      table.productId,
      table.languageId
    ),
  ]
)

export const ocProductMaster = mysqlTable(
  'oc_product_master',
  {
    masterProductId: int('master_product_id').notNull(),
    productId: int('product_id').notNull(),
    specialAttributeGroupId: int('special_attribute_group_id').notNull(),
  },
  (table) => [index('product_id').on(table.productId)]
)

export const ocProductOption = mysqlTable('oc_product_option', {
  productOptionId: int('product_option_id').autoincrement().notNull(),
  productId: int('product_id').notNull(),
  optionId: int('option_id').notNull(),
  value: text().notNull(),
  required: tinyint().notNull(),
  owqSetting: text('owq_setting').notNull(),
})

export const ocProductOptionValue = mysqlTable('oc_product_option_value', {
  productOptionValueId: int('product_option_value_id')
    .autoincrement()
    .notNull(),
  productOptionId: int('product_option_id').notNull(),
  productId: int('product_id').notNull(),
  optionId: int('option_id').notNull(),
  optionValueId: int('option_value_id').notNull(),
  quantity: decimal({ precision: 15, scale: 3 }).default('0.000').notNull(),
  subtract: tinyint().notNull(),
  price: decimal({ precision: 15, scale: 4 }).notNull(),
  pricePrefix: varchar('price_prefix', { length: 1 }).notNull(),
  points: int().notNull(),
  pointsPrefix: varchar('points_prefix', { length: 1 }).notNull(),
  weight: decimal({ precision: 15, scale: 2 }).notNull(),
  weightPrefix: varchar('weight_prefix', { length: 1 }).notNull(),
  optionSelect: tinyint('option_select').notNull(),
  isDefault: int('is_default').default(0).notNull(),
  image: varchar({ length: 255 }).default('').notNull(),
  sku: varchar({ length: 64 }).default('').notNull(),
})

export const ocProductPrice = mysqlTable(
  'oc_product_price',
  {
    productPriceId: int('product_price_id').autoincrement().notNull(),
    productId: int('product_id').notNull(),
    productFeatureId: int('product_feature_id').default(0).notNull(),
    customerGroupId: int('customer_group_id').default(0).notNull(),
    action: int().notNull(),
    price: decimal({ precision: 15, scale: 4 }).default('0.0000').notNull(),
    unitId: int('unit_id').default(0),
  },
  (table) => [
    index('product_feature_id').on(table.productFeatureId),
    unique('product_price_key').on(
      table.productId,
      table.productFeatureId,
      table.customerGroupId,
      table.action
    ),
  ]
)

export const ocProductQuantity = mysqlTable(
  'oc_product_quantity',
  {
    productQuantityId: int('product_quantity_id').autoincrement().notNull(),
    productId: int('product_id').notNull(),
    productFeatureId: int('product_feature_id').default(0).notNull(),
    warehouseId: int('warehouse_id').default(0).notNull(),
    quantity: decimal({ precision: 10, scale: 3 }).default('0.000'),
  },
  (table) => [
    index('product_feature_id').on(table.productFeatureId),
    index('warehouse_id').on(table.warehouseId),
    unique('product_quantity_key').on(
      table.productId,
      table.productFeatureId,
      table.warehouseId
    ),
  ]
)

export const ocProductRecurring = mysqlTable('oc_product_recurring', {
  productId: int('product_id').notNull(),
  recurringId: int('recurring_id').notNull(),
  customerGroupId: int('customer_group_id').notNull(),
})

export const ocProductRelated = mysqlTable('oc_product_related', {
  productId: int('product_id').notNull(),
  relatedId: int('related_id').notNull(),
})

export const ocProductReward = mysqlTable('oc_product_reward', {
  productRewardId: int('product_reward_id').autoincrement().notNull(),
  productId: int('product_id').default(0).notNull(),
  customerGroupId: int('customer_group_id').default(0).notNull(),
  points: int().default(0).notNull(),
})

export const ocProductSpecial = mysqlTable(
  'oc_product_special',
  {
    productSpecialId: int('product_special_id').autoincrement().notNull(),
    productId: int('product_id').notNull(),
    customerGroupId: int('customer_group_id').notNull(),
    priority: int().default(1).notNull(),
    price: decimal({ precision: 15, scale: 4 }).default('0.0000').notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    dateStart: date('date_start', { mode: 'string' })
      .default('0000-00-00')
      .notNull(),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    dateEnd: date('date_end', { mode: 'string' })
      .default('0000-00-00')
      .notNull(),
    discountWeek: text('discount_week'),
    discountTime: text('discount_time'),
    discountPeriod: varchar('discount_period', { length: 55 }),
    saveTime: int('save_time'),
  },
  (table) => [index('product_id').on(table.productId)]
)

export const ocProductSpecialAttribute = mysqlTable(
  'oc_product_special_attribute',
  {
    productSpecialAttributeId: int('product_special_attribute_id')
      .autoincrement()
      .notNull(),
    productId: int('product_id').notNull(),
    specialAttributeId: int('special_attribute_id').notNull(),
  }
)

export const ocProductTo1C = mysqlTable(
  'oc_product_to_1c',
  {
    productId: int('product_id').notNull(),
    guid: varchar({ length: 64 }).notNull(),
  },
  (table) => [unique('product_link').on(table.productId, table.guid)]
)

export const ocProductToCategory = mysqlTable(
  'oc_product_to_category',
  {
    productId: int('product_id').notNull(),
    categoryId: int('category_id').notNull(),
    mainCategory: tinyint('main_category').default(0).notNull(),
  },
  (table) => [index('category_id').on(table.categoryId)]
)

export const ocProductToDownload = mysqlTable('oc_product_to_download', {
  productId: int('product_id').notNull(),
  downloadId: int('download_id').notNull(),
})

export const ocProductToLayout = mysqlTable('oc_product_to_layout', {
  productId: int('product_id').notNull(),
  storeId: int('store_id').notNull(),
  layoutId: int('layout_id').notNull(),
})

export const ocProductToStore = mysqlTable('oc_product_to_store', {
  productId: int('product_id').notNull(),
  storeId: int('store_id').default(0).notNull(),
})

export const ocProductUnit = mysqlTable(
  'oc_product_unit',
  {
    productUnitId: int('product_unit_id').autoincrement().notNull(),
    productId: int('product_id').notNull(),
    productFeatureId: int('product_feature_id').default(0).notNull(),
    unitId: int('unit_id').default(0).notNull(),
    ratio: int().default(1),
  },
  (table) => [
    index('product_feature_id').on(table.productFeatureId),
    index('unit_id').on(table.unitId),
    unique('product_unit_key').on(
      table.productId,
      table.productFeatureId,
      table.unitId
    ),
  ]
)

export const ocProductVideo = mysqlTable(
  'oc_product_video',
  {
    productVideoId: int('product_video_id').autoincrement().notNull(),
    productId: int('product_id').notNull(),
    video: varchar({ length: 32 }),
    title: varchar({ length: 128 }).notNull(),
    sortOrder: int('sort_order').default(0).notNull(),
  },
  (table) => [index('product_id').on(table.productId)]
)

export const ocRaiffLinks = mysqlTable(
  'oc_raiff_links',
  {
    id: int().autoincrement().notNull(),
    orderId: int('order_id').notNull(),
    link: varchar({ length: 255 }).notNull(),
  },
  (table) => [index('order_id').on(table.orderId)]
)

export const ocRecurring = mysqlTable('oc_recurring', {
  recurringId: int('recurring_id').autoincrement().notNull(),
  price: decimal({ precision: 10, scale: 4 }).notNull(),
  frequency: mysqlEnum([
    'day',
    'week',
    'semi_month',
    'month',
    'year',
  ]).notNull(),
  duration: int().notNull(),
  cycle: int().notNull(),
  trialStatus: tinyint('trial_status').notNull(),
  trialPrice: decimal('trial_price', { precision: 10, scale: 4 }).notNull(),
  trialFrequency: mysqlEnum('trial_frequency', [
    'day',
    'week',
    'semi_month',
    'month',
    'year',
  ]).notNull(),
  trialDuration: int('trial_duration').notNull(),
  trialCycle: int('trial_cycle').notNull(),
  status: tinyint().notNull(),
  sortOrder: int('sort_order').notNull(),
})

export const ocRecurringDescription = mysqlTable('oc_recurring_description', {
  recurringId: int('recurring_id').notNull(),
  languageId: int('language_id').notNull(),
  name: varchar({ length: 255 }).notNull(),
})

export const ocReturn = mysqlTable('oc_return', {
  returnId: int('return_id').autoincrement().notNull(),
  orderId: int('order_id').notNull(),
  productId: int('product_id').notNull(),
  customerId: int('customer_id').notNull(),
  firstname: varchar({ length: 32 }).notNull(),
  lastname: varchar({ length: 32 }).notNull(),
  email: varchar({ length: 96 }).notNull(),
  telephone: varchar({ length: 32 }).notNull(),
  product: varchar({ length: 255 }).notNull(),
  model: varchar({ length: 64 }).notNull(),
  quantity: int().notNull(),
  opened: tinyint().notNull(),
  returnReasonId: int('return_reason_id').notNull(),
  returnActionId: int('return_action_id').notNull(),
  returnStatusId: int('return_status_id').notNull(),
  comment: text(),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  dateOrdered: date('date_ordered', { mode: 'string' })
    .default('0000-00-00')
    .notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
  dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
})

export const ocReturnAction = mysqlTable('oc_return_action', {
  returnActionId: int('return_action_id').autoincrement().notNull(),
  languageId: int('language_id').default(0).notNull(),
  name: varchar({ length: 64 }).notNull(),
})

export const ocReturnHistory = mysqlTable('oc_return_history', {
  returnHistoryId: int('return_history_id').autoincrement().notNull(),
  returnId: int('return_id').notNull(),
  returnStatusId: int('return_status_id').notNull(),
  notify: tinyint().notNull(),
  comment: text().notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocReturnReason = mysqlTable('oc_return_reason', {
  returnReasonId: int('return_reason_id').autoincrement().notNull(),
  languageId: int('language_id').default(0).notNull(),
  name: varchar({ length: 128 }).notNull(),
})

export const ocReturnStatus = mysqlTable('oc_return_status', {
  returnStatusId: int('return_status_id').autoincrement().notNull(),
  languageId: int('language_id').default(0).notNull(),
  name: varchar({ length: 128 }).notNull(),
})

export const ocReview = mysqlTable(
  'oc_review',
  {
    reviewId: int('review_id').autoincrement().notNull(),
    productId: int('product_id').notNull(),
    customerId: int('customer_id').notNull(),
    author: varchar({ length: 64 }).notNull(),
    text: text().notNull(),
    rating: int().notNull(),
    status: tinyint().default(0).notNull(),
    dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
    dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
  },
  (table) => [index('product_id').on(table.productId)]
)

export const ocSetting = mysqlTable('oc_setting', {
  settingId: int('setting_id').autoincrement().notNull(),
  storeId: int('store_id').default(0).notNull(),
  code: varchar({ length: 32 }).notNull(),
  key: varchar({ length: 64 }).notNull(),
  value: mediumtext().notNull(),
  serialized: tinyint().notNull(),
})

export const ocShippingShiptorAddress = mysqlTable(
  'oc_shipping_shiptor_address',
  {
    addressId: int('address_id').autoincrement().notNull(),
    customerId: int('customer_id').notNull(),
    kladrId: varchar('kladr_id', { length: 25 }).notNull(),
  },
  (table) => [
    index('customer_id').on(table.customerId),
    index('kladr_id').on(table.kladrId),
  ]
)

export const ocShippingShiptorCountries = mysqlTable(
  'oc_shipping_shiptor_countries',
  {
    id: int().autoincrement().notNull(),
    code: varchar({ length: 5 }).notNull(),
    name: varchar({ length: 30 }).notNull(),
  }
)

export const ocShippingShiptorOrders = mysqlTable(
  'oc_shipping_shiptor_orders',
  {
    orderId: int('order_id').notNull(),
    shiptorId: int('shiptor_id').notNull(),
    shipmentId: int('shipment_id').notNull(),
    dateShipment: datetime('date_shipment', { mode: 'string' }).notNull(),
    deliveryPoint: int('delivery_point').notNull(),
    patronymic: varchar({ length: 100 }).notNull(),
    address: varchar({ length: 150 }).notNull(),
    street: varchar({ length: 100 }).notNull(),
    house: varchar({ length: 10 }).notNull(),
    apartment: varchar({ length: 10 }).notNull(),
    shippingMethod: int('shipping_method').notNull(),
    kladrId: varchar('kladr_id', { length: 25 }).notNull(),
    time: tinyint().notNull(),
    weight: decimal({ precision: 15, scale: 2 }).notNull(),
  },
  (table) => [index('shiptor_id').on(table.shiptorId)]
)

export const ocShoputilsSpecials = mysqlTable('oc_shoputils_specials', {
  specialsId: int('specials_id').autoincrement().notNull(),
  name: varchar({ length: 512 }).notNull(),
  customerGroupIds: text('customer_group_ids').notNull(),
  priority: int().notNull(),
  percent: decimal({ precision: 10, scale: 2 }).notNull(),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  dateStart: date('date_start', { mode: 'string' }).notNull(),
  // you can use { mode: 'date' }, if you want to have Date as type for this column
  dateEnd: date('date_end', { mode: 'string' }).notNull(),
  objectsType: int('objects_type').notNull(),
  categories: text().notNull(),
  products: text().notNull(),
  manufacturers: text().notNull(),
  enabled: int().default(1).notNull(),
  sortOrder: int('sort_order').notNull(),
})

export const ocSimpleCart = mysqlTable('oc_simple_cart', {
  simpleCartId: int('simple_cart_id').autoincrement().notNull(),
  storeId: int('store_id'),
  customerId: int('customer_id'),
  email: varchar({ length: 96 }),
  firstname: varchar({ length: 32 }),
  lastname: varchar({ length: 32 }),
  telephone: varchar({ length: 32 }),
  products: text(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocSpecialAttribute = mysqlTable('oc_special_attribute', {
  specialAttributeId: int('special_attribute_id').autoincrement().notNull(),
  specialAttributeGroupId: int('special_attribute_group_id').notNull(),
  specialAttributeName: varchar('special_attribute_name', { length: 100 })
    .default('')
    .notNull(),
  specialAttributeValue: varchar('special_attribute_value', { length: 2000 })
    .default('')
    .notNull(),
})

export const ocSpecialAttributeGroup = mysqlTable(
  'oc_special_attribute_group',
  {
    specialAttributeGroupId: int('special_attribute_group_id').notNull(),
    specialAttributeGroupName: varchar('special_attribute_group_name', {
      length: 100,
    })
      .default('')
      .notNull(),
    specialAttributeGroupDescription: varchar(
      'special_attribute_group_description',
      { length: 4000 }
    )
      .default('')
      .notNull(),
  }
)

export const ocStockStatus = mysqlTable('oc_stock_status', {
  stockStatusId: int('stock_status_id').autoincrement().notNull(),
  languageId: int('language_id').notNull(),
  name: varchar({ length: 32 }).notNull(),
})

export const ocStore = mysqlTable('oc_store', {
  storeId: int('store_id').autoincrement().notNull(),
  name: varchar({ length: 64 }).notNull(),
  url: varchar({ length: 255 }).notNull(),
  ssl: varchar({ length: 255 }).notNull(),
})

export const ocStoreTo1C = mysqlTable(
  'oc_store_to_1c',
  {
    storeId: int('store_id').notNull(),
    guid: varchar({ length: 64 }).notNull(),
  },
  (table) => [unique('store_link').on(table.storeId, table.guid)]
)

export const ocTaxClass = mysqlTable('oc_tax_class', {
  taxClassId: int('tax_class_id').autoincrement().notNull(),
  title: varchar({ length: 32 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
  dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
})

export const ocTaxRate = mysqlTable('oc_tax_rate', {
  taxRateId: int('tax_rate_id').autoincrement().notNull(),
  geoZoneId: int('geo_zone_id').default(0).notNull(),
  name: varchar({ length: 32 }).notNull(),
  rate: decimal({ precision: 15, scale: 4 }).default('0.0000').notNull(),
  type: char({ length: 1 }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
  dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
})

export const ocTaxRateToCustomerGroup = mysqlTable(
  'oc_tax_rate_to_customer_group',
  {
    taxRateId: int('tax_rate_id').notNull(),
    customerGroupId: int('customer_group_id').notNull(),
  }
)

export const ocTaxRule = mysqlTable('oc_tax_rule', {
  taxRuleId: int('tax_rule_id').autoincrement().notNull(),
  taxClassId: int('tax_class_id').notNull(),
  taxRateId: int('tax_rate_id').notNull(),
  based: varchar({ length: 10 }).notNull(),
  priority: int().default(1).notNull(),
})

export const ocTheme = mysqlTable('oc_theme', {
  themeId: int('theme_id').autoincrement().notNull(),
  storeId: int('store_id').notNull(),
  theme: varchar({ length: 64 }).notNull(),
  route: varchar({ length: 64 }).notNull(),
  code: mediumtext().notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocTranslation = mysqlTable('oc_translation', {
  translationId: int('translation_id').autoincrement().notNull(),
  storeId: int('store_id').notNull(),
  languageId: int('language_id').notNull(),
  route: varchar({ length: 64 }).notNull(),
  key: varchar({ length: 64 }).notNull(),
  value: text().notNull(),
})

export const ocUlogin = mysqlTable(
  'oc_ulogin',
  {
    id: int().autoincrement().notNull(),
    userId: int('user_id').notNull(),
    identity: varchar({ length: 255 }).notNull(),
    network: varchar({ length: 50 }),
  },
  (table) => [
    index('identity').on(table.identity),
    index('user_id').on(table.userId),
  ]
)

export const ocUnit = mysqlTable(
  'oc_unit',
  {
    unitId: smallint('unit_id').autoincrement().notNull(),
    name: varchar({ length: 255 }).notNull(),
    numberCode: varchar('number_code', { length: 5 }).notNull(),
    rusName1: varchar('rus_name1', { length: 50 }).default('').notNull(),
    engName1: varchar('eng_name1', { length: 50 }).default('').notNull(),
    rusName2: varchar('rus_name2', { length: 50 }).default('').notNull(),
    engName2: varchar('eng_name2', { length: 50 }).default('').notNull(),
    unitGroupId: tinyint('unit_group_id').notNull(),
    unitTypeId: tinyint('unit_type_id').notNull(),
    visible: tinyint().default(1).notNull(),
    comment: varchar({ length: 255 }).default('').notNull(),
  },
  (table) => [
    index('unit_group_id').on(table.unitGroupId),
    index('unit_type_id').on(table.unitTypeId),
    unique('number_code').on(table.numberCode),
  ]
)

export const ocUnitGroup = mysqlTable('oc_unit_group', {
  unitGroupId: tinyint('unit_group_id').autoincrement().notNull(),
  name: varchar({ length: 255 }).notNull(),
})

export const ocUnitTo1C = mysqlTable(
  'oc_unit_to_1c',
  {
    unitId: smallint('unit_id').autoincrement().notNull(),
    guid: varchar({ length: 64 }).notNull(),
    name: varchar({ length: 16 }).notNull(),
    numberCode: int('number_code').default(0),
    fullName: varchar('full_name', { length: 50 }).default(''),
  },
  (table) => [
    index('key_name').on(table.name),
    unique('unit_link').on(table.unitId, table.guid),
  ]
)

export const ocUnitType = mysqlTable('oc_unit_type', {
  unitTypeId: tinyint('unit_type_id').autoincrement().notNull(),
  name: varchar({ length: 255 }).notNull(),
})

export const ocUpload = mysqlTable('oc_upload', {
  uploadId: int('upload_id').autoincrement().notNull(),
  name: varchar({ length: 255 }).notNull(),
  filename: varchar({ length: 255 }).notNull(),
  code: varchar({ length: 255 }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocUrlAlias = mysqlTable(
  'oc_url_alias',
  {
    urlAliasId: int('url_alias_id').autoincrement().notNull(),
    query: varchar({ length: 255 }).notNull(),
    keyword: varchar({ length: 255 }).notNull(),
  },
  (table) => [
    index('keyword').on(table.keyword),
    index('query').on(table.query),
  ]
)

export const ocUser = mysqlTable('oc_user', {
  userId: int('user_id').autoincrement().notNull(),
  userGroupId: int('user_group_id').notNull(),
  username: varchar({ length: 20 }).notNull(),
  password: varchar({ length: 40 }).notNull(),
  salt: varchar({ length: 9 }).notNull(),
  firstname: varchar({ length: 32 }).notNull(),
  lastname: varchar({ length: 32 }).notNull(),
  email: varchar({ length: 96 }).notNull(),
  image: varchar({ length: 255 }).notNull(),
  code: varchar({ length: 40 }).notNull(),
  ip: varchar({ length: 40 }).notNull(),
  status: tinyint().notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocUserGroup = mysqlTable('oc_user_group', {
  userGroupId: int('user_group_id').autoincrement().notNull(),
  name: varchar({ length: 64 }).notNull(),
  permission: text().notNull(),
})

export const ocVoucher = mysqlTable('oc_voucher', {
  voucherId: int('voucher_id').autoincrement().notNull(),
  orderId: int('order_id').notNull(),
  code: varchar({ length: 10 }).notNull(),
  fromName: varchar('from_name', { length: 64 }).notNull(),
  fromEmail: varchar('from_email', { length: 96 }).notNull(),
  toName: varchar('to_name', { length: 64 }).notNull(),
  toEmail: varchar('to_email', { length: 96 }).notNull(),
  voucherThemeId: int('voucher_theme_id').notNull(),
  message: text().notNull(),
  amount: decimal({ precision: 15, scale: 4 }).notNull(),
  status: tinyint().notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocVoucherHistory = mysqlTable('oc_voucher_history', {
  voucherHistoryId: int('voucher_history_id').autoincrement().notNull(),
  voucherId: int('voucher_id').notNull(),
  orderId: int('order_id').notNull(),
  amount: decimal({ precision: 15, scale: 4 }).notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
})

export const ocVoucherTheme = mysqlTable('oc_voucher_theme', {
  voucherThemeId: int('voucher_theme_id').autoincrement().notNull(),
  image: varchar({ length: 255 }).notNull(),
})

export const ocVoucherThemeDescription = mysqlTable(
  'oc_voucher_theme_description',
  {
    voucherThemeId: int('voucher_theme_id').notNull(),
    languageId: int('language_id').notNull(),
    name: varchar({ length: 32 }).notNull(),
  }
)

export const ocWarehouse = mysqlTable(
  'oc_warehouse',
  {
    warehouseId: smallint('warehouse_id').autoincrement().notNull(),
    name: varchar({ length: 100 }).default('').notNull(),
    guid: varchar({ length: 64 }).notNull(),
  },
  (table) => [unique('warehouse_link').on(table.warehouseId, table.guid)]
)

export const ocWeightClass = mysqlTable('oc_weight_class', {
  weightClassId: int('weight_class_id').autoincrement().notNull(),
  value: decimal({ precision: 15, scale: 2 }).default('0.00').notNull(),
})

export const ocWeightClassDescription = mysqlTable(
  'oc_weight_class_description',
  {
    weightClassId: int('weight_class_id').autoincrement().notNull(),
    languageId: int('language_id').notNull(),
    title: varchar({ length: 32 }).notNull(),
    unit: varchar({ length: 4 }).notNull(),
  }
)

export const ocZone = mysqlTable('oc_zone', {
  zoneId: int('zone_id').autoincrement().notNull(),
  countryId: int('country_id').notNull(),
  name: varchar({ length: 128 }).notNull(),
  code: varchar({ length: 32 }).notNull(),
  status: tinyint().default(1).notNull(),
})

export const ocZoneToGeoZone = mysqlTable('oc_zone_to_geo_zone', {
  zoneToGeoZoneId: int('zone_to_geo_zone_id').autoincrement().notNull(),
  countryId: int('country_id').notNull(),
  zoneId: int('zone_id').default(0).notNull(),
  geoZoneId: int('geo_zone_id').notNull(),
  dateAdded: datetime('date_added', { mode: 'string' }).notNull(),
  dateModified: datetime('date_modified', { mode: 'string' }).notNull(),
})

export const simpleGeo = mysqlTable(
  'simple_geo',
  {
    id: int().notNull(),
    zoneId: int('zone_id').notNull(),
    name: varchar({ length: 128 }).notNull(),
    fullname: varchar({ length: 512 }).notNull(),
    postcode: varchar({ length: 6 }).notNull(),
    level: tinyint(),
  },
  (table) => [index('name').on(table.name), index('zone_id').on(table.zoneId)]
)

export const simpleGeoIp = mysqlTable('simple_geo_ip', {
  start: bigint({ mode: 'number' }).notNull(),
  end: bigint({ mode: 'number' }).notNull(),
  geoId: int('geo_id').notNull(),
})

export const sturm3DModel = mysqlTable(
  'sturm_3d_model',
  {
    id: int().autoincrement().notNull(),
    settings: varchar({ length: 1000 }).default('').notNull(),
    productId: int('product_id').notNull(),
    showPage: int('show_page').default(1).notNull(),
    status: int().default(1).notNull(),
  },
  (table) => [
    index('product_id').on(table.productId),
    index('show_product').on(table.showPage),
    index('status').on(table.status),
  ]
)

export const sturmFiles = mysqlTable(
  'sturm_files',
  {
    id: int().autoincrement().notNull(),
    fileName: varchar('file_name', { length: 250 }).notNull(),
    filePath: varchar('file_path', { length: 255 }).notNull(),
    fileType: varchar('file_type', { length: 50 }).notNull(),
    productId: int('product_id').notNull(),
  },
  (table) => [
    index('file_name').on(table.fileName),
    index('file_path').on(table.filePath),
    index('product_id').on(table.productId),
  ]
)

export const sturmNews = mysqlTable(
  'sturm_news',
  {
    id: int().autoincrement().notNull(),
    title: varchar({ length: 255 }).notNull(),
    shortTxt: varchar('short_txt', { length: 500 }).notNull(),
    fullTxt: longtext('full_txt').notNull(),
    seoTitle: varchar('seo_title', { length: 255 }).default('').notNull(),
    seoDesc: varchar('seo_desc', { length: 500 }).default('').notNull(),
    image: varchar({ length: 255 }).default('').notNull(),
    status: int().default(0).notNull(),
    date: int().notNull(),
  },
  (table) => [index('date').on(table.date), index('status').on(table.status)]
)
