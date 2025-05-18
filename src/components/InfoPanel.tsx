
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, Tag, Calculator, ChartBar, TrendingUp } from 'lucide-react';

const InfoPanel = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-pricing-blue-50 border-b border-pricing-blue-100">
          <CardTitle className="text-pricing-blue-700 flex items-center gap-2 text-lg">
            <ChartBar className="h-5 w-5" /> Elementos de Precificação
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <ul className="space-y-3">
            <li className="flex gap-2">
              <Receipt className="h-5 w-5 text-pricing-blue-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Custos</p>
                <p className="text-sm text-gray-600">Diretos, indiretos e operacionais</p>
              </div>
            </li>
            <li className="flex gap-2">
              <Tag className="h-5 w-5 text-pricing-blue-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Concorrência</p>
                <p className="text-sm text-gray-600">Análise dos preços do mercado</p>
              </div>
            </li>
            <li className="flex gap-2">
              <TrendingUp className="h-5 w-5 text-pricing-blue-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Margem de Lucro</p>
                <p className="text-sm text-gray-600">Percentual sobre o custo total</p>
              </div>
            </li>
            <li className="flex gap-2">
              <Calculator className="h-5 w-5 text-pricing-blue-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Estratégia</p>
                <p className="text-sm text-gray-600">Método de cálculo utilizado</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="bg-pricing-blue-50 border-b border-pricing-blue-100">
          <CardTitle className="text-pricing-blue-700 flex items-center gap-2 text-lg">
            <Receipt className="h-5 w-5" /> Dicas Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3">
            <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
              <p className="text-sm font-medium text-green-700">Custo Total</p>
              <p className="text-xs text-gray-600">
                Inclua todos os custos: matéria-prima, mão de obra, logística e custos indiretos.
              </p>
            </div>
            
            <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm font-medium text-blue-700">Margem de Lucro</p>
              <p className="text-xs text-gray-600">
                Para produtos novos, considere margens entre 30% e 50% para cobrir imprevistos.
              </p>
            </div>
            
            <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded">
              <p className="text-sm font-medium text-amber-700">Concorrência</p>
              <p className="text-xs text-gray-600">
                Observe o mercado, mas não baseie seu preço apenas na concorrência.
              </p>
            </div>
            
            <div className="p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
              <p className="text-sm font-medium text-purple-700">Revisão Periódica</p>
              <p className="text-xs text-gray-600">
                Revise seus preços regularmente para ajustar a mudanças nos custos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoPanel;
