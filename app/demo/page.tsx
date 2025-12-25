"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  pipe,
  applyFilters,
  applySorting,
  applyPagination,
  createTableModel,
  Column,
  SortConfig,
} from "@/table-core";
import { ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  brand: string;
  rating: number;
};

const COLUMNS: Column[] = [
  { key: "id", label: "ID" },
  { key: "title", label: "Product Name" },
  { key: "category", label: "Category" },
  { key: "brand", label: "Brand" },
  { key: "price", label: "Price ($)" },
  { key: "rating", label: "Rating" },
];

export default function DemoPage() {
  const [rawData, setRawData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Table State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setRawData(data.products);
        setLoading(false);
      });
  }, []);

  // The Engine Pipeline
  const tableModel = useMemo(() => {
    return pipe(
      rawData,
      (data) =>
        applyFilters(
          data,
          searchTerm ? [{ key: "title", value: searchTerm }] : []
        ),
      (data) => applySorting(data, sortConfig),
      (data) => applyPagination(data, { page, pageSize }),
      (data) => createTableModel(COLUMNS, data)
    );
  }, [rawData, searchTerm, sortConfig, page]);

  // Total count for pagination logic
  const filteredCount = useMemo(() => {
    return applyFilters(
      rawData,
      searchTerm ? [{ key: "title", value: searchTerm }] : []
    ).length;
  }, [rawData, searchTerm]);

  const totalPages = Math.ceil(filteredCount / pageSize);

  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-medium animate-pulse">
          Loading amazing products...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Headless Table Demo
        </h1>
        <p className="text-muted-foreground">
          Powered by <code>table-core</code>. Pure logic, zero coupling.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Input
          placeholder="Search products by name..."
          className="max-w-xs"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1); // Reset to first page on search
          }}
        />
        <div className="text-sm text-muted-foreground">
          Showing {tableModel.rows.length} of {filteredCount} products
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              {tableModel.headers.map((col) => (
                <TableHead key={col.key}>
                  <button
                    onClick={() => handleSort(col.key)}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    {col.label}
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                  </button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableModel.rows.length > 0 ? (
              tableModel.rows.map((row) => (
                <TableRow key={row.key}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.columnKey}>
                      {cell.columnKey === "price"
                        ? `$${cell.value}`
                        : String(cell.value)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={COLUMNS.length}
                  className="h-24 text-center"
                >
                  No products found matching "{searchTerm}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {page} of {totalPages || 1}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page >= totalPages}
        >
          Next <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
