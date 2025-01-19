"use client";
import React, { useState } from "react";
import AppLogo from "@/components/ui/AppLogo";
import RegisterForm from "@/components/forms/RegisterForm";
import { FaBuilding, FaUser, FaCogs } from "react-icons/fa";
import CompanyOnboardingForm from "./Company";

const steps = [
  { id: 1, title: "Información de la Empresa", icon: <FaBuilding /> },
  { id: 2, title: "Información de la Cuenta", icon: <FaUser /> },
  { id: 3, title: "Preferencias", icon: <FaCogs /> },
];

const OnboardingWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-lg">
        <div className="flex justify-center items-center m-8">
          <AppLogo />
        </div>
        <div className="flex items-center justify-center gap-8 bg-gray-100 p-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${
                step.id === currentStep ? "text-teal-500" : "text-gray-400"
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="mb-2">{step.icon}</span>
                <span>{`Paso ${step.id}`}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-4 bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center p-4">
          <h1 className="text-2xl font-bold">{steps[currentStep - 1].title}</h1>
          <p className="text-gray-600">
            {currentStep === 1
              ? "Ingresa los datos de tu empresa. Por favor, asegúrate de que toda la información sea correcta."
              : currentStep === 2
              ? "Ingresa tus datos personales. Asegúrate de que toda la información sea correcta y completa."
              : "Selecciona tus preferencias"}
          </p>
        </div>
        {currentStep === 1 ? (
          <div className="p-4">
            <CompanyOnboardingForm />
          </div>
        ) : currentStep === 2 ? (
          <RegisterForm />
        ) : (
          <div className="p-4">
            <h1>Form Preferencias</h1>
          </div>
        )}
        <div className="p-4">
          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === steps.length}
              className="bg-teal-500 text-white px-4 py-2 rounded"
            >
              {currentStep === steps.length ? "Guardar" : "Continuar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
