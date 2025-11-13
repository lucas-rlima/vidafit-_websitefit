"use client";

import React from "react";

const Foods = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] py-12">
      <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-6">Alimentos</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Explore alimentos, veja informações nutricionais e monte suas receitas aqui.
      </p>
    </div>
  );
};

export default Foods;