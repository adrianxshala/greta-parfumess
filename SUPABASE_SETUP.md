# Supabase Setup Guide

## Database Table Structure

Your `products` table should have the following structure:

### Table: `products`

| Column Name   | Type           | Description                                                          | Required |
| ------------- | -------------- | -------------------------------------------------------------------- | -------- |
| `id`          | uuid or bigint | Primary key                                                          | Yes      |
| `name`        | text           | Product name                                                         | Yes      |
| `description` | text           | Product description                                                  | Yes      |
| `price`       | numeric        | Base product price (fallback, typically 35ml price)                  | Yes      |
| `category`    | text           | Product category: 'men', 'woman', 'luxury-line', 'unisex', or 'kids' | Yes      |
| `image_url`   | text           | Product image URL                                                    | No       |
| `price_15ml`  | numeric        | Price for 15ml size                                                  | No       |
| `price_35ml`  | numeric        | Price for 35ml size (default size)                                   | No       |
| `price_100ml` | numeric        | Price for 100ml size                                                 | No       |

### SQL to Create Table (if needed)

```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('men', 'woman', 'luxury-line', 'unisex', 'kids')),
  image_url TEXT,
  price_15ml NUMERIC(10, 2),
  price_35ml NUMERIC(10, 2),
  price_100ml NUMERIC(10, 2)
);

-- Enable Row Level Security (RLS) - Allow public read access
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT
  USING (true);
```

### Migration: Add Size Pricing Columns

If you already have a `products` table, run this migration to add size pricing columns:

```sql
-- Add size pricing columns
ALTER TABLE products
ADD COLUMN IF NOT EXISTS price_15ml NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS price_35ml NUMERIC(10, 2),
ADD COLUMN IF NOT EXISTS price_100ml NUMERIC(10, 2);

-- Update existing products to set price_35ml from base price if not set
UPDATE products
SET price_35ml = price
WHERE price_35ml IS NULL;
```

### Example Data

```sql
INSERT INTO products (name, description, price, category, image_url, price_15ml, price_35ml, price_100ml) VALUES
('Rose Éternelle', 'A timeless bouquet of fresh roses with subtle vanilla undertones. Perfect for romantic evenings.', 189.00, 'woman', 'https://example.com/rose.jpg', 89.00, 189.00, 349.00),
('Lavande Noir', 'Dark lavender meets mysterious musk in this sophisticated evening fragrance.', 165.00, 'woman', 'https://example.com/lavande.jpg', 79.00, 165.00, 299.00),
('Citrus Lumière', 'Bright citrus notes with woody base create an energizing daytime scent.', 149.00, 'unisex', 'https://example.com/citrus.jpg', 69.00, 149.00, 269.00);
```

**Note:**

- `price_35ml` is the default size and should typically match the base `price` field
- If `price_35ml` is not set, the system will use the base `price` field
- Products can have any combination of sizes (15ml, 35ml, 100ml) - missing sizes will be disabled in the UI

## Environment Variables

Make sure to set these in your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Notes

- The table structure matches: `id`, `name`, `description`, `price`, `category`
- Make sure RLS policies allow public read access for the products table
- Category values should be one of: 'men', 'woman', 'luxury-line', 'unisex', or 'kids'
- The code automatically handles the data transformation from Supabase to the UI
