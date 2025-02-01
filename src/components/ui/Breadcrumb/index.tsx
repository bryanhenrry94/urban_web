import React, { FC } from "react";
import { MdHome } from "react-icons/md";
import Link from "next/link";
import { Breadcrumbs, Typography, SvgIcon } from "@mui/material";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item, index) => (
        <div key={item.label} style={{ display: "flex", alignItems: "center" }}>
          {index !== 0 && (
            <SvgIcon>
              <path
                d="M10 6l-4 4 4 4"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </SvgIcon>
          )}
          {item.href ? (
            <Link
              href={item.href}
              style={{ display: "flex", alignItems: "center" }}
            >
              {item.icon && (
                <SvgIcon>
                  <path d={item.icon} />
                </SvgIcon>
              )}
              <MdHome size={20} />
              <Typography variant="body2" color="textPrimary">
                {item.label}
              </Typography>
            </Link>
          ) : (
            <Typography variant="body2" color="textPrimary">
              {item.label}
            </Typography>
          )}
        </div>
      ))}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
