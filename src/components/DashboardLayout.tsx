import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, User, Settings, Menu, Moon, Sun, Brain, Layers, Dices, FlaskConical } from "lucide-react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };


  const navigation = [
    { name: "Memorama Químico", href: "/memoria", icon: Brain },
    { name: "Barajas Valencias", href: "/barajas", icon: Layers },
    { name: "Serpientes y Escaleras", href: "/serpientes-escaleras", icon: Dices },
    {
      name: "Oxidación",
      href: "/dashboard/oxidacion",
      icon: FlaskConical,
      badge: "Extra" // <--- Aquí agregamos la insignia
    }
    // ,
    // {
    //   name: "Tabla Periódica",
    //   href: "/dashboard/tabla-periodica",
    //   icon: User,
    // },
    // {
    //   name: "UNO Químico",
    //   href: "/uno-quimico",
    //   icon: User,
    // },

  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-card border-r border-border transform transition-transform duration-200 ease-in-out dark:bg-gray-800",
          {
            "-translate-x-full": !isSidebarOpen,
            "translate-x-0": isSidebarOpen,
          }
        )}
      >
        <div className="h-16 flex items-center justify-center border-b border-border">
          <img
            src="/img/uce.png"
            alt="Logo UCE"
            className="h-14 object-contain"
          />
        </div>
        <nav className="mt-6 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center justify-between px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  {
                    "bg-primary text-primary-foreground": isActive,
                    "text-muted-foreground hover:bg-accent hover:text-accent-foreground": !isActive,
                  }
                )}
              >
                <div className="flex items-center">
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </div>

                {/* Renderizado condicional del Badge */}
                {item.badge && (
                  <span className="ml-2 px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-red-500 text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div
        className={cn("transition-margin duration-200 ease-in-out", {
          "ml-80": isSidebarOpen, // antes era ml-64
          "ml-0": !isSidebarOpen,
        })}
      >
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 dark:bg-gray-800">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <span className="text-sm text-muted-foreground">Kevin Miranda</span>
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              KM
            </div>
          </div>
        </header>
        <main className="p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;