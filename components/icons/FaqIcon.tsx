import React from "react";

export const FaqIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="24"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* círculo */}
    <circle cx="256" cy="300" r="170" />

    {/* balão esquerda */}
    <path d="M120 90h200a40 40 0 0 1 40 40v50a40 40 0 0 1-40 40h-60l-30 40-10-40h-100a40 40 0 0 1-40-40v-50a40 40 0 0 1 40-40z" />

    {/* interrogação */}
    <path d="M220 140c0-20 16-36 36-36s36 16 36 36c0 28-36 28-36 56" />
    <circle cx="256" cy="210" r="4" fill="currentColor" stroke="none" />

    {/* balão direita */}
    <path d="M300 260h120a40 40 0 0 1 40 40v50a40 40 0 0 1-40 40h-70l-20 30-5-30h-25a40 40 0 0 1-40-40v-50a40 40 0 0 1 40-40z" />

    {/* check */}
    <path d="M330 320l30 30 60-60" />
  </svg>
);