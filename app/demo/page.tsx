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
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ArrowLeft,
  Search,
} from "lucide-react";
import Link from "next/link";

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
      <div className="flex h-screen items-center justify-center bg-[#030303]">
        <div className="text-xl font-medium animate-pulse text-purple-400">
          Loading Table...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-purple-500/30 py-10 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-purple-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{" "}
              Back to Landing
            </Link>
            <h1 className="text-4xl font-black tracking-tighter">
              Live <span className="text-gradient">Engine Demo</span>
            </h1>
            <p className="text-gray-400 max-w-lg">
              Interact with the headless table engine. All processing happens
              through pure functional transformations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-purple-400">
              {filteredCount} Products
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search products..."
              className="pl-11 bg-white/5 border-white/10 focus:border-purple-500/50 rounded-2xl h-11 text-white placeholder:text-gray-500"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-400 mr-2">
              Page {page} of {totalPages || 1}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="w-11 h-11 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/30 text-white transition-all disabled:opacity-20"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-11 h-11 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/30 text-white transition-all disabled:opacity-20"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/5 hover:bg-transparent">
                  {tableModel.headers.map((col) => (
                    <TableHead
                      key={col.key}
                      className="text-gray-400 font-bold py-5 h-auto"
                    >
                      <button
                        onClick={() => handleSort(col.key)}
                        className="flex items-center gap-2 hover:text-white transition-colors uppercase tracking-widest text-[10px]"
                      >
                        {col.label}
                        <ChevronsUpDown
                          className={`h-3 w-3 ${
                            sortConfig?.key === col.key
                              ? "text-purple-400"
                              : "opacity-30"
                          }`}
                        />
                      </button>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableModel.rows.length > 0 ? (
                  tableModel.rows.map((row) => (
                    <TableRow
                      key={row.key}
                      className="border-white/5 hover:bg-white/[0.03] transition-colors group"
                    >
                      {row.cells.map((cell) => (
                        <TableCell
                          key={cell.columnKey}
                          className="py-5 text-gray-300"
                        >
                          {cell.columnKey === "price" ? (
                            <span className="font-mono text-purple-400 font-bold">
                              ${cell.value as any}
                            </span>
                          ) : cell.columnKey === "rating" ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-lg bg-yellow-500/10 text-yellow-500 text-xs font-bold border border-yellow-500/10">
                              ★ {cell.value as any}
                            </span>
                          ) : (
                            String(cell.value)
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={COLUMNS.length}
                      className="h-64 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-2">
                          <Search className="w-6 h-6 opacity-20" />
                        </div>
                        <p className="font-medium">
                          No results found matching "{searchTerm}"
                        </p>
                        <p className="text-sm">
                          Try using different search terms or clearing filters.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-gray-600">
          Powered by <code>table-core</code> pipeline. No heavy libraries, just
          pure transforms.
        </div>
      </div>
    </div>
  );
}
