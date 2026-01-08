import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Globe, Tag, X, Plus, ArrowRight, Info } from "lucide-react";

export function SearchStrategy({ patentName, onStartSearch }) {
  const [companies, setCompanies] = useState([]);
  const [companyInput, setCompanyInput] = useState("");
  const [countries, setCountries] = useState(["US"]);
  const [countryInput, setCountryInput] = useState("");
  const [terms, setTerms] = useState([]);
  const [termInput, setTermInput] = useState("");

  const suggestedCompanies = [
    "Samsung",
    "Apple",
    "LG Electronics",
    "Huawei",
    "Sony",
    "Xiaomi",
    "Microsoft",
    "Google",
  ];

  const suggestedCountries = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "EP", name: "European Union", flag: "🇪🇺" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "CN", name: "China", flag: "🇨🇳" },
    { code: "KR", name: "South Korea", flag: "🇰🇷" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
  ];

  const addCompany = (name) => {
    if (name && !companies.includes(name) && companies.length < 20) {
      setCompanies([...companies, name]);
      setCompanyInput("");
    }
  };

  const removeCompany = (name) => {
    setCompanies(companies.filter((c) => c !== name));
  };

  const addCountry = (code) => {
    if (code && !countries.includes(code) && countries.length < 10) {
      setCountries([...countries, code]);
      setCountryInput("");
    }
  };

  const removeCountry = (code) => {
    if (countries.length > 1) {
      setCountries(countries.filter((c) => c !== code));
    }
  };

  const addTerm = (term) => {
    if (term && !terms.includes(term) && terms.length < 15) {
      setTerms([...terms, term]);
      setTermInput("");
    }
  };

  const removeTerm = (term) => {
    setTerms(terms.filter((t) => t !== term));
  };

  const handleStartSearch = () => {
    onStartSearch({
      companies,
      countries,
      terms,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Define Search Strategy</h2>
        <p className="text-muted-foreground">
          Configure your search parameters to identify potential infringements
        </p>
        <div className="inline-flex items-center gap-2 bg-muted px-3 py-1.5 rounded-md">
          <span className="text-sm text-muted-foreground">Patent:</span>
          <span className="text-sm font-mono font-semibold">{patentName}</span>
        </div>
      </div>

      <Tabs defaultValue="companies" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="companies" className="gap-2">
            <Users className="w-4 h-4" />
            Companies
          </TabsTrigger>
          <TabsTrigger value="countries" className="gap-2">
            <Globe className="w-4 h-4" />
            Countries
          </TabsTrigger>
          <TabsTrigger value="terms" className="gap-2">
            <Tag className="w-4 h-4" />
            Terms
          </TabsTrigger>
        </TabsList>

        {/* Companies Tab */}
        <TabsContent value="companies" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Target Companies</CardTitle>
              <CardDescription>
                Add companies to search against (up to 20, optional but recommended)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-input">Add Company</Label>
                <div className="flex gap-2">
                  <Input
                    id="company-input"
                    placeholder="Enter company name..."
                    value={companyInput}
                    onChange={(e) => setCompanyInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addCompany(companyInput);
                      }
                    }}
                    disabled={companies.length >= 20}
                  />
                  <Button
                    onClick={() => addCompany(companyInput)}
                    disabled={!companyInput || companies.length >= 20}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">{companies.length}/20 companies added</p>
              </div>

              {companies.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Companies</Label>
                  <div className="flex flex-wrap gap-2">
                    {companies.map((company) => (
                      <Badge key={company} variant="secondary" className="gap-1 pr-1">
                        {company}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeCompany(company)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>Suggested Companies</Label>
                <div className="flex flex-wrap gap-2">
                  {suggestedCompanies
                    .filter((s) => !companies.includes(s))
                    .map((company) => (
                      <Button
                        key={company}
                        variant="outline"
                        size="sm"
                        onClick={() => addCompany(company)}
                        disabled={companies.length >= 20}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {company}
                      </Button>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Countries Tab */}
        <TabsContent value="countries" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Target Countries</CardTitle>
              <CardDescription>
                Select countries to search for patents (up to 10, at least 1 required)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Selected Countries ({countries.length}/10)</Label>
                <div className="flex flex-wrap gap-2">
                  {countries.map((code) => {
                    const country = suggestedCountries.find((c) => c.code === code);
                    return (
                      <Badge key={code} variant="secondary" className="gap-2 pr-1">
                        <span>{country?.flag || "🌐"}</span>
                        <span>{country?.name || code}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeCountry(code)}
                          disabled={countries.length === 1}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Available Countries</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {suggestedCountries
                    .filter((c) => !countries.includes(c.code))
                    .map((country) => (
                      <Button
                        key={country.code}
                        variant="outline"
                        size="sm"
                        onClick={() => addCountry(country.code)}
                        disabled={countries.length >= 10}
                        className="justify-start gap-2"
                      >
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </Button>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country-input">Add Custom Country Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="country-input"
                    placeholder="e.g., CA, AU, IN..."
                    value={countryInput}
                    onChange={(e) => setCountryInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addCountry(countryInput);
                      }
                    }}
                    disabled={countries.length >= 10}
                    maxLength={2}
                  />
                  <Button
                    onClick={() => addCountry(countryInput)}
                    disabled={!countryInput || countries.length >= 10}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Terms Tab */}
        <TabsContent value="terms" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Search Terms</CardTitle>
              <CardDescription>
                Add specific terms, names, or keywords to refine your search (up to 15, optional)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="term-input">Add Search Term</Label>
                <div className="flex gap-2">
                  <Input
                    id="term-input"
                    placeholder="e.g., foldable display, hinge mechanism..."
                    value={termInput}
                    onChange={(e) => setTermInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addTerm(termInput);
                      }
                    }}
                    disabled={terms.length >= 15}
                  />
                  <Button onClick={() => addTerm(termInput)} disabled={!termInput || terms.length >= 15}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">{terms.length}/15 terms added</p>
              </div>

              {terms.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Terms</Label>
                  <div className="flex flex-wrap gap-2">
                    {terms.map((term) => (
                      <Badge key={term} variant="secondary" className="gap-1 pr-1">
                        {term}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeTerm(term)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-muted/50 border border-border rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>
                      <strong>Tips for effective search terms:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-0.5 ml-2">
                      <li>Use specific technical terms from your patent</li>
                      <li>Include product names or model numbers</li>
                      <li>Add alternative terminology or synonyms</li>
                      <li>Consider related technologies or applications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Summary and Action */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="w-4 h-4" />
                <span>Search Configuration Summary</span>
              </div>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="text-muted-foreground">Searching across</span>{" "}
                  <span className="font-semibold">{countries.length} countries</span>
                </p>
                {companies.length > 0 && (
                  <p>
                    <span className="text-muted-foreground">Targeting</span>{" "}
                    <span className="font-semibold">{companies.length} companies</span>
                  </p>
                )}
                {terms.length > 0 && (
                  <p>
                    <span className="text-muted-foreground">Using</span>{" "}
                    <span className="font-semibold">{terms.length} search terms</span>
                  </p>
                )}
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleStartSearch}
              disabled={countries.length === 0}
              className="gap-2"
            >
              Start Analysis
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

