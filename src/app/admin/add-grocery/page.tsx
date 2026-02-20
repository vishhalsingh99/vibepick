// app/admin/add-grocery/page.tsx
// NO "use client" here → yeh server component hai

import AddGroceryForm from "@/components/AddGroceryForm"; // client component

export default function AddGroceryPage() {
  return (
    <div className="min-h-screen bg-black/90 p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Add New Grocery</h1>
      <AddGroceryForm />
    </div>
  );
}