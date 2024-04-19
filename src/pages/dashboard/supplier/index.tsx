import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Badge } from "../ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useState } from "react";

export default function Supplier() {
  const rowData = [
    { label: "Height", value: "20 cm" },
    { label: "Width", value: "30 cm" },
    { label: "Length", value: "50 cm" },
    { label: "Volume", value: "30000 cm³" },
    { label: "Quantity", value: "5" },
    { label: "Cargo Type", value: "Fragile" },
    { label: "Allow Stacking", value: "Yes" },
    { label: "Cold Storage", value: "No" },
    { label: "PickUp Address", value: "123 Main Street, City, Country" },
    { label: "Drop Address", value: "456 Park Avenue, Town, Country" },
  ];

  const [showDetails, setShowDetails] = useState(false);

  const handleClickDetails = () => {
    // Toggle the visibility of details page
    setShowDetails(!showDetails);
  };
  return (
    <>
      <div className="h-screen">
        <div className="px-10 pt-16 pb-4">
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="supplier">Supplier</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="grid grid-cols-4">
          <div className="mx-5 px-5 py-5 rounded-xl border col-span-2 space-y-5">
            <div className="flex space-x-4">
              <h1>Manage Request</h1>
              <Badge className="rounded-full">7</Badge>
            </div>
            <div>
              <div className="w-full border flex justify-between px-10 py-5 rounded-xl">
                <div>
                  <p className="text-xl font-medium">Label</p>
                  <p
                    className="text-sm text-gray-400 cursor-pointer"
                    onClick={handleClickDetails}
                  >
                    View Details
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex justify-center items-center w-10 h-10 rounded-full bg-green-200 cursor-pointer hover:bg-green-300">
                    <CheckIcon color="green" className="w-5 h-5" />
                  </div>
                  <div className="flex justify-center items-center w-10 h-10 rounded-full bg-red-200 cursor-pointer hover:bg-red-300">
                    <Cross2Icon color="red" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showDetails && (
            <div className="col-span-2">
              <div className="p-5 border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rowData.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.label}</TableCell>
                        <TableCell>{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export function Details() {
  return <></>;
}
