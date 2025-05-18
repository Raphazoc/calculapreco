
export interface PricingInputs {
  productName: string;
  directCost: number;
  indirectCost: number;
  laborCost: number;
  packagingCost: number;
  freightCost: number;
  commissionCost: number;
  desiredMargin: number;
  competitorPrice: number;
  salesVolume: number;
}

export interface PricingResults {
  marginPrice: number;
  markupPrice: number;
  contributionPrice: number;
  recommendedPrice: number;
  profit: number;
  marginPercentage: number;
}

export type PricingMethod = 'margin' | 'markup' | 'contribution';

export const calculatePrices = (inputs: PricingInputs, selectedMethod: PricingMethod): PricingResults => {
  const totalCost = inputs.directCost + inputs.indirectCost + inputs.laborCost + 
                    inputs.packagingCost + inputs.freightCost + inputs.commissionCost;
  
  // Prevent division by zero for 100% margin
  const safeMargin = Math.min(99.99, inputs.desiredMargin);
  
  // Cálculo baseado em margem sobre custo
  const marginPrice = totalCost / (1 - (safeMargin / 100));
  
  // Cálculo baseado em markup
  const markupPrice = totalCost * (1 + (inputs.desiredMargin / 100));
  
  // Cálculo baseado em margem de contribuição
  const fixedCosts = inputs.indirectCost;
  const variableCosts = inputs.directCost + inputs.laborCost + 
                       inputs.packagingCost + inputs.freightCost + inputs.commissionCost;
  const contributionNeeded = fixedCosts + (fixedCosts * (inputs.desiredMargin / 100));
  
  // Prevent division by zero for 100% margin in contribution calculation
  const contributionMargin = Math.min(0.9999, inputs.desiredMargin / 100);
  const contributionPrice = variableCosts + (contributionNeeded / inputs.salesVolume) / (1 - contributionMargin);
  
  // Preço recomendado baseado no método selecionado
  let recommendedPrice = 0;
  switch (selectedMethod) {
    case 'margin':
      recommendedPrice = marginPrice;
      break;
    case 'markup':
      recommendedPrice = markupPrice;
      break;
    case 'contribution':
      recommendedPrice = contributionPrice;
      break;
  }
  
  // Cálculo do lucro e margem percentual
  const profit = recommendedPrice - totalCost;
  let marginPercentage = (profit / recommendedPrice) * 100;
  
  // Ensure the margin percentage is a valid number
  if (!isFinite(marginPercentage) || isNaN(marginPercentage)) {
    marginPercentage = 0;
  }
  
  return {
    marginPrice,
    markupPrice,
    contributionPrice,
    recommendedPrice,
    profit,
    marginPercentage
  };
};

export const getTotalCost = (inputs: PricingInputs): number => {
  return inputs.directCost + inputs.indirectCost + inputs.laborCost + 
         inputs.packagingCost + inputs.freightCost + inputs.commissionCost;
};
