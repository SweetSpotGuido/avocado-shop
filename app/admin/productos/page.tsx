"use client";

import { useEffect,useState } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types/product";

export default function Productos(){

const [products,setProducts]=useState<Product[]>([]);

useEffect(()=>{

load();

},[]);

async function load(){

const {data}=await supabase
.from("products")
.select("*")
.eq("active",true)
.order("id",{ascending:false});

setProducts(data || []);

}

return(

<div className="max-w-7xl mx-auto grid grid-cols-4 gap-6 p-10">

{products.map(product=>(

<div
key={product.id}
className="bg-white rounded-xl shadow overflow-hidden">

<img
src={product.image_url || "/no-image.png"}
className="w-full h-60 object-cover"
/>

<div className="p-5">

<h2 className="font-bold text-xl">

{product.name}

</h2>

<p className="text-green-700 text-2xl mt-3">

${product.price}

</p>

<button
className="w-full bg-green-600 text-white mt-5 py-3 rounded-lg">

Comprar

</button>

</div>

</div>

))}

</div>

)

}
