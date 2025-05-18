
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PricingInputs, PricingMethod } from '@/utils/pricingCalculations';

interface AdvancedTabProps {
  inputs: PricingInputs;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedMethod: PricingMethod;
  setSelectedMethod: (value: PricingMethod) => void;
}

const AdvancedTab = ({ 
  inputs, 
  handleInputChange, 
  selectedMethod, 
  setSelectedMethod 
}: AdvancedTabProps) => {
  
  const handleSelectChange = (value: string) => {
    setSelectedMethod(value as PricingMethod);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="pricingMethod" className="dark:text-gray-200">Método de Precificação</Label>
        <Select value={selectedMethod} onValueChange={handleSelectChange}>
          <SelectTrigger className="dark:bg-gray-700 dark:text-white dark:border-gray-600">
            <SelectValue placeholder="Selecione um método" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
            <SelectItem value="margin" className="dark:text-gray-200">Margem sobre o custo</SelectItem>
            <SelectItem value="markup" className="dark:text-gray-200">Markup</SelectItem>
            <SelectItem value="contribution" className="dark:text-gray-200">Margem de contribuição</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="competitorPrice" className="dark:text-gray-200">Preço da Concorrência</Label>
          <Input 
            id="competitorPrice" 
            name="competitorPrice" 
            type="number" 
            step="0.01"
            placeholder="0.00" 
            value={inputs.competitorPrice === 0 ? '' : inputs.competitorPrice}
            onChange={handleInputChange}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div>
          <Label htmlFor="salesVolume" className="dark:text-gray-200">Volume de Vendas Estimado</Label>
          <Input 
            id="salesVolume" 
            name="salesVolume" 
            type="number" 
            step="1"
            placeholder="100" 
            value={inputs.salesVolume === 0 ? '' : inputs.salesVolume}
            onChange={handleInputChange}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedTab;
