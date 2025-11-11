import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, category, image_url')
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      throw error;
    }

    // Transform the data to match Product interface
    // Your table has: id, name, description, price, category, image_url
    return data?.map((product: any) => ({
      id: product.id.toString(),
      name: product.name || '',
      price: parseFloat(product.price) || 0,
      category: (product.category || 'floral') as 'floral' | 'woody' | 'citrus' | 'oriental',
      notes: [], // Empty array since notes field doesn't exist in your table
      description: product.description || '',
      image: product.image_url || '', // Map image_url to image
    })) || [];
  } catch (error) {
    console.error('Error in fetchProducts:', error);
    return [];
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, category, image_url')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Transform the data to match Product interface
    // Your table has: id, name, description, price, category, image_url
    return {
      id: data.id.toString(),
      name: data.name || '',
      price: parseFloat(data.price) || 0,
      category: (data.category || 'floral') as 'floral' | 'woody' | 'citrus' | 'oriental',
      notes: [], // Empty array since notes field doesn't exist in your table
      description: data.description || '',
      image: data.image_url || '', // Map image_url to image
    };
  } catch (error) {
    console.error('Error in fetchProductById:', error);
    return null;
  }
};

