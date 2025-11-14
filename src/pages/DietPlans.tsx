"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  age: z.coerce.number().min(18, { message: "A idade deve ser 18 ou mais." }).max(100, { message: "A idade deve ser 100 ou menos." }),
  gender: z.enum(["Masculino", "Feminino", "Outro"], { message: "Selecione um sexo." }),
  height: z.coerce.number().min(100, { message: "A altura deve ser em cm (mínimo 100)." }).max(250, { message: "A altura deve ser em cm (máximo 250)." }),
  weight: z.coerce.number().min(30, { message: "O peso deve ser em kg (mínimo 30)." }).max(300, { message: "O peso deve ser em kg (máximo 300)." }),
  healthStatus: z.enum(["Normal", "Anemia", "Hipertensão", "Outro"], { message: "Selecione um estado de saúde." }),
  mainGoal: z.enum(["Emagrecer", "Ganhar massa muscular", "Aumentar ferro", "Manter peso", "Melhorar alimentação"], { message: "Selecione um objetivo principal." }),
  desiredGoal: z.string().optional(),
});

type Meal = {
  name: string;
  foods: {
    item: string;
    portion: string;
    calories: number;
    proteins: number;
    carbohydrates: number;
    fats: number;
  }[];
};

type DietPlan = {
  meals: Meal[];
  totalCalories: number;
  totalProteins: number;
  totalCarbohydrates: number;
  totalFats: number;
};

// Mock diet plan generation function
const generateMockDietPlan = (data: z.infer<typeof formSchema>): DietPlan => {
  let meals: Meal[] = [];
  let totalCalories = 0;
  let totalProteins = 0;
  let totalCarbohydrates = 0;
  let totalFats = 0;

  const baseMeals: Meal[] = [
    {
      name: "Café da manhã",
      foods: [
        { item: "Ovos mexidos", portion: "2 unidades", calories: 150, proteins: 12, carbohydrates: 1, fats: 11 },
        { item: "Pão integral", portion: "1 fatia", calories: 80, proteins: 4, carbohydrates: 15, fats: 1 },
        { item: "Café sem açúcar", portion: "1 xícara", calories: 2, proteins: 0.2, carbohydrates: 0.5, fats: 0 },
      ],
    },
    {
      name: "Lanche da manhã",
      foods: [
        { item: "Fruta (ex: Maçã)", portion: "1 unidade", calories: 95, proteins: 0.5, carbohydrates: 25, fats: 0.3 },
      ],
    },
    {
      name: "Almoço",
      foods: [
        { item: "Peito de frango grelhado", portion: "150g", calories: 250, proteins: 45, carbohydrates: 0, fats: 7 },
        { item: "Arroz integral", portion: "100g", calories: 110, proteins: 2.6, carbohydrates: 23, fats: 0.9 },
        { item: "Salada mista", portion: "à vontade", calories: 30, proteins: 1, carbohydrates: 6, fats: 0.5 },
      ],
    },
    {
      name: "Lanche da tarde",
      foods: [
        { item: "Iogurte natural", portion: "1 pote (170g)", calories: 100, proteins: 10, carbohydrates: 7, fats: 3 },
      ],
    },
    {
      name: "Jantar",
      foods: [
        { item: "Salmão assado", portion: "120g", calories: 240, proteins: 25, carbohydrates: 0, fats: 15 },
        { item: "Batata doce cozida", portion: "150g", calories: 130, proteins: 2.5, carbohydrates: 30, fats: 0.2 },
        { item: "Vegetais no vapor", portion: "à vontade", calories: 40, proteins: 2, carbohydrates: 8, fats: 0.5 },
      ],
    },
  ];

  // Adjustments based on main goal
  switch (data.mainGoal) {
    case "Emagrecer":
      // Reduce portions slightly, focus on lean protein and high fiber
      meals = baseMeals.map(meal => ({
        ...meal,
        foods: meal.foods.map(food => ({
          ...food,
          calories: Math.round(food.calories * 0.8),
          proteins: Math.round(food.proteins * 0.9),
          carbohydrates: Math.round(food.carbohydrates * 0.7),
          fats: Math.round(food.fats * 0.7),
        })),
      }));
      break;
    case "Ganhar massa muscular":
      // Increase protein and complex carbs
      meals = baseMeals.map(meal => ({
        ...meal,
        foods: meal.foods.map(food => ({
          ...food,
          calories: Math.round(food.calories * 1.2),
          proteins: Math.round(food.proteins * 1.3),
          carbohydrates: Math.round(food.carbohydrates * 1.2),
          fats: Math.round(food.fats * 1.1),
        })),
      }));
      break;
    case "Aumentar ferro":
      // Add iron-rich foods (mock)
      meals = baseMeals.map(meal => {
        if (meal.name === "Almoço" || meal.name === "Jantar") {
          return {
            ...meal,
            foods: [
              ...meal.foods,
              { item: "Feijão preto", portion: "50g", calories: 70, proteins: 4, carbohydrates: 13, fats: 0.5 },
              { item: "Espinafre", portion: "50g", calories: 15, proteins: 1.5, carbohydrates: 2, fats: 0.1 },
            ],
          };
        }
        return meal;
      });
      break;
    case "Manter peso":
    case "Melhorar alimentação":
    default:
      meals = baseMeals;
      break;
  }

  // Calculate totals
  meals.forEach(meal => {
    meal.foods.forEach(food => {
      totalCalories += food.calories;
      totalProteins += food.proteins;
      totalCarbohydrates += food.carbohydrates;
      totalFats += food.fats;
    });
  });

  return {
    meals,
    totalCalories,
    totalProteins,
    totalCarbohydrates,
    totalFats,
  };
};

const DietPlans = () => {
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [showPlan, setShowPlan] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      age: 18,
      gender: "Masculino",
      height: 170,
      weight: 70,
      healthStatus: "Normal",
      mainGoal: "Manter peso",
      desiredGoal: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const generatedPlan = generateMockDietPlan(data);
    setDietPlan(generatedPlan);
    setShowPlan(true);
    toast.success("Dieta personalizada gerada com sucesso!");
  };

  const handleGenerateNew = () => {
    form.reset();
    setDietPlan(null);
    setShowPlan(false);
    toast.info("Formulário resetado para gerar uma nova dieta.");
  };

  const handleSaveDiet = () => {
    // In a real application, this would save the diet to a database
    toast.success("Dieta salva com sucesso! (Funcionalidade mock)");
  };

  return (
    <div className="flex flex-col items-center py-8">
      {/* Page Banner/Header Image */}
      <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-xl shadow-lg mb-8">
        <img
          src="/assets/receita_salada.jpg"
          alt="Diet Plans Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex items-center justify-center h-full bg-black/40 text-white p-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            Dietas Personalizadas
          </h1>
        </div>
      </div>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center max-w-2xl">
        Monte sua dieta de acordo com seu corpo e objetivos. Preencha os dados abaixo para gerar um plano alimentar personalizado.
      </p>

      <Card className="w-full max-w-3xl shadow-lg rounded-xl mb-8 bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl text-green-700 dark:text-green-400">Seus Dados e Objetivos</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} className="rounded-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Sua idade" {...field} className="rounded-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-lg">
                            <SelectValue placeholder="Selecione seu sexo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Masculino">Masculino</SelectItem>
                          <SelectItem value="Feminino">Feminino</SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Altura (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 175" {...field} className="rounded-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Peso atual (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Ex: 70" {...field} className="rounded-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="healthStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado de saúde</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-lg">
                            <SelectValue placeholder="Selecione seu estado de saúde" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Normal">Normal</SelectItem>
                          <SelectItem value="Anemia">Anemia</SelectItem>
                          <SelectItem value="Hipertensão">Hipertensão</SelectItem>
                          <SelectItem value="Outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mainGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objetivo principal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="rounded-lg">
                            <SelectValue placeholder="Selecione seu objetivo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Emagrecer">Emagrecer</SelectItem>
                          <SelectItem value="Ganhar massa muscular">Ganhar massa muscular</SelectItem>
                          <SelectItem value="Aumentar ferro">Aumentar ferro</SelectItem>
                          <SelectItem value="Manter peso">Manter peso</SelectItem>
                          <SelectItem value="Melhorar alimentação">Melhorar alimentação</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desiredGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meta desejada (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Perder 5kg em 2 meses" {...field} className="rounded-lg" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 rounded-lg py-3 text-lg">
                Gerar dieta personalizada
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {showPlan && dietPlan && (
        <Card className="w-full max-w-3xl shadow-lg rounded-xl bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 dark:text-green-400">Seu Plano de Dieta</CardTitle>
          </CardHeader>
          <CardContent>
            {dietPlan.meals.map((meal, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">{meal.name}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alimento</TableHead>
                      <TableHead>Porção</TableHead>
                      <TableHead className="text-right">Calorias</TableHead>
                      <TableHead className="text-right">Proteínas (g)</TableHead>
                      <TableHead className="text-right">Carboidratos (g)</TableHead>
                      <TableHead className="text-right">Gorduras (g)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {meal.foods.map((food, foodIndex) => (
                      <TableRow key={foodIndex}>
                        <TableCell>{food.item}</TableCell>
                        <TableCell>{food.portion}</TableCell>
                        <TableCell className="text-right">{food.calories}</TableCell>
                        <TableCell className="text-right">{food.proteins}</TableCell>
                        <TableCell className="text-right">{food.carbohydrates}</TableCell>
                        <TableCell className="text-right">{food.fats}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {index < dietPlan.meals.length - 1 && <Separator className="my-4" />}
              </div>
            ))}

            <Separator className="my-6" />

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Resumo Nutricional Total</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nutriente</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Total de Calorias</TableCell>
                  <TableCell className="text-right">{dietPlan.totalCalories.toFixed(0)} kcal</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total de Proteínas</TableCell>
                  <TableCell className="text-right">{dietPlan.totalProteins.toFixed(1)} g</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total de Carboidratos</TableCell>
                  <TableCell className="text-right">{dietPlan.totalCarbohydrates.toFixed(1)} g</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total de Gorduras</TableCell>
                  <TableCell className="text-right">{dietPlan.totalFats.toFixed(1)} g</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={handleGenerateNew} className="rounded-lg border-green-600 text-green-600 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-gray-700">
                Gerar nova
              </Button>
              <Button onClick={handleSaveDiet} className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 rounded-lg">
                Salvar dieta
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DietPlans;