# Next.js template

This is a Next.js template with shadcn/ui.

If you dont have next installed try:

npm install next react-dom

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## Supabase Setup

1. Duplicate `.env.example` and rename it to `.env.local`.

2. Replace the values with the real Supabase project credentials.
URL: https://iehsdbvufggagbjylmwm.supabase.co 
ANON Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllaHNkYnZ1Z
mdnYWdianlsbXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MjYxNjksImV4cCI6MjA4ODQ
wMjE2OX0.PFF5lKopILSuYDClo6v_bV3vn_XJQo1xY1fiaLy2-H8 

3. Install dependencies:

npm install

4. Run the development server:

npm run dev