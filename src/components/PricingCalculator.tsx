
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { Calculator, Package } from 'lucide-react';
import PricingResults from './PricingResults';
import { SavedProduct } from './SavedProducts';
import BasicInformationTab from './pricing/BasicInformationTab';
import AdvancedTab from './pricing/AdvancedTab';
import { 
  PricingInputs, 
  PricingResults as PricingResultsType, 
  PricingMethod,
  calculatePrices,
  getTotalCost
} from '@/utils/pricingCalculations';

const PricingCalculator = () => {
  const { toast } = useToast();
  
  const [inputs, setInputs] = useState<PricingInputs>({
    productName: '',
    directCost: 0,
    indirectCost: 0,
    laborCost: 0,
    packagingCost: 0,
    freightCost: 0,
    commissionCost: 0,
    desiredMargin: 30,
    competitorPrice: 0,
    salesVolume: 100
  });
  
  const [results, setResults] = useState<PricingResultsType | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PricingMethod>('margin');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let parsedValue: string | number = value;
    
    if (name !== 'productName') {
      // Handle values with leading decimal point (e.g., ".9" becomes "0.9")
      if (value.startsWith('.')) {
        parsedValue = `0${value}`;
      }
      // Parse to float for numeric inputs
      parsedValue = parsedValue === '' ? 0 : parseFloat(parsedValue as string);
    }
    
    setInputs((prev) => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleCalculateClick = () => {
    try {
      if (!inputs.productName) {
        toast({
          title: "Nome do produto é necessário",
          description: "Por favor, informe o nome do produto",
          variant: "destructive"
        });
        return;
      }

      const totalCost = getTotalCost(inputs);
      
      if (totalCost <= 0) {
        toast({
          title: "Custos inválidos",
          description: "Os custos devem ser maiores que zero",
          variant: "destructive"
        });
        return;
      }

      const calculatedResults = calculatePrices(inputs, selectedMethod);
      setResults(calculatedResults);
      
      toast({
        title: "Preço calculado com sucesso!",
        description: `Preço recomendado: R$ ${isFinite(calculatedResults.recommendedPrice) ? calculatedResults.recommendedPrice.toFixed(2) : "Valor não calculável"}`
      });
    } catch (error) {
      toast({
        title: "Erro ao calcular preço",
        description: "Verifique os valores inseridos",
        variant: "destructive"
      });
    }
  };

  const saveProduct = () => {
    if (!results || !inputs.productName) {
      toast({
        title: "Não é possível salvar",
        description: "Calcule o preço primeiro para poder salvar o produto",
        variant: "destructive"
      });
      return;
    }

    // Create product object
    const product: SavedProduct = {
      id: Date.now().toString(),
      name: inputs.productName,
      directCost: inputs.directCost,
      indirectCost: inputs.indirectCost,
      laborCost: inputs.laborCost,
      packagingCost: inputs.packagingCost,
      freightCost: inputs.freightCost,
      commissionCost: inputs.commissionCost,
      desiredMargin: inputs.desiredMargin,
      finalPrice: results.recommendedPrice,
      createdAt: new Date()
    };

    // Get existing products
    const existingProducts = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    
    // Add new product
    const updatedProducts = [...existingProducts, product];
    
    // Save back to localStorage
    localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));

    toast({
      title: "Produto salvo com sucesso!",
      description: `${inputs.productName} foi adicionado à sua lista de produtos`
    });
  };

  const handleClear = () => {
    setInputs({
      productName: '',
      directCost: 0,
      indirectCost: 0,
      laborCost: 0,
      packagingCost: 0,
      freightCost: 0,
      commissionCost: 0,
      desiredMargin: 30,
      competitorPrice: 0,
      salesVolume: 100
    });
    setResults(null);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-pricing-blue-50 border-b border-pricing-blue-100 dark:bg-gray-800 dark:border-gray-700">
        <CardTitle className="text-pricing-blue-700 flex items-center gap-2 dark:text-blue-400">
          <Calculator className="h-5 w-5" /> Calculadora de Preço
        </CardTitle>
        <CardDescription className="dark:text-gray-300">
          Defina o preço ideal para seu produto com base em diferentes métodos de precificação
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4 dark:bg-gray-700">
            <TabsTrigger value="basic" className="dark:data-[state=active]:bg-gray-900">Informações Básicas</TabsTrigger>
            <TabsTrigger value="advanced" className="dark:data-[state=active]:bg-gray-900">Detalhes Avançados</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <BasicInformationTab 
              inputs={inputs} 
              handleInputChange={handleInputChange} 
            />
          </TabsContent>
          
          <TabsContent value="advanced">
            <AdvancedTab 
              inputs={inputs} 
              handleInputChange={handleInputChange}
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-pricing-blue-100 p-4 bg-pricing-blue-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleClear} className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700">Limpar</Button>
          {results && (
            <Button 
              variant="outline" 
              className="border-pricing-blue-400 text-pricing-blue-600 hover:bg-pricing-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-gray-700"
              onClick={saveProduct}
            >
              <Package className="h-4 w-4 mr-1" /> Salvar Produto
            </Button>
          )}
        </div>
        <Button 
          className="bg-pricing-blue-600 hover:bg-pricing-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          onClick={handleCalculateClick}
        >
          Calcular Preço
        </Button>
      </CardFooter>
      
      {results && (
        <PricingResults 
          results={results} 
          productName={inputs.productName}
          totalCost={getTotalCost(inputs)}
          competitorPrice={inputs.competitorPrice}
        />
      )}
    </Card>
  );
};

export default PricingCalculator;
