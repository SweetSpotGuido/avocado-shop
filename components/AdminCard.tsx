import Link from "next/link";

interface Props {
  title: string;
  value: string | number;
  href: string;
}

export default function AdminCard({
  title,
  value,
  href,
}: Props) {
  return (
    <Link
      href={href}
      className="bg-white rounded-xl shadow p-6 hover:shadow-xl transition"
    >
      <p className="text-gray-500">{title}</p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>
    </Link>
  );
}
