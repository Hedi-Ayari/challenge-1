
import { Search, Bell, Settings, Moon, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { logout } from '@/store/slices/authSlice';

interface AppHeaderProps {
  title: string;
  onSearch?: (query: string) => void;
}

export const AppHeader = ({ title, onSearch }: AppHeaderProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <header className="flex items-center justify-between p-4 bg-background border-b border-border">
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Home</span>
          <span>/</span>
          <span className="text-foreground font-medium">{title}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {onSearch && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 w-64"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        )}
        
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <Moon className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem onClick={(e)=>{dispatch(logout())}} >
              <User className="mr-2 h-4 w-4" />
              <span >Logout</span>
            </DropdownMenuItem>
           
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
