
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Percent, Package, Truck, ShoppingBag } from 'lucide-react';
import { PricingInputs } from '@/utils/pricingCalculations';

interface BasicInformationTabProps {
  inputs: PricingInputs;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicInformationTab = ({ inputs, handleInputChange }: BasicInformationTabProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="productName" className="dark:text-gray-200">Nome do Produto</Label>
        <Input 
          id="productName" 
          name="productName" 
          placeholder="Ex: Camiseta Premium" 
          value={inputs.productName}
          onChange={handleInputChange}
          className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="directCost" className="flex items-center gap-1 dark:text-gray-200">
            <DollarSign className="h-4 w-4" /> Custo Direto (Matéria-prima)
          </Label>
          <Input 
            id="directCost" 
            name="directCost" 
            type="number" 
            step="0.01"
            placeholder="0.00" 
            value={inputs.directCost === 0 ? '' : inputs.directCost}
            onChange={handleInputChange}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div>
          <Label htmlFor="laborCost" className="flex items-center gap-1 dark:text-gray-200">
            <DollarSign className="h-4 w-4" /> Custo de Mão de Obra
          </Label>
          <Input 
            id="laborCost" 
            name="laborCost" 
            type="number" 
            step="0.01"
            placeholder="0.00" 
            value={inputs.laborCost === 0 ? '' : inputs.laborCost}
            onChange={handleInputChange}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="indirectCost" className="flex items-center gap-1 dark:text-gray-200">
            <DollarSign className="h-4 w-4" /> Custos Indiretos
          </Label>
          <Input 
            id="indirectCost" 
            name="indirectCost" 
            type="number" 
            step="0.01"
            placeholder="0.00" 
            value={inputs.indirectCost === 0 ? '' : inputs.indirectCost}
            onChange={handleInputChange}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div>
          <Label htmlFor="desiredMargin" className="flex items-center gap-1 dark:text-gray-200">
            <Percent className="h-4 w-4" /> Margem Desejada (%)
          </Label>
          <Input 
            id="desiredMargin" 
            name="desiredMargin" 
            type="number" 
            step="0.1"
            placeholder="30" 
            value={inputs.desiredMargin === 0 ? '' : inputs.desiredMargin}
            onChange={handleInputChange}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="packagingCost" className="flex items-center gap-1 dark:text-gray-200">
            <Package className="h-4 w-4" /> Custo de Embalagem
          </Label>
          <Input 
            id="packagingCost" 
            name="packagingCost" 
            type="number" 
            step="0.01"
            placeholder="0.00" 
            value={inputs.packagingCost === 0 ? '' : inputs.packagingCost}
            onChange={handleInputChange}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div>
          <Label htmlFor="freightCost" className="flex items-center gap-1 dark:text-gray-200">
            <Truck className="h-4 w-4" /> Custo de Frete
          </Label>
          <Input 
            id="freightCost" 
            name="freightCost" 
            type="number" 
            step="0.01"
            placeholder="0.00" 
            value={inputs.freightCost === 0 ? '' : inputs.freightCost}
            onChange={handleInputChange}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
        <div>
          <Label htmlFor="commissionCost" className="flex items-center gap-1 dark:text-gray-200">
            <ShoppingBag className="h-4 w-4" /> Comissão de Venda
          </Label>
          <Input 
            id="commissionCost" 
            name="commissionCost" 
            type="number" 
            step="0.01"
            placeholder="0.00" 
            value={inputs.commissionCost === 0 ? '' : inputs.commissionCost}
            onChange={handleInputChange}
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInformationTab;
