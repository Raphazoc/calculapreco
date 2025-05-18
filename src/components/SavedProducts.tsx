
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Package, Search, Trash2, Edit, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";

export interface SavedProduct {
  id: string;
  name: string;
  directCost: number;
  indirectCost: number;
  laborCost: number;
  packagingCost: number;
  freightCost: number;
  commissionCost: number;
  desiredMargin: number;
  finalPrice: number;
  createdAt: Date;
}

const SavedProducts = () => {
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState<SavedProduct | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  // Load saved products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('savedProducts');
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        // Convert string dates back to Date objects
        const productsWithDates = parsedProducts.map((product: any) => ({
          ...product,
          createdAt: new Date(product.createdAt)
        }));
        setProducts(productsWithDates);
      } catch (error) {
        console.error("Error parsing saved products:", error);
      }
    }
  }, []);

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));
    
    toast({
      title: "Produto excluído",
      description: "O produto foi removido com sucesso"
    });
  };

  const openEditDialog = (product: SavedProduct) => {
    setEditingProduct({...product});
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;
    
    // Recalculate final price
    const totalCost = 
      editingProduct.directCost + 
      editingProduct.indirectCost + 
      editingProduct.laborCost + 
      editingProduct.packagingCost +
      editingProduct.freightCost + 
      editingProduct.commissionCost;
      
    const finalPrice = totalCost / (1 - (editingProduct.desiredMargin / 100));
    
    const updatedProduct = {
      ...editingProduct,
      finalPrice
    };
    
    const updatedProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    
    setProducts(updatedProducts);
    localStorage.setItem('savedProducts', JSON.stringify(updatedProducts));
    setIsEditDialogOpen(false);
    
    toast({
      title: "Produto atualizado",
      description: `${updatedProduct.name} foi atualizado com sucesso`
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProduct) return;
    
    const { name, value } = e.target;
    setEditingProduct({
      ...editingProduct,
      [name]: name === 'name' ? value : parseFloat(value) || 0
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-lg" id="produtos">
      <CardHeader className="bg-pricing-blue-50 border-b border-pricing-blue-100 dark:bg-gray-800 dark:border-gray-700">
        <CardTitle className="text-pricing-blue-700 flex items-center gap-2 dark:text-blue-400">
          <Package className="h-5 w-5" /> Produtos Salvos
        </CardTitle>
        <CardDescription className="dark:text-gray-300">
          Gerencie todos os seus produtos precificados
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 overflow-hidden">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar produtos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="dark:text-gray-300">Nome</TableHead>
                  <TableHead className="dark:text-gray-300">Custo Total</TableHead>
                  <TableHead className="dark:text-gray-300">Preço Final</TableHead>
                  <TableHead className="dark:text-gray-300">Margem</TableHead>
                  <TableHead className="dark:text-gray-300">Data</TableHead>
                  <TableHead className="text-right dark:text-gray-300">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="dark:border-gray-700">
                    <TableCell className="font-medium dark:text-gray-300">{product.name}</TableCell>
                    <TableCell className="dark:text-gray-300">
                      {formatCurrency(
                        product.directCost + 
                        product.indirectCost + 
                        product.laborCost + 
                        product.packagingCost +
                        product.freightCost + 
                        product.commissionCost
                      )}
                    </TableCell>
                    <TableCell className="dark:text-gray-300">{formatCurrency(product.finalPrice)}</TableCell>
                    <TableCell className="dark:text-gray-300">{product.desiredMargin}%</TableCell>
                    <TableCell className="dark:text-gray-300">{formatDate(product.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openEditDialog(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                          onClick={() => deleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Package className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
            <p>Nenhum produto salvo ainda</p>
            <p className="text-sm">Produtos que você calcular e salvar aparecerão aqui</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t border-pricing-blue-100 p-4 bg-pricing-blue-50 dark:bg-gray-800 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-300">Total de produtos: {filteredProducts.length}</p>
      </CardFooter>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="dark:bg-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Editar Produto</DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Atualize as informações do produto e salve para recalcular o preço.
            </DialogDescription>
          </DialogHeader>
          
          {editingProduct && (
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name" className="dark:text-gray-200">Nome do Produto</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={editingProduct.name}
                  onChange={handleInputChange}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="directCost" className="dark:text-gray-200">Custo Direto</Label>
                  <Input 
                    id="directCost" 
                    name="directCost" 
                    type="number" 
                    value={editingProduct.directCost}
                    onChange={handleInputChange}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <Label htmlFor="laborCost" className="dark:text-gray-200">Custo de Mão de Obra</Label>
                  <Input 
                    id="laborCost" 
                    name="laborCost" 
                    type="number" 
                    value={editingProduct.laborCost}
                    onChange={handleInputChange}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="indirectCost" className="dark:text-gray-200">Custos Indiretos</Label>
                  <Input 
                    id="indirectCost" 
                    name="indirectCost" 
                    type="number" 
                    value={editingProduct.indirectCost}
                    onChange={handleInputChange}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <Label htmlFor="packagingCost" className="dark:text-gray-200">Custo de Embalagem</Label>
                  <Input 
                    id="packagingCost" 
                    name="packagingCost" 
                    type="number" 
                    value={editingProduct.packagingCost}
                    onChange={handleInputChange}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="freightCost" className="dark:text-gray-200">Custo de Frete</Label>
                  <Input 
                    id="freightCost" 
                    name="freightCost" 
                    type="number" 
                    value={editingProduct.freightCost}
                    onChange={handleInputChange}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
                
                <div>
                  <Label htmlFor="commissionCost" className="dark:text-gray-200">Comissão de Venda</Label>
                  <Input 
                    id="commissionCost" 
                    name="commissionCost" 
                    type="number" 
                    value={editingProduct.commissionCost}
                    onChange={handleInputChange}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="desiredMargin" className="dark:text-gray-200">Margem Desejada (%)</Label>
                <Input 
                  id="desiredMargin" 
                  name="desiredMargin" 
                  type="number" 
                  value={editingProduct.desiredMargin}
                  onChange={handleInputChange}
                  className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
              </div>
            </div>
          )}
          
          <DialogFooter className="flex space-x-2 justify-end">
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              className="dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4 mr-1" /> Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>
              <Check className="h-4 w-4 mr-1" /> Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SavedProducts;
