import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { 
  LucideAngularModule, 
  Book, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Github, 
  ExternalLink, 
  Moon, 
  Sun,
  Layout,
  Layers,
  Terminal,
  Compass,
  Zap,
  Command,
  ShieldCheck,
  Cpu,
  Box,
  FileText,
  BarChart3,
  Bell,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Plus
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(LucideAngularModule.pick({ 
      Book, 
      Search, 
      Menu, 
      X, 
      ChevronRight, 
      ChevronLeft,
      Github, 
      ExternalLink, 
      Moon, 
      Sun,
      Layout,
      Layers,
      Terminal,
      Compass,
      Zap,
      Command,
      ShieldCheck,
      Cpu,
      Box,
      FileText,
      BarChart3,
      Bell,
      Clock,
      CheckCircle2,
      AlertCircle,
      MoreVertical,
      Plus
    }))
  ]
};
