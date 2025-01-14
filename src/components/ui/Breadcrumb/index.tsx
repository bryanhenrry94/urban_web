import React, { FC } from "react";
import { MdHome } from "react-icons/md";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  // const router = useRouter();

  return (
    <nav className="flex py-2" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items.map((item, index) => (
          <li key={item.label} className="inline-flex items-center">
            {index !== 0 && (
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            )}
            {item.href ? (
              <div className="flex gap-2 items-center">
                <MdHome size={20} className="text-gray-700" />
                <Link
                  href={item.href}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-500"
                >
                  {item.icon && (
                    <svg
                      className="w-3 h-3 me-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d={item.icon} />
                    </svg>
                  )}
                  <span className="text-lg font-bold text-gray-700">
                    {item.label}
                  </span>
                </Link>
              </div>
            ) : (
              <span className="ms-1 text-lg font-bold text-gray-700 md:ms-2 dark:text-gray-500">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
