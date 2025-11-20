import { createClient } from "@supabase/supabase-js";
import { initialProducts } from "../data/productsData";

const supabaseUrl = "https://zpknkxdzguqlhgkhyomp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwa25reGR6Z3VxbGhna2h5b21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MjE2ODIsImV4cCI6MjA3ODM5NzY4Mn0.Zzw9DwCtmWYkKAc9ao7ODCVtijtezxzzZz44EhX2vcA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadProducts() {
  console.log("🚀 Subiendo productos...");

  for (const product of initialProducts) {
    const { error } = await supabase
      .from("productos")
      .upsert(
        {
          id: product.id,
          nombre: product.nombre.trim(),
          url_imagen: product.url_imagen,
          precio: product.precio,
        },
        { onConflict: "id" }
      );

    if (error) {
      console.error(`❌ Error al subir ${product.nombre}:`, error.message);
    } else {
      console.log(`✅ Producto "${product.nombre}" sincronizado`);
    }
  }

  console.log("✅ Todos los productos fueron subidos o actualizados correctamente.");
}

// Ejecutamos directamente
uploadProducts();
