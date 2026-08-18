import type { ReactNode } from "react";

 export type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export type StepProps = {
  number: string;
  title: string;
  description: string;
};