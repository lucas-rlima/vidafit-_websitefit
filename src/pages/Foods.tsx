"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockFoods, foodCategories, FoodItem } from "@/data/foods";
import { PlusCircle, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface RecipeItem extends FoodItem {
  quantity: number;
}

const Foods = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [portionQuantity, setPortionQuantity] = useState<number>(100);
  const [recipeItems, setRecipeItems] = useState<RecipeItem[]>([]);

  const filteredFoods = useMemo(() => {
    let foods = mockFoods;

    if (selectedCategory !== "Todas") {
      foods = foods.filter((food) => food.category === selectedCategory);
    }

    if (searchTerm) {
      foods = foods.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return foods;
  }, [searchTerm, selectedCategory]);

  const calculateNutrients = (food: FoodItem, quantity: number) => {
    const factor = quantity / 100;
    return {
      calories: (food.nutritionalValuesPer100g.calories * factor).toFixed(1),
      proteins: (food.nutritionalValuesPer100g.proteins * factor).toFixed(1),
      fats: (food.nutritionalValuesPer100g.fats * factor).toFixed(1),
      carbohydrates: (food.nutritionalValuesPer100g.carbohydrates * factor).toFixed(1),
      fibers: (food.nutritionalValuesPer100g.fibers * factor).toFixed(1),
      vitaminsAndMinerals: Object.entries(food.nutritionalValuesPer100g.vitaminsAndMinerals).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: (value * factor).toFixed(1),
        }),
        {}
      ),
    };
  };

  const handleAddFoodToRecipe = () => {
    if (selectedFood && portionQuantity > 0) {
      const existingItemIndex = recipeItems.findIndex(item => item.id === selectedFood.id);
      if (existingItemIndex > -1) {
        // Update quantity if food already in recipe
        const updatedRecipeItems = [...recipeItems];
        updatedRecipeItems[existingItemIndex].quantity += portionQuantity;
        setRecipeItems(updatedRecipeItems);
        toast.success(`${selectedFood.name} atualizado na receita!`);
      } else {
        // Add new food to recipe
        setRecipeItems((prev) => [
          ...prev,
          { ...selectedFood, quantity: portionQuantity },
        ]);
        toast.success(`${selectedFood.name} adicionado à receita!`);
      }
      setPortionQuantity(100); // Reset quantity after adding
    } else {
      toast.error("Selecione um alimento e uma quantidade válida para adicionar à receita.");
    }
  };

  const handleRemoveFoodFromRecipe = (foodId: string) => {
    setRecipeItems((prev) => prev.filter((item) => item.id !== foodId));
    toast.info("Alimento removido da receita.");
  };

  const totalRecipeNutrients = useMemo(() => {
    return recipeItems.reduce(
      (totals, item) => {
        const factor = item.quantity / 100;
        totals.calories += item.nutritionalValuesPer100g.calories * factor;
        totals.proteins += item.nutritionalValuesPer100g.proteins * factor;
        totals.fats += item.nutritionalValuesPer100g.fats * factor;
        totals.carbohydrates += item.nutritionalValuesPer100g.carbohydrates * factor;
        totals.fibers += item.nutritionalValuesPer100g.fibers * factor;

        for (const [key, value] of Object.entries(item.nutritionalValuesPer100g.vitaminsAndMinerals)) {
          totals.vitaminsAndMinerals[key] = (totals.vitaminsAndMinerals[key] || 0) + (value * factor);
        }
        return totals;
      },
      {
        calories: 0,
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
        fibers: 0,
        vitaminsAndMinerals: {},
      }
    );
  }, [recipeItems]);

  const displayedNutrients = selectedFood
    ? calculateNutrients(selectedFood, portionQuantity)
    : null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-16rem)] py-8">
      {/* Left Column: Food Search and List */}
      <div className="lg:w-1/2 flex flex-col gap-6">
        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 dark:text-green-400">Buscar Alimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Pesquisar alimento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4 rounded-lg"
            />
            <div className="flex flex-wrap gap-2 mb-6">
              {foodCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
                    selectedCategory === category
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
            <ScrollArea className="h-[400px] pr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredFoods.length > 0 ? (
                  filteredFoods.map((food) => (
                    <Card
                      key={food.id}
                      className={`cursor-pointer hover:shadow-md transition-shadow rounded-lg ${
                        selectedFood?.id === food.id ? "border-2 border-green-500 dark:border-green-400" : ""
                      }`}
                      onClick={() => {
                        setSelectedFood(food);
                        setPortionQuantity(100); // Reset quantity when new food is selected
                      }}
                    >
                      <CardContent className="flex items-center p-4">
                        <img
                          src={food.image}
                          alt={food.name}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <p className="font-medium text-gray-800 dark:text-gray-100">{food.name}</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">Nenhum alimento encontrado.</p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Food Details and Recipe Builder */}
      <div className="lg:w-1/2 flex flex-col gap-6">
        {selectedFood && (
          <Card className="shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-green-700 dark:text-green-400">{selectedFood.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <img
                  src={selectedFood.image}
                  alt={selectedFood.name}
                  className="w-24 h-24 object-cover rounded-md mr-6"
                />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Categoria: <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{selectedFood.category}</Badge></p>
                  <div className="flex items-center mt-2">
                    <Input
                      type="number"
                      value={portionQuantity}
                      onChange={(e) => setPortionQuantity(Number(e.target.value))}
                      min="1"
                      className="w-24 mr-2 rounded-lg"
                    />
                    <span className="text-gray-700 dark:text-gray-300">g</span>
                    <Button onClick={handleAddFoodToRecipe} className="ml-4 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 rounded-lg">
                      <PlusCircle className="h-4 w-4 mr-2" /> Adicionar à Receita
                    </Button>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Valores Nutricionais ({portionQuantity}g)</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nutriente</TableHead>
                    <TableHead className="text-right">Quantidade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Calorias</TableCell>
                    <TableCell className="text-right">{displayedNutrients?.calories} kcal</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Proteínas</TableCell>
                    <TableCell className="text-right">{displayedNutrients?.proteins} g</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gorduras</TableCell>
                    <TableCell className="text-right">{displayedNutrients?.fats} g</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Carboidratos</TableCell>
                    <TableCell className="text-right">{displayedNutrients?.carbohydrates} g</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Fibras</TableCell>
                    <TableCell className="text-right">{displayedNutrients?.fibers} g</TableCell>
                  </TableRow>
                  {Object.entries(displayedNutrients?.vitaminsAndMinerals || {}).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</TableCell>
                      <TableCell className="text-right">{value} mg</TableCell> {/* Assuming mg for vitamins/minerals */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 dark:text-green-400">Minha Receita</CardTitle>
          </CardHeader>
          <CardContent>
            {recipeItems.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">Adicione alimentos para montar sua receita.</p>
            ) : (
              <>
                <ScrollArea className="h-[200px] mb-4 pr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Alimento</TableHead>
                        <TableHead className="text-right">Quantidade (g)</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recipeItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveFoodFromRecipe(item.id)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600"
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
                <Separator className="my-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">Total Nutricional da Receita</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nutriente</TableHead>
                      <TableHead className="text-right">Quantidade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Calorias</TableCell>
                      <TableCell className="text-right">{totalRecipeNutrients.calories.toFixed(1)} kcal</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Proteínas</TableCell>
                      <TableCell className="text-right">{totalRecipeNutrients.proteins.toFixed(1)} g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Gorduras</TableCell>
                      <TableCell className="text-right">{totalRecipeNutrients.fats.toFixed(1)} g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Carboidratos</TableCell>
                      <TableCell className="text-right">{totalRecipeNutrients.carbohydrates.toFixed(1)} g</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fibras</TableCell>
                      <TableCell className="text-right">{totalRecipeNutrients.fibers.toFixed(1)} g</TableCell>
                    </TableRow>
                    {Object.entries(totalRecipeNutrients.vitaminsAndMinerals).map(([key, value]) => (
                      <TableRow key={`total-${key}`}>
                        <TableCell>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</TableCell>
                        <TableCell className="text-right">{value.toFixed(1)} mg</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Foods;