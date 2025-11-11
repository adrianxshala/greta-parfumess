# Supabase Setup Guide

## Database Table Structure

Your `products` table should have the following structure:

### Table: `products`

| Column Name   | Type           | Description                                                  | Required |
| ------------- | -------------- | ------------------------------------------------------------ | -------- |
| `id`          | uuid or bigint | Primary key                                                  | Yes      |
| `name`        | text           | Product name                                                 | Yes      |
| `description` | text           | Product description                                          | Yes      |
| `price`       | numeric        | Product price                                                | Yes      |
| `category`    | text           | Product category: 'floral', 'woody', 'citrus', or 'oriental' | Yes      |

### SQL to Create Table (if needed)

```sql
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('floral', 'woody', 'citrus', 'oriental'))
);

-- Enable Row Level Security (RLS) - Allow public read access
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT
  USING (true);
```

### Example Data

```sql
INSERT INTO products (name, description, price, category) VALUES
('Rose Éternelle', 'A timeless bouquet of fresh roses with subtle vanilla undertones. Perfect for romantic evenings.', 189.00, 'floral'),
('Lavande Noir', 'Dark lavender meets mysterious musk in this sophisticated evening fragrance.', 165.00, 'floral'),
('Citrus Lumière', 'Bright citrus notes with woody base create an energizing daytime scent.', 149.00, 'citrus');
```

## Environment Variables

Make sure to set these in your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Notes

- The table structure matches: `id`, `name`, `description`, `price`, `category`
- Make sure RLS policies allow public read access for the products table
- Category values should be one of: 'floral', 'woody', 'citrus', or 'oriental'
- The code automatically handles the data transformation from Supabase to the UI
