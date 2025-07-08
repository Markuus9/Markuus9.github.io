import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [geometricLines, setGeometricLines] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    generateStars();
    generateGeometricLines();
    
    // Detectar tema inicial
    const checkTheme = () => {
      const hasDarkClass = document.documentElement.classList.contains("dark");
      setIsDarkMode(hasDarkClass);
    };
    
    checkTheme();

    // Observer para cambios de tema
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    const handleResize = () => {
      generateStars();
      generateGeometricLines();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 12000
    );

    const newStars = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.3 + 0.1,
        animationDuration: Math.random() * 8 + 4,
        twinkleDelay: Math.random() * 5,
      });
    }

    setStars(newStars);
  };

  const generateGeometricLines = () => {
    const numberOfElements = 4;
    const newElements = [];

    for (let i = 0; i < numberOfElements; i++) {
      newElements.push({
        id: i,
        size: Math.random() * 60 + 30,
        x: Math.random() * 70 + 15,
        y: Math.random() * 70 + 15,
        rotation: Math.random() * 360,
        opacity: 0.03 + i * 0.01,
        animationDuration: 20 + i * 10,
        shape: i % 3, // 0: circle, 1: triangle, 2: square
      });
    }

    setGeometricLines(newElements);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/3" />
      
      {/* Gentle Corner Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-primary/4 to-transparent rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-primary/3 to-transparent rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl" />
      
      {/* Floating Geometric Shapes - Only in Dark Mode */}
      {isDarkMode && geometricLines.map((element) => {
        const getShapeStyle = () => {
          const baseStyle = {
            width: element.size + "px",
            height: element.size + "px",
            left: element.x + "%",
            top: element.y + "%",
            opacity: element.opacity,
            transform: `rotate(${element.rotation}deg)`,
            animationDuration: `${element.animationDuration}s`,
            filter: 'blur(1px)',
          };

          switch (element.shape) {
            case 0: // Circle
              return {
                ...baseStyle,
                borderRadius: '50%',
                border: `1px solid hsl(var(--primary) / 0.15)`,
                background: 'transparent',
              };
            case 1: // Triangle
              return {
                ...baseStyle,
                background: 'transparent',
                borderLeft: `${element.size / 2}px solid transparent`,
                borderRight: `${element.size / 2}px solid transparent`,
                borderBottom: `${element.size}px solid hsl(var(--primary) / 0.1)`,
                width: '0',
                height: '0',
              };
            case 2: // Square
              return {
                ...baseStyle,
                border: `1px solid hsl(var(--primary) / 0.1)`,
                background: 'transparent',
                borderRadius: '4px',
              };
            default:
              return baseStyle;
          }
        };

        return (
          <div
            key={element.id}
            className="absolute animate-spin-slow"
            style={getShapeStyle()}
          />
        );
      })}

      {/* Subtle Dots Pattern - Only in Dark Mode */}
      {isDarkMode && (
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 30px 30px',
          }}
        />
      )}

      {/* Twinkling Stars - Only in Dark Mode */}
      {isDarkMode && stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            background: star.size > 1.5 
              ? `hsl(var(--primary))`
              : `hsl(var(--foreground))`,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.twinkleDelay}s`,
            boxShadow: star.size > 1.5 
              ? `0 0 ${star.size * 2}px hsl(var(--primary) / 0.3)`
              : 'none',
          }}
        />
      ))}

      {/* Subtle Grid Lines */}
      <div 
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 0.5px, transparent 0.5px),
            linear-gradient(90deg, hsl(var(--primary)) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
      
      {/* Single Geometric Element */}
      <div 
        className="absolute top-1/4 right-1/4 w-20 h-20 border border-primary/8 rounded-full animate-spin"
        style={{ animationDuration: '60s' }}
      />
    </div>
  );
};
