create table products (

  id bigint generated always as identity primary key,

  name text not null,

  slug text unique not null,

  description text,

  category text,

  sku text,

  barcode text,

  price numeric(10,2) not null,

  stock integer default 0,

  image_url text,

  active boolean default true,

  created_at timestamptz default now()

);

create table orders (

  id bigint generated always as identity primary key,

  customer_name text not null,

  customer_email text not null,

  customer_phone text,

  address text,

  city text,

  province text,

  zip_code text,

  total numeric(10,2),

  status text default 'Pendiente',

  created_at timestamptz default now()

);

create table order_items (

  id bigint generated always as identity primary key,

  order_id bigint references orders(id) on delete cascade,

  product_id bigint references products(id),

  product_name text,

  quantity integer,

  price numeric(10,2),

  subtotal numeric(10,2)

);
