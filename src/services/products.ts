import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, category, image_url, price_15ml, price_35ml, price_100ml')
      .order('id', { ascending: false });

    if (error) {
      throw error;
    }

    // Transform the data to match Product interface
    return data?.map((product: any) => ({
      id: product.id.toString(),
      name: product.name || '',
      price: parseFloat(product.price_35ml || product.price || 0), // Default to 35ml price or base price
      category: (product.category || 'men') as 'men' | 'woman' | 'luxury-line' | 'unisex' | 'kids',
      notes: [], // Empty array since notes field doesn't exist in your table
      description: product.description || '',
      image: product.image_url && product.image_url.trim() ? product.image_url.trim() : undefined, // Map image_url to image, only if valid
      price_15ml: product.price_15ml ? parseFloat(product.price_15ml) : undefined,
      price_35ml: product.price_35ml ? parseFloat(product.price_35ml) : parseFloat(product.price || 0),
      price_100ml: product.price_100ml ? parseFloat(product.price_100ml) : undefined,
    })) || [];
  } catch (error) {
    return [];
  }
};

export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    // Try to parse as number first (in case ID is numeric in database)
    // Otherwise use as string
    const numericId = Number(id);
    const queryId = !isNaN(numericId) && numericId > 0 ? numericId : id;
    
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, category, image_url, price_15ml, price_35ml, price_100ml')
      .eq('id', queryId)
      .single();

    if (error) {
      return null;
    }

    if (!data) {
      return null;
    }

    // Transform the data to match Product interface
    return {
      id: data.id.toString(),
      name: data.name || '',
      price: parseFloat(data.price_35ml || data.price || 0), // Default to 35ml price or base price
      category: (data.category || 'men') as 'men' | 'woman' | 'luxury-line' | 'unisex' | 'kids',
      notes: [], // Empty array since notes field doesn't exist in your table
      description: data.description || '',
      image: data.image_url && data.image_url.trim() ? data.image_url.trim() : undefined, // Map image_url to image, only if valid
      price_15ml: data.price_15ml ? parseFloat(data.price_15ml) : undefined,
      price_35ml: data.price_35ml ? parseFloat(data.price_35ml) : parseFloat(data.price || 0),
      price_100ml: data.price_100ml ? parseFloat(data.price_100ml) : undefined,
    };
  } catch (error) {
    return null;
  }
};

