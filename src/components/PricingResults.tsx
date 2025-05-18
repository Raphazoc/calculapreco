
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartPie, TrendingUp, TrendingDown } from 'lucide-react';

interface PricingResultsProps {
  results: {
    marginPrice: number;
    markupPrice: number;
    contributionPrice: number;
    recommendedPrice: number;
    profit: number;
    marginPercentage: number;
  };
  productName: string;
  totalCost: number;
  competitorPrice: number;
}

const PricingResults = ({ results, productName, totalCost, competitorPrice }: PricingResultsProps) => {
  const formatCurrency = (value: number) => {
    // Handle Infinity, NaN or extremely large values
    if (!isFinite(value) || isNaN(value) || value > 9999999) {
      return "Valor não calculável";
    }
    
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const compareWithCompetitor = () => {
    if (!competitorPrice || competitorPrice <= 0) return null;
    
    const diff = ((results.recommendedPrice - competitorPrice) / competitorPrice) * 100;
    const Icon = diff >= 0 ? TrendingUp : TrendingDown;
    const textColor = diff >= 0 ? 'text-amber-600 dark:text-amber-500' : 'text-green-600 dark:text-green-500';
    
    return (
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Comparação com a Concorrência</h3>
        <div className="flex items-center">
          <Icon size={16} className={textColor} />
          <span className={`ml-1 ${textColor} font-medium`}>
            {isFinite(diff) ? Math.abs(diff).toFixed(1) : 0}% {diff >= 0 ? 'acima' : 'abaixo'} do preço concorrente
          </span>
        </div>
      </div>
    );
  };

  // Ensure margin percentage is always a valid number and clamped to a reasonable maximum for display
  const displayMarginPercentage = () => {
    if (isNaN(results.marginPercentage) || !isFinite(results.marginPercentage)) {
      return '0.0';
    }
    
    // Cap the display at 100% if it exceeds that
    const cappedValue = Math.min(results.marginPercentage, 100);
    return cappedValue.toFixed(1);
  };

  return (
    <div className="p-4 border-t border-pricing-blue-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-pricing-blue-700 dark:text-blue-400 mb-4">
        Resultados para: {productName}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-300">Custo Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold dark:text-gray-100">{formatCurrency(totalCost)}</p>
          </CardContent>
        </Card>
        
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-300">Preço Recomendado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-pricing-blue-600 dark:text-blue-400">
              {formatCurrency(results.recommendedPrice)}
            </p>
          </CardContent>
        </Card>
        
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-600 dark:text-gray-300">Lucro Estimado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600 dark:text-green-500">
              {formatCurrency(results.profit)}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium dark:text-gray-300">Margem de Lucro</h3>
            <span className="text-sm font-bold dark:text-gray-300">{displayMarginPercentage()}%</span>
          </div>
          <Progress value={Math.min(results.marginPercentage, 100)} className="h-2" />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-md font-medium text-pricing-blue-700 dark:text-blue-400 flex items-center gap-2 mb-3">
            <ChartPie size={16} /> Comparação de Métodos de Precificação
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-600 dark:text-gray-300">Margem sobre o custo:</span>
              <span className="font-medium dark:text-gray-100">{formatCurrency(results.marginPrice)}</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-600 dark:text-gray-300">Markup:</span>
              <span className="font-medium dark:text-gray-100">{formatCurrency(results.markupPrice)}</span>
            </div>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-gray-600 dark:text-gray-300">Margem de contribuição:</span>
              <span className="font-medium dark:text-gray-100">{formatCurrency(results.contributionPrice)}</span>
            </div>
          </div>
        </div>
        
        {compareWithCompetitor()}
      </div>
    </div>
  );
};

export default PricingResults;
