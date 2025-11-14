"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Utensils, Target, TrendingUp } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Calculator className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Cálculo automático de nutrientes",
      description: "Entenda o que você come com precisão.",
    },
    {
      icon: <Utensils className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Monte suas próprias receitas",
      description: "Crie e personalize suas refeições favoritas.",
    },
    {
      icon: <Target className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Dietas personalizadas",
      description: "Planos alimentares feitos sob medida para você.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />,
      title: "Acompanhe seu progresso",
      description: "Monitore sua evolução e alcance seus objetivos.",
    },
  ];

  const homeCards = [
    {
      image: "/assets/card_acompanhamento.jpg",
      title: "Acompanhe seu Progresso",
      description: "Monitore sua evolução e alcance seus objetivos de forma eficaz.",
      link: "/dietas",
    },
    {
      image: "/assets/card_dicas.jpg",
      title: "Dicas e Conteúdo Saudável",
      description: "Explore artigos e guias para uma vida mais equilibrada.",
      link: "/blog", // Assuming a future blog page
    },
    {
      image: "/assets/card_receitas.jpg",
      title: "Receitas Deliciosas",
      description: "Descubra e crie receitas nutritivas e saborosas.",
      link: "/alimentos",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg mb-12">
        <img
          src="/assets/hero_home.jpg"
          alt="Healthy food and fitness"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black/40 text-white p-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight drop-shadow-lg">
            VidaFit+
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-light drop-shadow-md">
            Seu corpo, sua melhor versão
          </p>
          <Link to="/login">
            <Button className="px-8 py-6 text-lg bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105">
              Começar agora
            </Button>
          </Link>
          <img src="/assets/icon_healthy.svg" alt="Healthy icon" className="absolute bottom-4 right-4 h-12 w-12 opacity-70" />
        </div>
      </section>

      {/* Introduction Benefits */}
      <section className="w-full max-w-4xl text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          Transforme sua saúde com VidaFit+
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-gray-700 dark:text-gray-300">
          <p className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <span className="font-semibold text-green-700 dark:text-green-400">Cálculo nutricional inteligente:</span> Obtenha informações detalhadas sobre o que você come.
          </p>
          <p className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <span className="font-semibold text-green-700 dark:text-green-400">Dietas personalizadas para cada objetivo:</span> Alcance suas metas de emagrecimento, ganho de massa ou manutenção.
          </p>
          <p className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <span className="font-semibold text-green-700 dark:text-green-400">Comparativo de alimentos e receitas:</span> Faça escolhas mais saudáveis com facilidade.
          </p>
          <p className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <span className="font-semibold text-green-700 dark:text-green-400">Controle de progresso:</span> Veja sua evolução e mantenha-se motivado.
          </p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-center mb-10">
          Nossos Recursos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* New Section for Home Section Cards */}
      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 text-center mb-10">
          Explore Mais
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeCards.map((card, index) => (
            <Link to={card.link} key={index}>
              <Card className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 h-full flex flex-col">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 dark:text-gray-300 flex-grow">
                  {card.description}
                </CardContent>
                <div className="p-4 pt-0">
                  <Button variant="link" className="text-green-600 dark:text-green-400">Saiba Mais</Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;