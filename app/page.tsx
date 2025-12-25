import { BasicTable } from "@/components/BasicTable";



const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "age", label: "Age" },
]

const data = [
  { name: "A", email: "a@test.com", age: 25 },
  { name: "B", email: "b@test.com", age: 30 },
  { name: "C", email: "c@test.com", age: 35 },
]

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center">
      <BasicTable columns={columns} data={data} />
    </main>
  );
}
