
import React from 'react';
import PricingCalculator from '@/components/PricingCalculator';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoPanel from '@/components/InfoPanel';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-pricing-blue-700 dark:text-blue-400 mb-2">
            Calculadora de Precificação de Produtos
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
            Defina o preço ideal para seus produtos utilizando diferentes estratégias de precificação.
            Análise seus custos, margem de lucro e compare com a concorrência.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="calculator" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4 dark:bg-gray-700">
                <TabsTrigger value="calculator" className="dark:data-[state=active]:bg-gray-900">Calculadora</TabsTrigger>
                <TabsTrigger value="strategies" className="dark:data-[state=active]:bg-gray-900">Estratégias</TabsTrigger>
              </TabsList>
              
              <TabsContent value="calculator" className="space-y-4" id="calculator">
                <PricingCalculator />
              </TabsContent>
              
              <TabsContent value="strategies">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-pricing-blue-700 dark:text-blue-400 mb-4">Estratégias de Precificação</h2>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-pricing-blue-500 bg-pricing-blue-50 dark:bg-gray-700 dark:border-blue-600">
                      <h3 className="font-medium text-pricing-blue-700 dark:text-blue-400">Precificação Baseada em Custo</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Calcula o preço adicionando uma margem de lucro sobre o custo total do produto.
                        Fórmula: Preço = Custo Total ÷ (1 - Margem de Lucro em decimal)
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Exemplo: Custo Total = R$100, Margem desejada = 30% (0,30)
                        <br />
                        Preço = R$100 ÷ (1 - 0,30) = R$142,86
                      </p>
                    </div>
                    
                    <div className="p-4 border-l-4 border-pricing-blue-500 bg-pricing-blue-50 dark:bg-gray-700 dark:border-blue-600">
                      <h3 className="font-medium text-pricing-blue-700 dark:text-blue-400">Markup</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Adiciona uma porcentagem sobre o custo de produção ou aquisição.
                        Fórmula: Preço = Custo do Produto × (1 + Markup%)
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Exemplo: Custo = R$100, Markup = 30%
                        <br />
                        Preço = R$100 × (1 + 0,30) = R$130
                      </p>
                    </div>
                    
                    <div className="p-4 border-l-4 border-pricing-blue-500 bg-pricing-blue-50 dark:bg-gray-700 dark:border-blue-600">
                      <h3 className="font-medium text-pricing-blue-700 dark:text-blue-400">Margem de Contribuição</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Considera os custos fixos e variáveis separadamente. 
                        Fórmula: (Preço unitário - Custos Variáveis) × Unidades vendidas = Custos Fixos + Lucro
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Exemplo: Custos fixos = R$1000, Custos variáveis = R$70/unidade, Margem = 30%, Unidades = 100
                        <br />
                        (P - R$70) × 100 = R$1000 + (P × 100 × 0,30)
                        <br />
                        Resolvendo: P = R$136,36
                      </p>
                    </div>
                    
                    <div className="p-4 border-l-4 border-pricing-blue-500 bg-pricing-blue-50 dark:bg-gray-700 dark:border-blue-600">
                      <h3 className="font-medium text-pricing-blue-700 dark:text-blue-400">Precificação Baseada em Valor</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Define o preço com base no valor percebido pelo cliente, não apenas nos custos.
                        Métodos: Pesquisa de mercado, análise de disposição a pagar, posicionamento premium.
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Fatores a considerar: Benefícios exclusivos, economia gerada, custos evitados, valor emocional, 
                        alternativas disponíveis, posicionamento no mercado.
                      </p>
                    </div>
                    
                    <div className="p-4 border-l-4 border-pricing-blue-500 bg-pricing-blue-50 dark:bg-gray-700 dark:border-blue-600">
                      <h3 className="font-medium text-pricing-blue-700 dark:text-blue-400">Precificação Competitiva</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Baseia-se nos preços praticados pela concorrência no mercado.
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Estratégias: 
                        <br />• Preço igual - para produtos equivalentes em mercados saturados
                        <br />• Preço premium - para produtos com diferenciais claros (10-30% acima)
                        <br />• Preço penetração - para ganhar mercado inicialmente (10-20% abaixo)
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="lg:col-span-1">
            <InfoPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
