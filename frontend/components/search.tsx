"use client"

import { useState } from "react"
import { SearchIcon, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export function Search() {
  const [cvssRange, setCvssRange] = useState([0, 10])
  const [dateRange, setDateRange] = useState("")
  const [vendor, setVendor] = useState("")
  const [product, setProduct] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic here
    console.log("Search with filters:", { cvssRange, dateRange, vendor, product })
  }

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-10 w-full" placeholder="CVE ID, product, vendor..." type="search" />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cvss-range">CVSS Score Range</Label>
                <Slider id="cvss-range" min={0} max={10} step={0.1} value={cvssRange} onValueChange={setCvssRange} />
                <div className="text-sm text-muted-foreground">
                  {cvssRange[0].toFixed(1)} - {cvssRange[1].toFixed(1)}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-range">Date Range</Label>
                <Input
                  id="date-range"
                  placeholder="e.g., last 7 days, last month"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Input
                  id="vendor"
                  placeholder="e.g., Microsoft, Adobe"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product">Product</Label>
                <Input
                  id="product"
                  placeholder="e.g., Windows, Acrobat"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        Search
      </Button>
    </form>
  )
}

