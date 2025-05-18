
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, FileText, PieChart, BarChart4, DollarSign, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-pricing-blue-700 dark:text-blue-400 mb-2">
            Sobre o PrecifiCALC
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
            Entenda como nossa ferramenta pode ajudar no sucesso do seu negócio.
          </p>
        </div>
        
        <div className="space-y-8">
          <Card className="shadow-lg">
            <CardHeader className="bg-pricing-blue-50 border-b border-pricing-blue-100 dark:bg-gray-800 dark:border-gray-700">
              <CardTitle className="text-pricing-blue-700 flex items-center gap-2 dark:text-blue-400">
                <Calculator className="h-5 w-5" /> O que é o PrecifiCALC?
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 prose dark:prose-invert max-w-none">
              <p>
                O PrecifiCALC é uma ferramenta completa para cálculo de preços de produtos e serviços, desenvolvida para ajudar empreendedores, 
                pequenas empresas e profissionais autônomos a definirem preços justos e rentáveis para suas ofertas.
              </p>
              <p>
                Utilizando diferentes metodologias de precificação, você pode calcular o preço ideal dos seus produtos considerando todos os custos 
                envolvidos, a margem de lucro desejada e até mesmo comparar com os preços praticados pela concorrência.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-pricing-blue-50 border-b border-pricing-blue-100 dark:bg-gray-800 dark:border-gray-700">
                <CardTitle className="text-pricing-blue-700 flex items-center gap-2 dark:text-blue-400">
                  <FileText className="h-5 w-5" /> Principais Funcionalidades
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-pricing-blue-100 p-2 rounded-full dark:bg-blue-900">
                      <Calculator className="h-4 w-4 text-pricing-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">Calculadora de Preços</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Calcule preços considerando custos diretos, indiretos, mão de obra, margem desejada e outros fatores.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pricing-blue-100 p-2 rounded-full dark:bg-blue-900">
                      <PieChart className="h-4 w-4 text-pricing-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">Diferentes Métodos de Precificação</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Compare diferentes estratégias como margem sobre custo, markup e margem de contribuição.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pricing-blue-100 p-2 rounded-full dark:bg-blue-900">
                      <BarChart4 className="h-4 w-4 text-pricing-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">Análise de Resultados</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Visualize gráficos e comparações para tomar decisões informadas sobre seus preços.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-pricing-blue-100 p-2 rounded-full dark:bg-blue-900">
                      <DollarSign className="h-4 w-4 text-pricing-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 dark:text-gray-200">Gestão de Produtos</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Salve, organize e edite seus produtos precificados para referência futura.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg">
              <CardHeader className="bg-pricing-blue-50 border-b border-pricing-blue-100 dark:bg-gray-800 dark:border-gray-700">
                <CardTitle className="text-pricing-blue-700 flex items-center gap-2 dark:text-blue-400">
                  <Users className="h-5 w-5" /> Para quem é indicado?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-4 border-l-4 border-pricing-blue-500 bg-pricing-blue-50 dark:bg-gray-700 dark:border-blue-600">
                    <h3 className="font-medium text-pricing-blue-700 dark:text-blue-400">Pequenos Empreendedores</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Ideal para quem está começando um negócio e precisa definir preços sem experiência prévia.
                    </p>
                  </div>
                  
                  <div className="p-4 border-l-4 border-pricing-blue-500 bg-pricing-blue-50 dark:bg-gray-700 dark:border-blue-600">
                    <h3 className="font-medium text-pricing-blue-700 dark:text-blue-400">Artesãos e Produtores Manuais</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Perfeito para quem produz itens únicos e precisa considerar o valor do trabalho manual.
                    </p>
                  </div>
                  
                  <div className="p-4 border-l-4 border-pricing-blue-500 bg-pricing-blue-50 dark:bg-gray-700 dark:border-blue-600">
                    <h3 className="font-medium text-pricing-blue-700 dark:text-blue-400">Prestadores de Serviços</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Auxilia profissionais autônomos a precificar adequadamente seus serviços e horas de trabalho.
                    </p>
                  </div>
                  
                  <div className="p-4 border-l-4 border-pricing-blue-500 bg-pricing-blue-50 dark:bg-gray-700 dark:border-blue-600">
                    <h3 className="font-medium text-pricing-blue-700 dark:text-blue-400">Varejistas</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Ajuda lojistas a definir margens adequadas considerando diferentes estratégias comerciais.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
