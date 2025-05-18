
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calculator, LogIn, Moon, Sun, User, Settings, Info, Package, FileText, Upload, UserCog } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

// Settings menu components
const DisplayPreferences = () => {
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  
  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
    document.documentElement.classList.add(`text-${size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'base'}`);
    
    toast({
      title: "Tamanho da fonte alterado",
      description: `Tamanho da fonte definido para ${size === 'small' ? 'pequeno' : size === 'large' ? 'grande' : 'médio'}`
    });
    
    localStorage.setItem('fontSize', size);
  };
  
  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    document.documentElement.classList.toggle('high-contrast');
    
    toast({
      title: !highContrast ? "Alto contraste ativado" : "Alto contraste desativado"
    });
    
    localStorage.setItem('highContrast', (!highContrast).toString());
  };
  
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(savedFontSize);
      document.documentElement.classList.add(`text-${savedFontSize === 'small' ? 'sm' : savedFontSize === 'large' ? 'lg' : 'base'}`);
    }
    
    const savedHighContrast = localStorage.getItem('highContrast') === 'true';
    if (savedHighContrast) {
      setHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }
  }, []);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start w-full px-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <FileText className="h-4 w-4 mr-2" />
          <span className="text-gray-800 dark:text-gray-200">Preferências de exibição</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-gray-800 dark:text-white">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Preferências de Exibição</DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            Personalize como você visualiza o conteúdo.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label className="dark:text-gray-200">Tamanho da Fonte</Label>
            <div className="flex space-x-2">
              <Button 
                variant={fontSize === 'small' ? 'default' : 'outline'} 
                onClick={() => handleFontSizeChange('small')}
                className="flex-1"
              >
                Pequeno
              </Button>
              <Button 
                variant={fontSize === 'medium' ? 'default' : 'outline'} 
                onClick={() => handleFontSizeChange('medium')}
                className="flex-1"
              >
                Médio
              </Button>
              <Button 
                variant={fontSize === 'large' ? 'default' : 'outline'} 
                onClick={() => handleFontSizeChange('large')}
                className="flex-1"
              >
                Grande
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="dark:text-gray-200">Alto Contraste</Label>
            <Button 
              variant={highContrast ? 'default' : 'outline'}
              onClick={toggleHighContrast}
              size="sm"
            >
              {highContrast ? 'Ativado' : 'Desativado'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AccountSettings = () => {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(true);
  
  useEffect(() => {
    // Get saved account settings
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
    
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
    
    const notifSetting = localStorage.getItem('notifications');
    if (notifSetting !== null) {
      setNotifications(notifSetting === 'true');
    }
  }, []);
  
  const saveSettings = () => {
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('notifications', notifications.toString());
    
    toast({
      title: "Configurações salvas",
      description: "Suas preferências de conta foram atualizadas"
    });
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start w-full px-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <UserCog className="h-4 w-4 mr-2" />
          <span className="text-gray-800 dark:text-gray-200">Configurações de conta</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-gray-800 dark:text-white">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Configurações de Conta</DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            Gerencie suas informações pessoais e preferências.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="dark:text-gray-200">Nome de usuário</Label>
            <Input 
              id="username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label className="dark:text-gray-200">Receber notificações</Label>
            <Button 
              variant={notifications ? 'default' : 'outline'}
              onClick={() => setNotifications(!notifications)}
              size="sm"
            >
              {notifications ? 'Ativado' : 'Desativado'}
            </Button>
          </div>
        </div>
        
        <DialogFooter>
          <Button onClick={saveSettings}>
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ExportData = () => {
  const { toast } = useToast();
  
  const handleExport = (format: 'json' | 'csv') => {
    // Get saved products from localStorage
    const savedProducts = localStorage.getItem('savedProducts');
    
    if (!savedProducts || JSON.parse(savedProducts).length === 0) {
      toast({
        title: "Nenhum dado para exportar",
        description: "Você ainda não tem produtos salvos para exportar",
        variant: "destructive"
      });
      return;
    }
    
    const products = JSON.parse(savedProducts);
    let exportData;
    let fileName;
    let fileType;
    
    if (format === 'json') {
      exportData = JSON.stringify(products, null, 2);
      fileName = 'produtos-precificalc.json';
      fileType = 'application/json';
    } else {
      // Create CSV header
      const headers = ['Nome', 'Custo Direto', 'Custo Indireto', 'Mão de Obra', 
                      'Embalagem', 'Frete', 'Comissão', 'Margem', 'Preço Final', 'Data'];
                      
      // Convert data to CSV format
      const csvRows = [
        headers.join(','),
        ...products.map((product: any) => [
          product.name,
          product.directCost,
          product.indirectCost,
          product.laborCost,
          product.packagingCost,
          product.freightCost,
          product.commissionCost,
          product.desiredMargin,
          product.finalPrice,
          new Date(product.createdAt).toLocaleDateString('pt-BR')
        ].join(','))
      ];
      
      exportData = csvRows.join('\n');
      fileName = 'produtos-precificalc.csv';
      fileType = 'text/csv';
    }
    
    // Create a downloadable file
    const blob = new Blob([exportData], { type: fileType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Dados exportados com sucesso",
      description: `Seus produtos foram exportados em formato ${format.toUpperCase()}`
    });
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="justify-start w-full px-2 hover:bg-gray-100 dark:hover:bg-gray-700">
          <Upload className="h-4 w-4 mr-2" />
          <span className="text-gray-800 dark:text-gray-200">Exportar dados</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-gray-800 dark:text-white">
        <DialogHeader>
          <DialogTitle className="dark:text-white">Exportar Dados</DialogTitle>
          <DialogDescription className="dark:text-gray-300">
            Exporte seus produtos salvos para usar em outros aplicativos.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Escolha o formato para exportar seus dados:
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={() => handleExport('json')}
              className="h-20 flex flex-col items-center justify-center"
            >
              <span className="text-lg font-bold">.JSON</span>
              <span className="text-xs">Importar em sistemas</span>
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleExport('csv')}
              className="h-20 flex flex-col items-center justify-center"
            >
              <span className="text-lg font-bold">.CSV</span>
              <span className="text-xs">Abrir em Excel</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user was logged in previously
    const savedLogin = localStorage.getItem('isLoggedIn');
    const savedUsername = localStorage.getItem('username');
    if (savedLogin === 'true' && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
    
    // Check system preference for dark mode
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isDarkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    
    toast({
      title: newTheme === 'dark' ? "Modo escuro ativado" : "Modo claro ativado",
      duration: 1500
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login - in a real app this would connect to a backend
    if (email && password) {
      const userEmail = email;
      setIsLoggedIn(true);
      setUsername(email.split('@')[0]);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', email.split('@')[0]);
      localStorage.setItem('email', userEmail);
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a), ${email.split('@')[0]}!`
      });
    } else {
      toast({
        title: "Erro ao fazer login",
        description: "Por favor, preencha todos os campos",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    toast({
      title: "Logout realizado com sucesso!"
    });
  };

  const navigateTo = (route: string) => {
    navigate(route);
  };

  return (
    <header className="bg-pricing-blue-600 dark:bg-gray-900 text-white shadow-md">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <Calculator size={24} />
            <span className="font-bold text-xl">PrecifiCALC</span>
          </Link>
        </div>
        <nav className="flex items-center">
          <ul className="flex space-x-4 items-center mr-4">
            <li>
              <Button 
                variant="ghost" 
                onClick={() => navigateTo('/')} 
                className="flex items-center hover:text-pricing-blue-200 dark:hover:text-blue-300 transition-colors text-white"
              >
                <Calculator className="h-4 w-4 mr-1" />
                Calculadora
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                onClick={() => navigateTo('/sobre')} 
                className="flex items-center hover:text-pricing-blue-200 dark:hover:text-blue-300 transition-colors text-white"
              >
                <Info className="h-4 w-4 mr-1" />
                Sobre
              </Button>
            </li>
            <li>
              <Button 
                variant="ghost" 
                onClick={() => navigateTo('/produtos')} 
                className="flex items-center hover:text-pricing-blue-200 dark:hover:text-blue-300 transition-colors text-white"
              >
                <Package className="h-4 w-4 mr-1" />
                Produtos Salvos
              </Button>
            </li>
          </ul>
          
          <div className="flex items-center space-x-2">
            {/* Theme toggle button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleTheme} 
                    className="text-white hover:bg-pricing-blue-700 dark:hover:bg-gray-800 rounded-full"
                  >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {/* Settings/Options menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-pricing-blue-700 dark:hover:bg-gray-800 rounded-full"
                >
                  <Settings size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border dark:border-gray-700">
                <DisplayPreferences />
                <AccountSettings />
                <ExportData />
              </DropdownMenuContent>
            </DropdownMenu>
          
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <div className="bg-pricing-blue-500 dark:bg-blue-700 rounded-full p-1">
                  <User size={18} />
                </div>
                <span className="text-sm">{username}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2 text-white border-white hover:bg-pricing-blue-700 dark:hover:bg-gray-800" 
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </div>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="text-black bg-white border-white hover:bg-gray-100 dark:hover:bg-gray-800">
                    <LogIn className="h-4 w-4 mr-1" /> Entrar
                  </Button>
                </DialogTrigger>
                <DialogContent className="dark:bg-gray-800 dark:text-white">
                  <form onSubmit={handleLogin}>
                    <DialogHeader>
                      <DialogTitle className="dark:text-white">Login</DialogTitle>
                      <DialogDescription className="dark:text-gray-300">
                        Entre com suas credenciais para acessar sua conta.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="seu@email.com" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)}
                          className="dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="dark:text-gray-200">Senha</Label>
                        <Input 
                          id="password" 
                          type="password" 
                          value={password} 
                          onChange={(e) => setPassword(e.target.value)}
                          className="dark:bg-gray-700 dark:text-white dark:border-gray-600" 
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-pricing-blue-600 hover:bg-pricing-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white">
                        Entrar
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
